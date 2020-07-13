// components/regist/regist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    accountValue:String,
    passwordValue:String
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
    switch(){
      this.triggerEvent("SwitchLogin")
    },
    handleAccount(e){
      this.triggerEvent("accountInput",e.detail)
    },
    handlePassword(e){
      this.triggerEvent("passwordInput",e.detail)
    },
    handleClick(){
      this.triggerEvent("handleLogin")
    }
  }
})
