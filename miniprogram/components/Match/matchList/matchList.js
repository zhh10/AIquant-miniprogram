// components/match/match.js
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
    MatchData:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  lifetimes:{
    attached(){
      const self = this 
      db.collection("Match").get({
        success(res){
          self.setData({
            MatchData:res.data
          })
        }
      })
    }
  }
})
