// components/courseItem/courseItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    course:Object
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
      if(!account){
        // 如果没有登录
        wx.showToast({
          title: '请先登录',
          duration:1000,
          icon:'none'
        })
      }else{
        // const url = this.data.course.url 
        // const name = this.data.course.name
        // const img = this.data.course.image
        const id = this.data.course._id
        wx.navigateTo({
          // url:"../../../../../pages/video/video?name="+name+"&img="+img+"&url="+url+"&id="+id,
          url:"../../../../../pages/video/video?id="+id
        })
      }
    }
  }
})
