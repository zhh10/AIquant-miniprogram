// miniprogram/pages/pp/pp.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperRPXHeight:null,
    imageShow:false,
    show:false,
    isagree:false,
    commentValue:"",
    metting:null,
    _options:null,
    // agree:"",
    // comment:"",
    // commentList:""
  },
  handleagree(){
    let self = this 
    self.setData({
      isagree:true,
      // agree:self.data.agree + 1
    })
    const newAgree = self.data.metting.agree + 1
    db.collection("mettingList").doc(self.data.metting._id).update({
      data:{agree:newAgree}
    })
    self.onLoad(self.data._options) //重新渲染
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
       current:this.data.metting.images[index],
        urls:this.data.metting.images
    })
    },
  comment(){
    if(!wx.getStorageSync('Login')){
      wx.showToast({
        title: '请先登录再发表意见',
        icon:'none',
        duration:1000
      })
    }else{
      this.setData({
        show:true 
      })
    }
  },
  onClose(){
    this.setData({
      show:false 
    })
  },
  inputComment(e){
    this.setData({
      commentValue:e.detail.value 
    })
  },
  submitComment(){
    let self = this 
    if(self.data.commentValue == ""){
      wx.showToast({
        title: '说点什么吧',
        icon:"none",
        duration:1000,
      })
      return 
    }
    let account = wx.getStorageSync('Login')
    self.saveDataBase(self,account) 
    self.historyComment(self,account,self.data.metting.title,self.data.commentValue)
  },
  saveDataBase(self,account){
    let username
    db.collection("Users").doc(account).get({
      success(res){
        username = res.data.userName 
        let date = new Date()
        // 构建评论对象
        let commentData = {
          context:self.data.commentValue,
          _id:account, 
          name:username,
          date:date.toLocaleDateString()+" "+date.toLocaleTimeString().slice(2),
          title:self.data.metting.title,
        }
        let newCommentList = [commentData,...self.data.metting.commentList]
        const newcomment = self.data.metting.comment + 1
        db.collection("mettingList").doc(self.data.metting._id)
        .update({
          data:{commentList:newCommentList,comment:newcomment},
          success(){
            wx.showToast({
              title: '评论成功',icon:"success",duration:1000,
              success(){
                // 评论成功，将其推送到消息列表中
                self.pushNewList(self.data.metting.author,commentData)

                setTimeout(()=>{
                  self.setData({show:false,commentValue:""})
                  self.onLoad(self.data._options)
                },1000)
              }
            })
          },fail(){
            wx.showToast({
              title: '评论失败',icon:'success',duration:1000
            })
          }
        })
      }
    })
  },
  historyComment(self,_id,title,context){
    let historyComment
    db.collection("Users").doc(_id).get({
      success(res){
        historyComment = res.data.historyComment
        let newData = {
          title:title,_id:_id,context:context
        }
        db.collection("Users").doc(_id).update({
          data:{historyComment:[newData,...historyComment]}
        })
      }
    })
  },
  async pushNewList(author,comment){
      let obj = await db.collection("Users").where({
        userName:author
      }).get()
        .then(res => res.data[0])
      let {_id,newsList,waitSelected} = obj

      // 找到问题的答主 
      // 将评论对象推送到消息列表中
      comment = [comment,...newsList]
      waitSelected = waitSelected + 1
      db.collection("Users").doc(_id).update({
        data:{newsList:comment,waitSelected:waitSelected}
      })
  },

  onLoad: function (options) {
    let self = this 
    const title = options.title 
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

    db.collection("mettingList").where({
      title:title
    }).get({
      success(res){
        self.setData({
          metting:res.data[0],
          _options:options,
        })
      }
    })
  },
 
})

