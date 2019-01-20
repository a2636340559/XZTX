// pages/index/regist.js
const app = getApp()
Page({
  data:
    {
      disabled: true,
      name: " ",
      department: " ",
      studentNum: " ",
      phoneNum: " ",
      volunteerNum: " ",
      message:"",
      isNumRight: 1,
      isClassRight: 1,
      gender: " "
    },
  checkNum: function (e) {
    var regNum = new RegExp('[0-9]+', 'g');
    if (!regNum.exec(e)) {
      wx.showModal({
        title: '格式错误',
        content: '手机号不能含有字符',
        confirmText: "确认",
        success: function () {
          console.log("数字校验");
          console.log(e);
        }
      })
    }
    else
      this.setData({ isNumRight: 0 });
  },
  checkClass: function (e) {
    var regClass = new RegExp('.+学院.+班', 'g');
    if (!regClass.exec(e)) {
      wx.showModal({
        title: '格式错误',
        content: '班级格式为xx学院xx班',
        confirmText: "确认",
        success: function () {
          console.log("班级校验");
          console.log(e);
        }
      })
    }
    else
      this.setData({ isClassRight: 0 });
  },
  bindblur: function (e)//改变按钮状态
  {
    console.log("FFFFFF")
    console.log(e)
    var content = e.detail.value;
    if (content != ' ')
      this.setData({ disabled: false })
  },
  formSubmit: function (e)//提交表单信息
  {
    var that=this;
    if(e.detail.value.studentNum===""||e.detail.value.name==="")
    {
      wx.showModal({
        title: '注意',
        content: '姓名和学号不能为空',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          console.log("INPUT NO")
        }
      })
    }
    else
    {
      this.checkNum(e.detail.value.phoneNum);
      this.checkClass(e.detail.value.department);
    this.setData({studentNum:e.detail.value.studentNum})
    console.log('ACCOUNT')
    console.log(e)
    if (this.data.isNumRight == 0 && this.data.isClassRight == 0)
    {
      wx.request({
        url: 'http://localhost/volunteer/insertUserMess',
        data:
          {
            Name: e.detail.value.name,
            Sex: e.detail.value.gender,
            No: e.detail.value.studentNum,
            Class: e.detail.value.department,
            Vno: e.detail.value.volunteerNum,
            Phone: e.detail.value.phoneNum
          },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (res) {
          console.log('TEST')
          console.log(res)
          wx.showToast({
            title: '成功',
            icon: "success",
            duration: 1000,
            success: function () {
              wx.setStorageSync('regist', 'Yes')
              wx.setStorageSync('account', that.data.studentNum)
              wx.switchTab
                ({
                  url: '/pages/activity/activity'
                })
            }
          })
        }
      })
    }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {

  },

  onShareAppMessage: function () {

  }
})