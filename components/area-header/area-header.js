// components/area-header/area-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: { value: "标题", type: String },
    hasMore: { value: true, type: Boolean }
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
    handlerMore() {
      this.triggerEvent('moreclick')
    }
  }
})
