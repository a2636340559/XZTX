// pages/more/alreadyApply.js
const { $Message } = require('../../dist/base/index');
Page({
  data: 
  {
      apply:[],
      Ajobstate:'',
      Aname:'',
      Ano:'',
      Atime:'',
      visible2: false,
      //小程序没有refs，所以只能用动态布尔值控制关闭
      toggle: false,
      toggle2: false,
      actions2: [
        {
          name: '取消报名',
          color: '#ed3f14'
        }
      ],
  },
  handleCancel2() {
    this.setData({
      visible2: false,
      toggle: this.data.toggle ? false : true
    });
    console.log(this.data.toggle, 111111111)
  },
  handleClickItem2:function(e) 
  {
   var that=this
   wx.request({
     url: 'http://localhost/volunteer/cancelApply',
     data:
     {
         No: wx.getStorageSync("account"),
         flag: 'cancelApply',
         Ajobstate:this.data.Ajobstate,
         Ano:this.data.Ano,
         Atime:this.data.Atime
        
     },
     header: { 'content-type': 'application/x-www-form-urlencoded' },
     method:'POST',

     success:function(res)
     {
       console.log("CANCEL")
       console.log(res)
      that.setData({visible2:false})
       if (getCurrentPages().length != 0) 
       {
         //刷新当前页面的数据
         getCurrentPages()[getCurrentPages().length - 1].onLoad()
       }
     }
   })
  },
  handlerCloseButton() {
    this.setData({
      toggle2: this.data.toggle2 ? false : true
    });
  },
  actionsTap:function(e) {
    console.log("TEST")
    console.log(e)
    this.setData({
      visible2: true,
      Ajobstate:e.currentTarget.dataset.ajobstate,
      Aname: e.currentTarget.dataset.aname,
      Ano: e.currentTarget.dataset.ano,
      Atime: e.currentTarget.dataset.atime
    });
  }
,
  onLoad: function (options) 
  {
    var that=this
    wx.request({
      url: 'http://localhost/volunteer/cancelApply',
      data:
      {
        No:wx.getStorageSync("account"),
        flag:'getApply',
       
      },
      method:'GET',
      success:function(res)
      {
        console.log("GETAPPLY")
        console.log(res)
        var temp=[]
        var temp1=res.data
        for(let i=0;i<res.data.length;i++)
        {
          if(temp1[i].state=="未开始")
          temp.push(temp1[i])
        }
        console.log(temp)
        that.setData({apply:temp})
        wx.stopPullDownRefresh()
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },

  
  onUnload: function () {

  },

  
  onPullDownRefresh: function () {
    this.onLoad()

  },

  
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})