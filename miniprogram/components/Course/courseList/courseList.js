// components/courseList/courseList.js
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
    courseData:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(){
      if(!wx.getStorageSync('Login')){
        wx.showToast({
        title: '请先登录',
        icon:'none',
        duration:1000
      })}else{
        wx.navigateTo({
          url: '/pages/CourseDetail/CourseDetail',
        })
      }
    }
  },
  lifetimes:{
    async attached(){
      const self = this 
      const data = await db.collection("CourseList").where({
        isTitle:true
      }).get().then(res => {return res.data})
      self.setData({
        courseData:data
      })
    }
  }
})
