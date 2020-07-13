const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    name:null,
    image:null,
    url:null,
    commentList:null,
    isPlay:false,
    show:true,
    message:'',
    _options:null,
  },
  handlePlay(e){
    const self = this 
    this.setData({
      isPlay:true
    })
    const myVideo = wx.createVideoContext('studyVideo', self)
    myVideo.play()
  },
  handleInput(e){
    this.setData({
      message:e.detail
    })
  },
  async submitComment(){
    let self = this 
    if(!this.data.message){
      wx.showToast({
        title: '内容不能为空',
        duration:1000,icon:'none'
      })
    }else{
      wx.showLoading({
        title:"发送中",
        async success(){
          const account = wx.getStorageSync('Login')
          const userName = await db.collection("Users").doc(account).get().then(res =>  res.data.userName) 
          const comment = {comment:self.data.message,userName:userName}
          const oldCommentList = await db.collection("CourseList").doc(self.data.id).get().then(res => res.data.commentList)
          const newCommentList = [comment,...oldCommentList] 

          const result = wx.cloud.callFunction({
            name:'addCourseComment',
            data:{
              db:"CourseList",
              newCommentList:newCommentList,
              id:self.data.id,
            },
            success(res){wx.hideLoading({
              success: (res) => {
                self.setData({
                  message:"",
                })
                self.onLoad(self.data._options)
              },
            })},
            fail(res){
              wx.hideLoading({
                success: (res) => {
                  wx.showToast({
                    title: '发生错误',
                  })
                },
              })
            }
          })   
        }
      })
      
    }
    
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      const {id} = options 
      const videoData = await db.collection("CourseList")
                            .doc(id)
                                .get()
                                  .then(res => {return res.data})
      const {name,url,image,commentList} = videoData 
      this.setData({
        id,
        name,
        url,
        image,
        commentList,
        _options:options
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