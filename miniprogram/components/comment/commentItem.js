// components/comment/commentItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMore:false,
    isMore:false,
    textHeight:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMore(){
      this.setData({
        showMore:!this.data.showMore
      })
    }
  },
  lifetimes:{
    attached(){
      let self = this 
      let ratio 
      wx.getSystemInfo({
        success: (res) => {
          let clientHeight = res.windowHeight 
          let clientWidth = res.windowWidth 
          ratio = 750 / clientWidth 
        }
      })

      this.createSelectorQuery().select("#text")
      .boundingClientRect().exec(function(res){
        var textHeight = res[0].height*ratio 
        if(textHeight > 200){
          self.setData({isMore:true,
            textHeight:250})
        }else{
          self.setData({isMore:false,
            textHeight:textHeight+50})
        }
      })
    },
  }
})
