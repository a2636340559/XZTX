const { $Toast } = require('../../dist/base/index');
const app = getApp()
Page({
  data: {
    Atime: [],
    Adeadline: '',
    Ano: '',
    atime: '',
    No:'',
    Address: '',
    Adate: '',
    Aname: '',
    formId: '',
    ajobstate: '',
    mess: [],
    applyNumber: [],
    applynum: 0,
    Ajobstate: [],
    surplus: [],
    value: [0, 0, 0],
  },
  completeApply: function (e) {
    var that=this
    console.log("FORM_ID")
    console.log(e)
    that.setData({ formId: e.detail.formId })
    if(this.data.No=="")
    {
      wx.showModal({
        title: '注意',
        content: '请输入需要报名的人的学号',
        confirmText: "输入学号",
        cancelText: "取消",
        success:function(res)
        {
            console.log("INPUT NO")
        }
      })
    }
    else
    {
      if(this.data.applynum!=0)
   {
     var that=this
           wx.request({
             url: 'http://localhost/volunteer/apply',
              data:
                {
                  No: that.data.No,
                  Ano: that.data.mess.Ano,
                  Atime: that.data.atime,
                  Ajobstate: that.data.ajobstate,
                  Aname:that.data.Aname,
                  Address:that.data.Address,
                  Adate:that.data.Adate,
                  formId:that.data.formId
                },
              method: 'GET',
              success: function (res) {
                console.log("RESULT OF APPLY")
                console.log(res)
                if (res.data == 'alreadyApply') {
                  wx.showModal({
                    title: '注意',
                    content: '该用户已报名过该活动，请勿重复报名！',
                    confirmText: "确认",
                    cancelText: "取消",
                    success: function (res) {
                      console.log("alreadyApply")
                    }
                  })
                }
                else if (res.data == 'anotherTime') {
                  wx.showModal({
                    title: '注意',
                    content: '该用户已报名同时段的另一岗位，请重新选择！',
                    confirmText: "确认",
                    cancelText: "取消",
                    success: function (res) {
                      console.log("anotherTime")
                    }
                  })
                }
                else if (res.data=='success') 
                {
                  wx.showToast({
                    title: '报名成功',
                    icon: 'success',
                    duration: 1000,
                    success: function () {
                      console.log("DID IT")
                      wx.reLaunch
                        ({
                          url: '/pages/activity/activity'
                        })
                     
                    }
                  })
                }
                else if(res.data=='noRegister')
                {
                  console.log("HELLO WORLD")
                    wx.showModal({
                      title: '注意',
                      content: '该用户尚未注册，无法帮ta报名！',
                      confirmText: "确认",
                      cancelText: "取消",
                      success: function (res) {
                        console.log("-1")
                      }

                    })
                }
                else
                {
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
        var temp1 = []
        var num = []
        var aname = temp.pk.aname
        for (let i = 0; i < temp[flag].length; i++) {
          temp1.push(temp[flag][i].Ajobstate);
          num.push(temp[flag][i].surplus)
        }
        that.setData({ mess: temp, Aname: aname, Atime: temp.atime, Address: temp.address, Adate: temp.adate, applyNumber: num, Ajobstate: temp1, atime: flag, ajobstate: temp1[0], applynum: num[0] })
        console.log("NUM")
        console.log(that.data.applyNumber)
      }
    })
  },
  onLoad: function (options) {
    console.log("APPLY-OPTIONS");
    console.log(options)
    this.setData({ Aname: options.Aname, Adeadline: options.Adeadline, Ano: options.Ano })
    this.getDetail()
  },
  getNo:function(e)
  {
    var that=this;
    that.setData({No:e.detail.value})
    console.log("NO")
    console.log(this.data.No)
  },
  bindChange: function (e) {
    const val = e.detail.value
    console.log("VAL")
    console.log(val)
    var temp = this.data.mess;
    var temp1 = [];
    var temp3 = [];
    var flag = this.data.Atime[val[0]];
    for (let i = 0; i < temp[flag].length; i++) {
      temp1.push(temp[flag][i].Ajobstate);
      temp3.push(temp[flag][i].surplus)
    }

    var temp2 = temp1[val[1]]
    var num = temp3[val[1]]
    this.setData
      ({
        Ajobstate: temp1,
        applyNumber: temp3,
        atime: flag,
        applynum: num,
        ajobstate: temp2
      })
  }
})