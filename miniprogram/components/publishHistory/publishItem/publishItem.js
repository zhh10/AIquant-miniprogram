// components/publishHistory/publishItem/publishItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Item:Object
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
    handleClick(){
      const {title} = this.properties.Item 
      wx.navigateTo({
        url: '../../../../../pages/pp/pp?title='+title,
      })
    }
  }
})
