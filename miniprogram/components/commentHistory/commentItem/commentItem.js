// components/commentHistory/commentItem/commentItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Item:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  methods:{
    handleClick(){
      const {title} = this.properties.Item 
      wx.navigateTo({
        url: '../../../../../pages/pp/pp?title='+title,
      })
    }
  },
})

