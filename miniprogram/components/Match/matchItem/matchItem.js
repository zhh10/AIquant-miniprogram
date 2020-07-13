// components/matchItem/matchItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    match:Object,
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
          const account = wx.getStorageSync('Login')
          if(account==""){
            wx.showToast({
              title: '请先登录',
              icon:'none',
              duration:1000
            })
          }else{
            let self = this 
            wx.navigateTo({
              url: '/pages/matchPlay/matchPlay?_id=' + self.properties.match._id,
            })
          }
      }
  }
})
