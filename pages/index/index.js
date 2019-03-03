//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dataSource: [],
    url: "http://222.73.113.158:8080/api/Anyuan/GetAnyuanListByPage",
    requestArgs: {
      CityId: "001",
      IsBranch: 0,
      ObjectStatus: 1,
      OrderType: 1,
      PageIndex: 1,
      PageSize: 12
    }
  },

  onLoad: function() {
    // wx.showLoading({
    //   title: '正在加载中',
    // });

    // var self = this;
    // app.httpRequest.requestResult("POST", this.data.url, this.data.requestArgs)
    //   .then(res => {
    //     self.setData({
    //       dataSource: res.data.Result.Data
    //     })
    //     console.log(self.data.dataSource);
    //     wx.hideLoading();
    //   })
    this.loadRoomList(1,this.data.url, this.data.requestArgs)

  },

  showRoomDetails: function(e) {
    app.orderno = e.currentTarget.dataset.orderno;
    // console.log(e.currentTarget.dataset);
    // console.log(app.orderno);
    wx.navigateTo({
      url: '../roomDetails/roomDetails',
    });
  },

  onPullDownRefresh() {
    this.setData({
      requestArgs: {
        CityId: "001",
        IsBranch: 0,
        ObjectStatus: 1,
        OrderType: 1,
        PageIndex: 1,
        PageSize: 12
      }
    });
    console.log("a")
    this.loadRoomList(0,this.data.url, this.data.requestArgs)
    console.log("b")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '上拉加载更多……',
    })
    var self = this;
    var pageIndex = this.data.requestArgs.PageIndex+1;
    this.setData({
      requestArgs: {
        CityId: "001",
        IsBranch: 0,
        ObjectStatus: 1,
        OrderType: 1,
        PageIndex: pageIndex,
        PageSize: 12
      }
    })
    app.httpRequest.requestResult("POST", this.data.url, this.data.requestArgs)
      .then(res => {
        var dataList=self.data.dataSource;
        for (var i = 0; i < res.data.Result.Data.length;i++){
          dataList.push(res.data.Result.Data[i])
        }
        self.setData({
          dataSource: dataList
        })
        console.log(self.data.dataSource);
        wx.hideLoading();
      })
  },

  loadRoomList:function(index,url,args){
    if(index===1){
      wx.showLoading({
        title: '正在加载中',
      });
    }

    var self = this;
    app.httpRequest.requestResult("POST", url, args)
      .then(res => {
        self.setData({
          dataSource: res.data.Result.Data
        })
        console.log(self.data.dataSource);
        if(index===1){
          wx.hideLoading();
        }else if(index===0){
          wx.stopPullDownRefresh();
        }
        
      })

  }
})