// pages/man-hour/searchCredit.js
Page({
  data: 
  {
    flag:true,
    mess:'修改信息',
    detailHour:[],
    isNumRight:1,
    isClassRight:1,
    MyMess:[]
  
  },
  checkNum:function (e) {
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
  checkClass:function (e) {
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
  searchManHour:function()
  {
    var that=this;
wx.request({
  url: 'http://localhost/volunteer/searchManHour',
  data: { No: wx.getStorageSync('account')},
  method:'POST',
  success:function(res)
  {
    console.log("工时详情")
    console.log(res)
    that.setData({detailHour:res.data})

  }
})
  },
formSubmit:function(e)
  {
    console.log(this.data.flag)
    var that=this;
    if(this.data.mess=='修改信息')
    {
      that.setData({flag:false})
  wx.showModal({
    title: '信息修改',
    content: '在需要修改的信息列重新输入。学号不能修改！',
    confirmText: "确认修改",
    cancelText: "取消",
    success: function (res) {
      console.log(that.data.flag);
      that.setData({mess:'完成'})
      if (res.confirm) {
        console.log('确认修改')
      } else {
        console.log('取消修改')
      }
    }
  });
    }
 else if(this.data.mess=='完成')
 {
   console.log("E")
   console.log(e.detail)
   var that=this;
    this.checkNum(e.detail.value.phoneNum);
    this.checkClass(e.detail.value.department);
      console.log("isNumRight:{0}", this.data.isNumRight)
      console.log("iSClassRight:{0}", this.data.isClassRight)
    if(this.data.isNumRight==0&&this.data.isClassRight==0)
    {
      wx.setStorageSync("account", e.detail.value.studentNum)
      wx.request({
        url: 'http://localhost/volunteer/updateUserMess',
        data:
          {
            Name: e.detail.value.name,
            Sex: e.detail.value.gender,
            No: e.detail.value.studentNum,
            Class: e.detail.value.department,
            Vno: e.detail.value.volunteerNum,
            Phone: e.detail.value.phoneNum,
          },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'GET',
        success: function (res) {
          console.log(res);
          that.setData({ flag: true, mess: '修改信息',isNumRight:1,isClassRight:1 })
          wx.showToast({

            title: '修改成功',
            icon: "success",
            duration: 1000,
            success: function () {
              wx.redirectTo
                ({
                  url: '/pages/MyMess/Mess'
                })
            }
          })
        }
      })
    }
   }
    
  },
getMess:function()
{
  var that=this;
  wx.request({
    url: 'http://localhost/volunteer/userMess',
    data:
      {
        No: wx.getStorageSync('account'),
      },
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    success: function (res) {
      console.log(res)
      that.setData({ MyMess: res.data })
     
    }
  })
},
  onLoad: function (options)
  {
      this.getMess()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function ()
   {
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