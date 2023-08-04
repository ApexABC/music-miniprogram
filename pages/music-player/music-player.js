// pages/music-player/music-player.js
import { throttle } from 'underscore'
import playerStore, { audioContext } from '../../store/playerStore'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',

    stateKeys: ['id', 'currentSong', 'durationTime', 'currentTime', 'lrcInfos', 'currentLrcText', 'currentLrcIndex', 'isPlaying', 'playModeIndex'],

    currentSong: {},
    currentPage: 0,
    pageTitle: ['歌曲', '歌词'],
    lrcInfos: [],
    currentLrcText: '',
    currentLrcIndex: -1,
    // 歌曲当前时间和总时间
    currentTime: 0,
    durationTime: 0,
    // 内容动态高度
    contentHeight: 0,

    sliderValue: 0,
    // 滑块是否正在改变
    isSliderChangeing: false,
    isPlaying: true,
    // 歌词位置
    lyricScrollTop: 0,
    playSongList: [],
    playSongIndex: 0,
    isFirstPlay: true,
    playModeIndex: 0, //0顺序播放 1单曲循环 2随机播放
    playModeName: ['order', 'repeat', 'random']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      contentHeight: app.globalData.contentHeight
    })

    if (options.id) {
      playerStore.dispatch('playMusicWithSongId', options.id)
    }
    // 获取store共享数据
    playerStore.onStates(["playSongList", "playSongIndex"], this.getPlaySongList)
    playerStore.onStates(this.data.stateKeys, this.getPlayerInfosHandler)
  },

  updateProgress: throttle(function (currentTime) {
    if (this.data.isSliderChangeing) return
    // 记录当前时间和修改sliderValue
    this.setData({ currentTime, sliderValue: (currentTime / this.data.durationTime) * 100 })
  }, 500, { leading: false, trailing: false }),
  // 事件监听+++++++++++++++++++++++++++++++++++++++++++++++
  onSwiperChange(e) {
    this.setData({ currentPage: e.detail.current })
  },
  // nav歌曲&歌词点击事件
  onNavItemTap(e) {
    this.setData({ currentPage: e.currentTarget.dataset.index })
  },
  // 滑块监听
  onSliderChange(e) {
    const value = e.detail.value
    const currentTime = value / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000)
    this.setData({ currentTime, isSliderChangeing: false })
  },
  onSliderChanging: throttle(function (e) {
    const value = e.detail.value
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime })
    this.data.isSliderChangeing = true
  }, 100),
  // 播放暂停
  onPlayOrPause() {
    playerStore.dispatch("playMusicStatusAction")
  },
  // 上一首
  onPrevBtnTap() {
    // this.changeNewSong()
    playerStore.dispatch("playNewMusicAction", false)
  },
  // 下一首
  onNextBtnTap() {
    // this.changeNewSong(true)
    playerStore.dispatch("playNewMusicAction")
  },
  // 歌曲播放模式
  onModeBtn() {
    playerStore.dispatch("changePlayModeAction")
  },
  onNavBackTap() {
    wx.navigateBack()
  },
  onUnload() {
    playerStore.offStates(["playSongList", "playSongIndex"], this.getPlaySongList)
    playerStore.offStates(this.data.stateKeys, this.getPlayerInfosHandler)
  },
  // ==========================store==============
  getPlaySongList({ playSongList, playSongIndex }) {
    if (playSongList) {
      this.setData({ playSongList })
    }
    if (playSongIndex !== undefined) {
      this.setData({ playSongIndex })
    }
  },
  getPlayerInfosHandler({ id, currentSong, durationTime, currentTime, lrcInfos, currentLrcText, currentLrcIndex, isPlaying, playModeIndex }) {
    if (id !== undefined) {
      this.setData({ id })
    }
    if (currentSong !== undefined) {
      this.setData({ currentSong })
    }
    if (durationTime !== undefined) {
      this.setData({ durationTime })
    }
    if (currentTime !== undefined) {
      this.updateProgress(currentTime)
    }
    if (lrcInfos !== undefined) {
      this.setData({ lrcInfos })
    }
    if (currentLrcText !== undefined) {
      this.setData({ currentLrcText })
    }
    if (currentLrcIndex !== undefined) {
      this.setData({ currentLrcIndex, lyricScrollTop: currentLrcIndex * 35 })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }
    if (playModeIndex !== undefined) {
      this.setData({ playModeIndex })
    }
  }
})