// components/selectSchool/selectSchool.js
const app =getApp() 
const globalData = app.globalData 
const obj = globalData.obj 
const province = obj.province
const city = obj.city 
const school = obj.allschool
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
    province:province,
    city:city[province[0].id],
    school:school[city[province[0].id][0].id],
    value:[0,0,0],
    // isShow:false,
    currentprovince:0,
    currentcity:0,
    currentSchool:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel(){
      this.triggerEvent("handleClose")
    },
    decide(){
      const school = this.data.school[this.data.currentSchool]
      this.triggerEvent('handleDecide',school)
    },
    pickchange(e){
      const provinceIndex = e.detail.value[0];
      const cityIndex = e.detail.value[1];
      const schoolIndex = e.detail.value[2];
      if(provinceIndex !== this.data.currentprovince){
        this.setData({
          currentprovince:provinceIndex,
          city:city[province[provinceIndex].id],
          school:school[city[province[provinceIndex].id][0].id]
        })
      }
      if(cityIndex !== this.data.currentcity){
        this.setData({
          currentcity:cityIndex,
          school:school[city[province[provinceIndex].id][cityIndex].id]
        })
      }
      if(schoolIndex !== this.data.currentcity){
        this.setData({
          currentSchool:schoolIndex
        })
      }
    }
  }
})
