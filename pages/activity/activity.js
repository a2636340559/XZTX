// pages/activity/activity.js
Page({
  data:
    {
      mess: [],
      height: 0
    },
 
  view: function (e) {
    console.log("Activity")
    console.log(e)
    wx.navigateTo
      ({
        url: '/pages/activity/activityMess?Aname=' + e.currentTarget.dataset.name + '&Adeadline=' + e.currentTarget.dataset.deadline+'&Ano='+e.currentTarget.dataset.ano+'&flag=now',
          success: function () {
          console.log('done')
        }
      })
  },
  getNews: function () {
    var that = this
    wx.request
      ({
        url: 'http://localhost/volunteer/viewActivity',
        data:
          {
            flag:'new'
          },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          
           res.data.forEach((item)=>
          {
              item.Adate=item.Adate.substring(0,10);
              item.publishTime=item.publishTime.substring(0,10);
          })
         
          console.log("NEWRES")
          console.log(res)
          that.setData({ mess: res })
        }
      })
     
  },
  refresh: function () {
    var that=this
        that.getNews();
   
  },
  onLoad: function (options) {
    this.getNews()
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({ height: res.windowHeight })
        console.log(that.data.height)
      },
    })
  },
  
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  onPullDownRefresh: function () {
   
        this.getNews();

  

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})