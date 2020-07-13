// components/news/newsList/newsList.js
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      newsList:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    async attached(){
      wx.showLoading({
        title: '正在加载中',
      })
      const account = wx.getStorageSync('Login')
      const data = await db.collection("Users").doc(account).get().then(res => res.data.newsList)
      console.log(data)
      this.setData({
          newsList:data,
      })
      wx.hideLoading({
        success: (res) => {},
      })
    }
  }

})
