// pages/detail-video/detail-video.js
import { getMvUrl, getMvInfo, getMvRelative } from '../../services/vedio'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoId: 0,
    MvUrl: '',
    // 详情数据
    MvInfo: {},
    // 相关视频
    MvRelativeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({ videoId: options.id })
    this.fetchMvUrl()
    this.fetchMvInfo()
    this.fetchMvRelative()
  },
  async fetchMvUrl() {
    // 请求数据
    const result = await getMvUrl(this.data.videoId)
    this.setData({ MvUrl: result.data.url })
  },
  async fetchMvInfo() {
    // 请求数据
    const result = await getMvInfo(this.data.videoId)
    this.setData({ MvInfo: result.data })
  },
  //mv相关视频
  async fetchMvRelative() {
    const result = await getMvRelative(this.data.videoId)
    this.setData({ MvRelativeList: result.data })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})