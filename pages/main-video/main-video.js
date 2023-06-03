// pages/main-video/main-video.js
import { getTopMV } from '../../services/vedio'
Page({
  data: {
    vedioList: [],
    // 判断是否还有更多数据
    hasMore: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchTopMV()
  },
  // 发送网络请求
  async fetchTopMV() {
    const res = await getTopMV(20, this.data.vedioList.length)
    const newVideoList = [...this.data.vedioList, ...res.data]
    this.setData({ vedioList: newVideoList })
    this.data.hasMore = res.hasMore

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({ vedioList: [] })
    this.data.hasMore = true
    await this.fetchTopMV()
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.hasMore) return
    this.fetchTopMV()
  },
  handleVideoItem(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?id=${item.id}`,
    })
  }
})