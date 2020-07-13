// components/work/workItem/workItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    work:Object
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
    attached(){
      let workDetailList = this.properties.work.workDetail
      let workRequireList = this.properties.work.workRequire
      
      
    }
  }
})
