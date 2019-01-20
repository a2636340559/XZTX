// pages/more/Man-HourDetail.js
Page({

  data: 
  {
    Man_Hour:[],
    detailHour:[],
    name:'name1'
  },
  searchManHour: function () {
    var that = this;
    wx.request({
      url: 'http://localhost/volunteer/searchManHour',
      data: { No: wx.getStorageSync('account') },
      method: 'GET',
      success: function (res) {
        console.log("工时详情")
        console.log(res)
        that.setData({ detailHour: res.data })
        console.log(wx.getStorageSync('account'))
        wx.stopPullDownRefresh()

      }
    })
  },
  onLoad: function (options)
   {
     this.searchManHour()
  },

  onReady: function () {

  },
  onShow: function () {

  },

  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})