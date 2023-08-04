// components/song-area/song-area.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      value: '',
      type: String
    },
    songList: {
      value: [],
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMenuMoreClick() {
      wx.navigateTo({
        url: '/pages/detail-menu/detail-menu',
      })
    }
  }
})
