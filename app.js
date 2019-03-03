//app.js
App({
  httpRequest: {
    requestResult: function(method,url, data) {
      if(method==="GET"){
        return new Promise((resolve, reject) => {
          wx.request({
            url: url,
            data: data,
            method: method,
            success: function (res) {
              resolve(res)
            },
            fail: function (res) {
              reject(res);
            },
            complete: function () {
              console.log('complete');
            }
          })
        })
      }else{
        return new Promise((resolve, reject) => {
          wx.request({
            url: url,
            method: method,
            header: {
              // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              'content-type': 'application/json'
            },
            data: data,
            success: function (res) {
              resolve(res)
            },
            fail: function (res) {
              reject(res);
            },
            complete: function () {
              console.log('complete');
            }
          })
        })
      }

    }
  },
  orderno:"",
  onLaunch: function (query) {
    console.log(query);
  }
})