// miniprogram/pages/test/test.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperRPXHeight:'',
    imageShow:false,
    show:false,
    comment:"",
    isagree:false,
    commentValue:"",
  },  
  handleagree(){
    this.setData({
      isagree:true
    })
  },
  imageShow(){
    this.setData({
      imageShow:true
    })
  },
  imageClose(){
    this.setData({
      imageShow:false
    })
  },
  previewImg(e){
    let index = e.currentTarget.dataset.index 
    wx.previewImage({
      //当前显示图片
      current: this.data.comment.images[index],
      //所有图片
      urls: this.data.comment.images,
    })
  },
  comment(){
    this.setData({
      show:true
    })
  },
  inputComment(e){
    console.log(e)
    this.setData({
      commentValue:e.detail.value 
    })
  },
  submitComment(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this 
      wx.getSystemInfo({
        success: (res) => {
          let clientHeight = res.windowHeight 
          let clientWidth = res.windowWidth 
          let ratio = 750 / clientWidth 
          let rpxHeight = clientHeight * ratio 
          this.setData({
            swiperRPXHeight : rpxHeight
          })
        },
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      let self = this 
      db.collection("mettingList").doc("13672411007").get({
        success(res){
          self.setData({
            comment:res.data 
          })
        }
      })
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

  },



  // 保存到数据库中
  // saveDataBase(self,account){
  //   db.collection("Users").doc(account).get({
  //     success(res){
  //       username = res.data.userName 
  //       let commentData = {
  //         context:self.data.commentValue,
  //         _id:account,
  //         name:username
  //       }
  //       let newCommentList = [...self.data.commentList,commentData]
  //       db.collection("mettingList").doc(self.data.metting._id)
  //       .update({
  //         data:{commentList:newCommentList,comment:self.data.comment+1},
  //         success(){
  //           wx.showToast({
  //             title: '评论成功',icon:"success",duration:1000,
  //             success(){
  //               setTimeout(()=>{
  //                 self.setData({show:false,commentValue:"",
  //               commentList:[...self.data.commentList,commentData],
  //               comment:self.data.comment+1})
  //               },1000)
  //             }
  //           })
  //         },fail(){
  //           wx.showToast({
  //             title: '评论失败',icon:'success',duration:1000
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
  // 放入历史评论中
  // historyComment(self,_id,title,context){
  //   db.collection("Users").doc(_id).get({
  //     success(res){console.log(res)}
  //   })
  // }
})

