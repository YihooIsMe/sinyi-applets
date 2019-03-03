// pages/roomDetails/roomDetails.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    roomDetailsArgs: "",
    url: "http://222.73.113.158:8080/api/Anyuan/GetAnyuanModel",
    swiperImgUrl: "",
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    swiperHeight: "",
    roomDetail: "",
    houseInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    wx.showLoading({
      title: '数据正在加载',
    });
    console.log(query.AccountNo);
    console.log(query.OrderNo);
    this.setData({
      roomDetailsArgs: {
        AccountNo: "570016365",
        OrderNo: query.OrderNo
        // OrderNo: "SAJ00286235"
      }
    });
    var self = this;
    app.httpRequest.requestResult("POST", this.data.url, this.data.roomDetailsArgs)
      .then(res => {
        console.log(res.data.Result);
        var dataSource = res.data.Result;
        self.setData({
          roomDetail: dataSource,
          houseInfo: dataSource.HouseInfo
        });
        console.log(self.data.houseInfo);

        var article = self.data.houseInfo;
        WxParse.wxParse('article', 'html', article, self, 5);
        
        var imgObj = [];
        if (dataSource.HouseMapList.length > 0) {
          for (var j = 0; j < dataSource.HouseMapList.length; j++) {
            imgObj.push(dataSource.HouseMapList[j].ImageUrl);
          }
        }

        if (dataSource.InteriorPictureMapImageTypeList.length > 0) {
          for (var k = 0; k < dataSource.InteriorPictureMapImageTypeList.length; k++) {
            imgObj.push(dataSource.InteriorPictureMapImageTypeList[k].ImageUrl)
          }
        }

        if (dataSource.BuildingsIamgeList.length > 0) {
          for (var i = 0; i < dataSource.BuildingsIamgeList.length; i++) {
            imgObj.push(dataSource.BuildingsIamgeList[i].ImageUrl);
          }
        }
        self.setData({
          swiperImgUrl: imgObj
        });
        console.log(self.data.swiperImgUrl)
        // console.log(self.data.roomDetail);
        wx.setNavigationBarTitle({
          title: self.data.roomDetail.CaseName,
        });
        wx.hideLoading();
      });
    // console.log(this.data);
    // console.log(this.data.roomDetail);
    // console.log(this.data.roomDetailsArgs);

  },

  imageLoad: function(e) {
    var imgWidth = e.detail.width;
    var imgHeight = e.detail.height;
    const query = wx.createSelectorQuery();
    var self = this;
    query.select('.swiperImg').boundingClientRect(function(res) {
      console.log(res.width);
      self.setData({
        swiperHeight: res.width * imgHeight / imgWidth
      })
    }).exec()
  },

  makePhoneCall(){
    wx.makePhoneCall({
      phoneNumber:"4000337171,8397"
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})