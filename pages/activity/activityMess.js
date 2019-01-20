// pages/activity/activityMess.js
const app=getApp()
Page({
  data: {
    targetTime: 0,
    targetTime1:0,
    Aname:'',
    Ano:'',
    id:false,
    Adeadline:'',
    mess:[],
    myFormat: ['时', '分', '秒'],
    myFormat1: ['天', '时', '分', '秒'],
    status: '进行中...',
    clearTimer: false
  },
  onLoad:function(options) 
  {
    console.log('DETAILS')
    console.log(options)
    var ID;
    if(options.flag=='history')
    ID=true
    if(options.flag=='now')
    ID=false
    this.setData({ Aname: options.Aname, Adeadline: options.Adeadline, Ano: options.Ano, id: ID,targetTime1:new Date().getTime()+3000})
   this.getDetail()

   console.log('TARGETTIME2')
   console.log(this.data.targetTime1)
  },
  getDetail:function()
  {
    var that=this;
    wx.request({
      url: 'http://localhost/volunteer/viewApply',
      data:
      {
        Aname:this.data.Aname,
        Adeadline:this.data.Adeadline,
        Ano:this.data.Ano
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method:'POST',
      success:function(res)
      {
        console.log("活动详情")
        console.log(res)
        console.log(res.data.time)
        var time = new Date().getTime() + res.data.time
        console.log(time)
        that.setData({
          mess:res.data,
          targetTime1: time
        });
        console.log("TARGETTIME2")
        console.log(new Date().getTime())
        console.log(that.data.mess)
      }
    })
  },
  onUnload() {
    this.setData({
      clearTimer: true
    });
  },
  handleApply()
  {
    wx.navigateTo({
      url: '/pages/activity/apply?Aname=' +this.data.Aname+'&Adeadline='+this.data.Adeadline+'&Ano='+this.data.Ano
    })
  },
  handleApply1()
  {
    wx.navigateTo({
      url: '/pages/activity/apply1?Aname=' + this.data.Aname + '&Adeadline=' + this.data.Adeadline + '&Ano=' + this.data.Ano
    })
  },
  myLinsterner(e) {
    console.log("E")
    console.log(e)
    console.log(this.data.targetTime2)
    this.setData({
      status: '结束'
    });
  }
});
