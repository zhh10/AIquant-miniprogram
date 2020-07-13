// components/Book/BookItem/BookItem.js
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
    ViewList:['a','b','c'],
    toView:"a",
    screenHeight:'',
    ifFirst:true,
    stockData:[],
    chainData:[],
    quantData:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e){
      this.setData({
        toView:this.data.ViewList[e.detail]
      })
    },
    onScroll(e){
      let scrollTop = e.detail.scrollTop
      if(scrollTop>=0 && scrollTop < this.data.screenHeight){
        if(this.data.ifFirst){
          this.selectComponent("#nav").children[0].onClick()
          this.setData({
            ifFirst:false
          })
        }
      }else if(scrollTop >= this.data.screenHeight && scrollTop < 2*this.data.screenHeight){
        if(!this.data.ifFirst){
          this.selectComponent("#nav").children[1].onClick()
          this.setData({
            ifFirst:true
          })
        }
      }else if(scrollTop >= 2*this.data.screenHeight){
        if(this.data.ifFirst){
          this.selectComponent('#nav').children[2].onClick() 
          this.setData({
            ifFirst:false
          })
        }
      }
    }
  },
  lifetimes:{
      ready(){
        let self = this
        wx.getSystemInfo({
          success: (result) => {
            self.setData({
              screenHeight:result.windowHeight
            })
          },
        })
        db.collection("CourseList").get({
          success(res){
            const stockData = res.data.filter(item=>item['class']==='stock')
            const chainData = res.data.filter(item=>item['class']==='chain')
            const quantData = res.data.filter(item=>item['class']==='quant')
            self.setData({
              stockData:stockData,
              chainData:chainData,
              quantData:quantData
            })
          }
        })
      }
  }
})
