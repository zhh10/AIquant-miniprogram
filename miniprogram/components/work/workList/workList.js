const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    companyList:null,
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

  },
  lifetimes:{
    async attached(){
      const data = await db.collection("workList").get().then(res => res.data)
      this.setData({
          companyList:data
      })
    }
  }
})
