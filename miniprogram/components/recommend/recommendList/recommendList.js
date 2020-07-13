// components/recommend/recommendList/recommendList.js
const db = wx.cloud.database() 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      metting:Array,
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
      const userName = wx.getStorageSync('Login')
      // 如果没有登录 要先登录
      if(!userName){
        wx.showToast({
          title: '请先登录',
          icon:'none',
          duration:1000
        })
      }else{
        wx.navigateTo({
          url: '/pages/publish/publish',
        })
      }
    }
  },
})
