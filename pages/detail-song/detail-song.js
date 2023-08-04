// pages/detail-song/detail-song.js
import recommendStore from '../../store/recommendStore'
import rankingStore from '../../store/rankingStore'
import { getRecommentMusic } from '../../services/music'
import playerStore from '../../store/playerStore'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'ranking',
    key: 'newRanking',
    songInfos: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.type
    this.setData({ type })
    if (type === "ranking") {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (this.data.type === "recommend") {
      recommendStore.onState('recommendSongInfo', this.handleRanking)
    } else if (type === "menu") {
      this.fetchMenuSongInfo(options.id)
    }
  },
  async fetchMenuSongInfo(id) {
    const result = await getRecommentMusic(id)
    this.setData({ songInfos: result.playlist })
  },
  // ====================store===============
  handleRanking(value) {
    this.setData({ songInfos: value })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.data.type === "ranking") {
      rankingStore.offState(this.data.key, this.handleRanking)
    } else if (this.data.type === "recommend") {
      recommendStore.offState('recommendSongInfo', this.handleRanking)
    } else if (this.data.type === "menu") {

    }
  },

  onSongItemTap(e) {
    playerStore.setState("playSongList", this.data.songInfos.tracks)
    playerStore.setState("playSongIndex", e.currentTarget.dataset.index)
  }
})