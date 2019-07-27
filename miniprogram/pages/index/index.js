//index.js
const app = getApp()

Page({
  data: {
    scrollHeight: 0, // 滚动区域高度
    list: [],
    wea: '',
    date: '',
    day: '',
    week: '',
    tem: '',
    tem1: '',
    tem2: ''
  },

  onLoad: function() {
    let json = require('../../data/json.js')
    let util = require('../../data/util.js')
    let that = this;

    // 计算滑动高度
    this.calcScrollHeight();

    // 页面加载完成，获取用户位置信息
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude; // 纬度
        const longitude = res.longitude; // 经度
        const key = 'B3OBZ-V32C6-JXYSJ-MCLN6-PA7ZF-VAFQY'; // 腾讯地图key
        const api = 'https://apis.map.qq.com/ws/geocoder/v1/?location='; // 腾讯地图API
        const api2 = 'https://www.tianqiapi.com/api/?version=v1&cityid='; // 天气API
        let province = ''; // 省份
        let city = ''; // 城市
        let district = ''; // 地区
        let cityID = ''; // 地区ID

        // 坐标逆解析
        wx.request({
          url: api + res.latitude + ',' + res.longitude + '&key=' + key + '&get_poi=1',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            // 省份
            province = res.data.result.ad_info.province.replace('省', '').replace('市', '');
            // 城市
            city = res.data.result.ad_info.city.replace('市', '');
            // 地区
            district = res.data.result.ad_info.district.replace('区', '');
            // 地区ID
            cityID = json.cityID.find(x => {
              return (x.cityZh == district) && (x.provinceZh == province)
            })

            // 请求天气信息
            wx.request({
              url: api2 + cityID.id,
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                let item = util.shiftArray(res.data.data) // 当天天气
                that.setData({
                  wea: item.wea,
                  date: item.date,
                  day: item.day,
                  week: item.week,
                  tem: item.tem,
                  tem1: item.tem1,
                  tem2: item.tem2,
                  list: util.shiftArrayLeft(res.data.data), // 剩余六天天气
                })
              }
            })
          }
        })
      }
    })
  },

  // 计算滚动区域高度
  calcScrollHeight() {
    let that = this;
    let query = wx.createSelectorQuery().in(this);
    query.select('.top').boundingClientRect(function(res) {
      // top高度
      let topHeight = res.height;
      // 屏幕高度
      let screenHeight = wx.getSystemInfoSync().windowHeight;
      // 滚动区域高度
      let scrollHeight = screenHeight - topHeight - 70;

      that.setData({
        scrollHeight: scrollHeight
      })
    })
  },

})