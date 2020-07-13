// components/Book/BookItem/BookItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    course:Object
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
      const id = this.data.course._id
    wx.navigateTo({
      url: '../../../../../pages/video/video?id='+id
    })
  }
  },
})
