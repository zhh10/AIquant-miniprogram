// components/login/login.js
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
    isShow:true,
    school:"",
    account:"",
    password:"",
    isLogin:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    choose(){
      this.setData({
        isShow:false
      })
    },
    close(){
      this.setData({
        isShow:true
      })
    },
    decide(e){
      const school = e.detail
      this.setData({
        school:school,
        isShow:true
      })
    },
    switchLogin(){
      this.setData({
        isLogin:!this.data.isLogin
      })
    },
    // 账号输入
    accountInput(e){
      this.setData({
        account:e.detail.value
      })
    },
    passwordInput(e){
      this.setData({
        password:e.detail.value
      })
    },
    // 验证账号的方法
    validateAccount(account){
      if(account.length === 0){
        return {code:0,message:"请输入账号"}
      }else if(account.length < 11){
        return {code:1,message:"账号长度不能小于11"}
      }else{
        return {code:200}
      }
    },
    // 根据账号来弹窗
    showToastAccount(code){
      if(code === 0){
        wx.showToast({
          title: '请输入账号',icon:'none',duration:1000
        })
        return false ;
      }
      if(code === 1){
        wx.showToast({
          title: '账号长度不能小于11',
          icon:'none',
          duration:1000
        })
        return false
      }
      return true // 以上条件都不满足
    },
    // 验证密码的方法
    validatePassword(pwd){
      if(pwd.length === 0){
        return {code:0,message:"密码不能为空"}
      }else if(pwd.length < 6){
        return {code:1,message:"密码过于简单"}
      }else{
        return {code:200}
      }
    },
    showToastPwd(code){
      if(code === 0){
        wx.showToast({
          title: '请输入密码',icon:'none',duration:1000
        })
        return false ;
      }
      if(code === 1){
        wx.showToast({
          title: '密码过于简单',
          icon:'none',
          duration:1000
        })
        return false 
      }
      return true
    },
    // 注册新账号
    Regist(){
      let self = this 
      let accountResult = this.validateAccount(this.data.account)
      if(!this.showToastAccount(accountResult.code)){
        return ;
      }
      let pwdResult = this.validatePassword(this.data.password)
      if(!this.showToastPwd(pwdResult.code)){
        return ;
      }
      if(self.data.school.length==0){
        wx.showToast({
          title: '请选择你的学校',
          icon:'none',
          duration:1000
        })
        return ;
      }
      db.collection("Users").where({
        account:self.data.account,
      }).get({
        success(res){
          if(res.data.length === 0){
            db.collection("Users").add({
              data:{account:self.data.account,pwd:self.data.password,
                    school:self.data.school,userName:"游客",_id:self.data.account,
                    historyPublish:[],historyComment:[],newsList:[]
                  },
              success(){
                wx.showToast({
                  title: '注册成功',
                  icon:'success',
                  duration:1000,
                  success(){
                    setTimeout(()=>{
                      self.setData({account:"",password:"",school:"",isLogin:!self.data.isLogin})
                    },1000)
                  }
                })
              }
            }
            )
          }else if(res.data.length > 0){
            wx.showToast({
              title: '账号已被注册',icon:'none',
              duration:1000,success(){
                setTimeout(()=>{
                  self.setData({account:""})
                },1000)
              }
            })
          }
        },fail(err){
          wx.showToast({
            title: '发生未知错误',
            icon:"none",
            duration:1000
          })
        }
      })
    },
    Login(){
      let self = this 
      let accountResult = this.validateAccount(this.data.account)
      if(!this.showToastAccount(accountResult.code)){
        return ;
      }
      let passwordResult = this.validatePassword(this.data.password)
      if(!this.showToastPwd(passwordResult.code)){
        return ;
      }
      db.collection("Users").where({
        account:self.data.account,
        pwd:self.data.password
      }).get({
        success(res){
          if(res.data.length === 1){
            wx.showToast({
              title: '登录成功',
              icon:'success',
              duration:1000,
              success(){
                wx.setStorageSync("Login",self.data.account)
                setTimeout(()=>{
                  wx.navigateBack({
                    delta: 1,
                  })
                },1000)
                self.setData({account:"",password:""})
              }
            })
          }else if(res.data.length === 0){
            wx.showToast({
              title: '账号或者密码输入错误',
              icon:'none',duration:1000,
              success(){
                self.setData({
                  account:"",password:""
                })
              }
            })
          }
        }
      })
    }
  }
})
