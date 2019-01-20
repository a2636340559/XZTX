const { $Toast } = require('../../dist/base/index');
const app=getApp()
Page({
  data: {
   Atime:[],
   Adeadline:'',
   Ano:'',
   atime:'',
   Address:'',
   Adate:'',
   Aname:'',
   formId:'',
   ajobstate:'',
   mess:[],
   applyNumber:[],
   applynum:0,
   Ajobstate:[],
   surplus:[],
    value: [0, 0, 0],
  },
  completeApply:function(e)
  {
    var that=this
    console.log("FORM_ID")
    console.log(e)
    that.setData({formId:e.detail.formId})
    if(this.data.applynum!=0)
   { 
     wx.request({
       url: 'http://localhost/volunteer/apply',
      data:
      {
        No:wx.getStorageSync("account"),
        Ano:this.data.Ano,
        Atime:this.data.atime,
        Ajobstate:this.data.ajobstate,
        Aname:this.data.Aname,
        Address:this.data.Address,
        Adate:this.data.Adate,
          formId: this.data.formId

      },
      method:'GET',
      success:function(res)
      {
        console.log("RESULT OF APPLY")
        console.log(res)
        if(res.data=='alreadyApply')
        {
          wx.showModal({
            title: '注意',
            content: '您已报名过该活动，请勿重复报名！',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
              console.log("alreadyApply")
            }
          })
        }
        else if(res.data=='anotherTime')
        {
          wx.showModal({
            title: '注意',
            content: '您已报名同时段的另一岗位，请重新选择！',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
              console.log("anotherTime")
            }
          })
        }
       else if (res.data == 'success')
       { 
         wx.showToast({
           title: '报名成功',
           icon: "success",
           duration: 1000,
           success: function () {
             console.log("8888888")
             wx.reLaunch({
               url: '/pages/activity/activity',
             })
          
           }
         })
       }
        else {
          wx.showModal({
            title: '注意',
            content: '由于不可知原因，报名失败',
            confirmText: "确认",
            cancelText: "取消",
            success: function (res) {
              console.log("0")
            }

          })
        }
      }
    })
   }
   else
   {
      wx.showModal({
        title: '注意',
        content: '当前岗位人数已满！',
        confirmText: "重新选择",
        cancelText: "取消",
        success: function (res) {
          console.log("INPUT NO")
        }
      })
   }
  },
  getDetail: function () {
    var that = this;
    wx.request({
      url: 'http://localhost/volunteer/viewApply',
      data:
        {
          Aname: this.data.Aname,
          Adeadline: this.data.Adeadline,
          Ano: this.data.Ano
        },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        var temp = res.data
        var flag = temp.atime[0];
        console.log("RES")
        console.log(res)
        var temp1 = []
        var num = []
        var aname = temp.pk.aname
        for (let i = 0; i < temp[flag].length; i++) {
          temp1.push(temp[flag][i].Ajobstate);
          num.push(temp[flag][i].surplus)
        }
        that.setData({ mess: temp, Aname:aname, Address:temp.address,Adate:temp.adate,Atime: temp.atime, applyNumber: num, Ajobstate: temp1, atime: flag, ajobstate: temp1[0], applynum: num[0] })
        console.log("NUM")
        console.log(that.data.applyNumber)
      }
    })
  },
  onLoad:function(options)
  {
    console.log("APPLY-OPTIONS");
    console.log(options)
    this.setData({Aname:options.Aname,Adeadline:options.Adeadline,Ano:options.Ano})
    this.getDetail()
   
  },
  bindChange: function (e) {
    const val = e.detail.value
    console.log("VAL")
    console.log(val)
    var temp=this.data.mess;
    var temp1 = [];
    var temp3=[];
    var flag=this.data.Atime[val[0]];
    for (let i = 0; i < temp[flag].length; i++) 
    {
      temp1.push(temp[flag][i].Ajobstate);
     temp3.push(temp[flag][i].surplus)
    }

    var temp2=temp1[val[1]]
    var num=temp3[val[1]]
    this.setData
    ({
      Ajobstate:temp1,
      applyNumber:temp3,
      atime:flag,
      applynum:num,
      ajobstate:temp2
    })
  }
})