// components/recommend/recommendItem/recommendItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      metting:Object
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
      const {title} = this.properties.metting
      // 传过去一个title 让其在数据里进行搜索
      wx.navigateTo({
        url: "../../../../../pages/pp/pp?title="+title
      })
    }
  },
  attached(){
    if(this.properties.metting['comment']>99){
      this.setData({
        metting:Object.assign(this.properties.metting,{'comment':'99+'})
      })
    }
  }
})
