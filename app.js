//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
     
      success: res => {
       
        wx.setStorageSync("code", res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          // 若未授权，
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意获取用户信息，后续调用 wx.getUserInfo 接口不会弹窗询问
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  wx.setStorageSync("userinfo", res.userInfo)
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
          
        }
      }
    })
  },
  globalData: {
    userInfo: null,
   openid:"",
   access_token:''
  }
})