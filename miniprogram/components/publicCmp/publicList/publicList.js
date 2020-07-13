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
    publicList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    ready(){
      let self = this 
      db.collection('publicList').get({
        success(res){
          self.setData({
            publicList:res.data
          })
        }
      })
    }
  }
})
