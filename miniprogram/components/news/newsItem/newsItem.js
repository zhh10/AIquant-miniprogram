// components/news/newsItem/newsItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      newsItem:Object
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
        const { title } = this.properties.newsItem 
        wx.navigateTo({
          url: '../../../../../pages/pp/pp?title='+title,
        })
      }
  }
})
