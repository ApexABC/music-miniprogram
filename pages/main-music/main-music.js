// pages/main-music/main-music.js
import { getMusicBanner, getHotMenu } from '../../services/music'
import recommendStore from "../../store/recommendStore"
import rankingStore from '../../store/rankingStore'
import playerStore from '../../store/playerStore'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    musicBannerList: [],
    recommendMusicList: [],
    hotMusicList: [],
    HYMusicList: [],
    // 巅峰榜数据
    rankingInfos: {},
    // 当前播放歌曲
    currentSong: {},
    isPlaying: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchMusicBanner()
    // 推荐歌曲
    recommendStore.onState("recommendSongInfo", (value) => {
      if (!value.tracks) return
      this.setData({ recommendMusicList: value.tracks.slice(0, 6) })
    })
    recommendStore.dispatch("fetchRecommentMusic")
    rankingStore.onState("newRanking", this.getRankingHandler('newRanking'))
    rankingStore.onState("originRanking", this.getRankingHandler('originRanking'))
    rankingStore.onState("upRanking", this.getRankingHandler('upRanking'))
    rankingStore.dispatch('fetchRankingDataAction')
    playerStore.onStates(['currentSong', 'isPlaying'], this.handlePlayInfos)
    // 热门歌曲
    this.fetchHotMusic()

  },
  // 请求轮播数据
  async fetchMusicBanner() {
    const result = await getMusicBanner()
    this.setData({ musicBannerList: result.banners })
  },
  // 请求热门歌曲
  async fetchHotMusic() {
    getHotMenu().then((result) => {
      this.setData({ hotMusicList: result.playlists })
    })
    // 请求华语
    getHotMenu("华语").then((result) => {
      this.setData({ HYMusicList: result.playlists })
    })

  },
  // 请求推荐歌曲
  handlerInputFocus() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  // 更多歌曲回调
  handlerRecommendMore(e) {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },
  onSongItemTap(e) {
    playerStore.setState('playSongList', this.data.recommendMusicList)
    playerStore.setState('playSongIndex', e.currentTarget.dataset.index)
  },
  onPauseOrPlay() {
    playerStore.dispatch('playMusicStatusAction')
  },
  onPlayBarToPlayer(){
    wx.navigateTo({
      url: '/pages/music-player/music-player',
    })
  },
  // ================store==============
  // handleNewRanking(value) {
  //   console.log("新歌榜", value);
  //   const newRankingInfos = { ...this.data.rankingInfos, newRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
  // },
  // handleOriginRanking(value) {
  //   console.log("原创榜", value);
  //   const newRankingInfos = { ...this.data.rankingInfos, originRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
  // },
  // handleUpRanking(value) {
  //   console.log("飙升榜", value);
  //   const newRankingInfos = { ...this.data.rankingInfos, upRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
  // },
  getRankingHandler(ranking) {
    return value => {
      const newRankingInfos = { ...this.data.rankingInfos, [ranking]: value }
      this.setData({ rankingInfos: newRankingInfos })
    }
  },
  handlePlayInfos({ currentSong, isPlaying }) {
    if (currentSong !== undefined) {
      this.setData({ currentSong })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }

  },
  onUnload() {
    recommendStore.offState("recommendSongInfo", (value) => {
      this.setData({ recommendMusicList: value.slice(0, 6) })
    })
    // recommendStore.offState("recommendSongs", this.handleNewRanking)
    // recommendStore.offState("originRanking", this.handleOriginRanking)
    // recommendStore.offState("upRanking", this.handleUpRanking)
    playerStore.offStates(['currentSong', 'isPlaying'], this.handlePlayInfos)
  }
})