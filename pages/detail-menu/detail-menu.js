// pages/detail-menu/detail-menu.js
import { getSongMenuTag, getHotMenu } from '../../services/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagMusicList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchTagMusicList()
  },
  async fetchTagMusicList() {
    const result = await getSongMenuTag()
    const tags = result.tags
    const allPromises = []
    for (const tag of tags) {
      const promise = getHotMenu(tag.name)
      allPromises.push(promise)
    }
    Promise.all(allPromises).then(res => {
      this.setData({ tagMusicList: res })
    })
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