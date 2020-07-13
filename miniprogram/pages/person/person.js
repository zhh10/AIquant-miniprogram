// miniprogram/pages/person/person.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:"",
    personData:"",
    show:false,
    newName:"",
  },
  // 跳转到登录页面
  goLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 退出登录
  cancelLogin(){
    let self = this
    wx.removeStorageSync("Login")
    wx.showToast({
      title: '已退出登录',
      icon:'success',
      duration:1000,
      success(){
        self.setData({
          isLogin:false
        })
      }
    })
    
  },
  // 输入新名字
  inputNewName(e){
    const inputValue = e.detail.value
    this.setData({
      newName:inputValue
    })
  },
  updateName(){
    this.setData({
      show:true
    })
  },
  // 提交修改新名字
  submitNewName(){
    let self = this 
    if(self.data.newName.length===0){
      //如果新名字长度为空
      wx.showToast({title: "名字不能为空",duration:1000,icon:"none"})
      return ;
    }else if(self.data.newName.length > 6){
      // 如果新名字长度超过6
      wx.showToast({title: '名字长度不能超过6',duration:1000,icon:'none'})
      return ;
    }
    let isMore
    // 判断账号是否被注册过
    db.collection("Users").where({userName:self.data.newName}).get({
      success(res){
        if(res.data.length > 0){
          wx.showToast({
            title: '此账号已经被注册了',duration:1000,icon:"none",success(){
              return ;
            }
          })
        }else{
          let account = wx.getStorageSync('Login')
          db.collection("Users").doc(account).update({
            data:{userName:self.data.newName},
            success(){
              self.setData({newName:""})
              self.onShow()
              wx.showToast({
                title: '修改成功',
                duration:1000,
                icon:'success',
                success(){
                  setTimeout(()=>{
                    self.setData({
                      show:false
                    })
                  },1000)
                }
              })
            }
          })
        }
      }
    })
  },
  onClose(){
    this.setData({
      show:false
    })
  },
  navigatoToNewsList(){
    const _id = this.data.personData._id 
    db.collection("Users").doc(_id).update({
      data:{waitSelected:0}
    }).then(res => {
      wx.navigateTo({
        url: '/pages/newsList/newsList',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  onReady: function () {
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    // 判断是否登录
    const account = wx.getStorageSync('Login')
    const isLogin = !!account 
    this.setData({
      isLogin:isLogin
    })
    let self = this 
    // 如果是登录状态 就获取数据
    if(isLogin){
      db.collection("Users").doc(account).get({
        success(res){
          self.setData({
            personData:res.data,
          })
        }
      })
    }
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