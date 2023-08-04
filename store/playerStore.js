import { HYEventStore } from 'hy-event-store'
import { parseLyric } from '../utils/parse-lyric'
import { getSongDetail, getSongLyric } from '../services/player'
export const audioContext = wx.createInnerAudioContext()
const playerStore = new HYEventStore({
  state: {
    playSongList: [],
    playSongIndex: 0,

    id: 0,
    currentSong: {},
    lrcInfos: [],
    currentLrcText: '',
    currentLrcIndex: -1,
    currentTime: 0,
    durationTime: 0,

    isFirstPlay: true,
    isPlaying: false,
    playModeIndex: 0
  },
  actions: {
    playMusicWithSongId(ctx, id) {
      ctx.id = id
      ctx.isPlaying = true
      getSongDetail(id).then((result) => {
        ctx.currentSong = result.songs[0]
        ctx.durationTime = result.songs[0].dt
      })
      getSongLyric(id).then((result) => {
        const lyricInfos = parseLyric(result.lrc.lyric)
        ctx.lrcInfos = lyricInfos
      })
      // 播放当前歌曲
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true
      // 监听播放时间
      if (ctx.isFirstPlay) {
        ctx.isFirstPlay = false

        audioContext.onTimeUpdate(() => {
          // 获取当前播放时间
          ctx.currentTime = audioContext.currentTime * 1000
          // 匹配正确的歌词
          if (!ctx.lrcInfos.length) return
          let index = ctx.lrcInfos.length - 1
          for (let i = 0; i < ctx.lrcInfos.length; i++) {
            const info = ctx.lrcInfos[i]
            if (info.time > audioContext.currentTime * 1000) {
              index = i - 1
              break
            }
          }
          if (index === ctx.currentLrcIndex) return
          ctx.currentLrcText = ctx.lrcInfos[index].text
          ctx.currentLrcIndex = index
        })
        audioContext.onWaiting(() => {
          audioContext.pause()
        })
        audioContext.onCanplay(() => {
          audioContext.play()
        })
        audioContext.onEnded(() => {
          if (audioContext.loop) return
          this.dispatch("playNewMusicAction")
        })
      }
    },
    playMusicStatusAction(ctx) {
      if (ctx.isPlaying) {
        audioContext.pause()
        ctx.isPlaying = false
      } else {
        audioContext.play()
        ctx.isPlaying = true
      }
    },
    changePlayModeAction(ctx) {
      let modeIndex = ctx.playModeIndex
      modeIndex = modeIndex + 1
      if (modeIndex === 3) modeIndex = 0
      if (modeIndex === 1) {
        audioContext.loop = true
      } else {
        audioContext.loop = false
      }
      ctx.playModeIndex = modeIndex
    },
    playNewMusicAction(ctx, isNext = true) {
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.currentLrcIndex = 0
      ctx.currentLrcText = ''
      ctx.lyricInfos = []

      let index = ctx.playSongIndex
      if (ctx.playModeIndex === 0 || 1) {//顺序播放
        index = isNext ? index + 1 : index - 1
        if (index === ctx.playSongList.length) index = 0
        if (index === -1) index = ctx.playSongList.length - 1
      }
      else if (ctx.playModeIndex === 2) {//随机播放
        index = Math.floor(Math.random() * ctx.playSongList.length)
      }
      const newSong = ctx.playSongList[index]
      this.dispatch('playMusicWithSongId', newSong.id)

      ctx.playSongIndex = index
    }
  }
})

export default playerStore