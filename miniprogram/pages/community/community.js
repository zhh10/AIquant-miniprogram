const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      currentIndex:0,
      mettingList:['推荐','实习/招聘','官方'],
      swiperRPXHeight:null,
      metting:null,
  },
  handleClick(e){
      const index = e.target.dataset.index 
      this.setData({
        currentIndex:index,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let self = this 
      wx.showToast({  
        title: '正在加载中',
        icon:'loading',
        success(){
          wx.getSystemInfo({
            success: (res) => {
              let clientHeight = res.windowHeight 
              let clientWidth = res.windowWidth 
              let ratio = 750 / clientWidth 
              let rpxHeight = clientHeight * ratio 
              self.setData({
                swiperRPXHeight : rpxHeight
              })
            },
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let self = this
    db.collection('mettingList').get({
      success(res){
        self.setData({
          metting:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      let self = this
      db.collection('mettingList').get({
        success(res){
          self.setData({
            metting:res.data
          })
        }
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})