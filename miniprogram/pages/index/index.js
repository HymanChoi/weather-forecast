//index.js
const app = getApp()

Page({
  data: {
    scrollHeight: 0
  },

  onLoad: function() {

    this.calcScrollHeight();

    // 页面加载完成，获取用户位置信息
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const key = '75e1f7a8491aa6ad52d173477cf433d1';
        const api = 'http://apis.juhe.cn/simpleWeather/query?city=';
        const city = '广州';

        // 坐标逆解析
        // wx.request({
        //   url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&get_poi=1',
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success(res) {

        //     console.log(res.data);
        //   }
        // })

        // 请求天气信息
        // wx.request({
        //   url: api + city + '&key=' + key,
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success(res) {
        //     console.log(res.data);
        //   }
        // })

      }
    })
  },

  calcScrollHeight() {
    let that = this;
    let query = wx.createSelectorQuery().in(this);
    query.select('.top').boundingClientRect(function(res) {
      // top高度
      let topHeight = res.height;
      // 屏幕高度
      let screenHeight = wx.getSystemInfoSync().windowHeight;
      // 滑动高度
      let scrollHeight = screenHeight - topHeight - 70;

      that.setData({
        scrollHeight: scrollHeight
      })
    })
  }
})