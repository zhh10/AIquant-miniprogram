// miniprogram/pages/publish/publish.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    fileList:[],
    title:"",
    context:""
  },
  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },
  handleClose(){
    // 进行跳转 返回原来的页面 并且把数据清空
    let self = this 
    wx.navigateBack({
      delta:1,
      success(){
        self.setData({
          title:"",
          context:"",
          fileList:[]
        })
      }
    })
  },
  afterRead(e){
    let self = this 
    const {file} = e.detail 
    file.forEach(item => {
      wx.cloud.uploadFile({
        filePath:item.path,
        name:'file',
        cloudPath:this.timetostr(new Date()),
        success(res){
          let newList = self.data.fileList
          newList.push({url:res.fileID})
          self.setData({
            fileList:newList
          })
        },fail(err){
          wx.showToast({
            title: '上传失败',
            icon:'none',
            duration:1000
          })
        }
      })
    })
  },
  timetostr(time) {
    let random = Math.floor(Math.random() * (9999 - 1000)) + 1000
    let str = random + "_" + time.getMilliseconds() + ".png"
    return str
  },
  handleDelete(e){
    let newList = this.data.fileList
    let fileID = this.data.fileList[e.detail.index]['url']
    newList.splice(e.detail.index,1)
    this.setData({
      fileList:newList
    })
    wx.cloud.deleteFile({
      fileList: [fileID]
    })
  },
  handleTitle(e){
    this.setData({
      title:e.detail.value 
    })
  },
  handleContext(e){
    this.setData({
      context:e.detail.value
    })
  },
  async handleClick(){
      wx.showLoading({
        title: '发布中',
      })
      let self = this 
      const title = self.data.title 
      const context = self.data.context 
      const titleResult = await self.validateTitle(title) 
      if(!titleResult){
        return ;
      }
      const contextResult = self.validateContext(context)
      if(!contextResult){
        return ;
      }
      const userName = wx.getStorageSync('Login')
      let newfileList = self.data.fileList.map(item => item.url)
      let data 
      let date = new Date()
      data = await db.collection("Users").where({_id:userName}).get().then(res => {
        return {
          context:self.data.context,
          title:self.data.title,
          author:res.data[0].userName,
          account:res.data[0].account,
          agree:0,
          comment:0,
          images:newfileList,
          date:date.toLocaleDateString()+" "+date.toLocaleTimeString().slice(2),
          commentList:[]
        }
      })
      db.collection("mettingList").add({data:data}).then(res => {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '会议室已开启',
          duration:1000,
          icon:'success',
          success(){self.setData({fileList:[],title:"",context:""});
                    setTimeout(()=>{wx.navigateBack({
                      delta: 1,
                    })},1000)}
        })
      })
      self.historyPublish(self,data.account,data.title,data.context)
      
  },
  // 验证标题
  async validateTitle(title){
    if(title.length === 0){
      wx.showToast({
        title: '标题不能为空',
        duration:1000,icon:'none'
      })
      return false;
    }
    const res = await db.collection("mettingList")
                  .where({title:title})
                    .get().then(res => {return res})
    if(res.data.length > 0){
      wx.showToast({
        title: '此问题已经在讨论中',duration:1000,icon:'none'
      })
      return false ;
    }else{
      return true ;
    }
  },
  // 验证内容
  validateContext(context){
    if(context.length === 0){
      wx.showToast({
        title: '内容不能为空',
        duration:1000,icon:'none'
      })
      return false ;
    }
    return true ;
  },
  // 放入到历史发布列表中
  historyPublish(self,_id,title,context){
    let historyPublish 
    db.collection("Users").doc(_id).get({
      success(res){
        console.log(res)
        historyPublish = res.data.historyPublish
        let newData = {
          title:title,_id:_id,context:context 
        }
        console.log(newData)
        db.collection("Users").doc(_id).update({
          data:{historyPublish:[newData,...historyPublish]}
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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