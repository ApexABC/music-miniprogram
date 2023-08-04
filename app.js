// app.js
App({
  globalData: {
    statusHeight: 20,
    contentHeight: 500
  },
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.statusHeight = res.statusBarHeight
        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
      }
    })
  }
})