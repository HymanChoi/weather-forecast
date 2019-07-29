//index.js
const app = getApp()

Page({
  data: {
    scrollHeight: 0, // 滚动区域高度
    wea: '', // 天气状况
    src: '', // 图标
    date: '', // 日期
    week: '', // 星期
    tem: '', // 当前温度
    tem1: '', // 最高温度
    tem2: '', // 最低温度
    city: '', // 城市
    district: '', // 地区
    list: [], // 其余信息列表
  },

  onLoad: function() {
    //更新完成后停止下拉更新动效
    wx.stopPullDownRefresh()

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
        let cityID = ''; // 地区ID

        // 坐标逆解析
        util.requestPromise(api + latitude + ',' + longitude + '&key=' + key + '&get_poi=1')
          .then(res => {
            that.setData({
              city: res.data.result.ad_info.city, // 城市
              district: res.data.result.ad_info.district, // 地区
            })

            // 获取地区ID
            cityID = json.cityID.find(x => {
              return (x.cityZh == res.data.result.ad_info.district.replace('区', '')) &&
                (x.provinceZh == res.data.result.ad_info.province.replace('省', '').replace('市', ''))
            })

            // 请求天气信息
            return util.requestPromise(api2 + cityID.id)
          })
          .then(res => {
            let item = util.shiftArray(res.data.data) // 当天信息
            let restList = res.data.data;
            for (let i = 0; i < restList.length; i++) {
              restList[i].src = '/images/black/' + util.imageName(restList[i].wea)
            }
            that.setData({
              wea: item.wea,
              src: '/images/white/' + util.imageName(item.wea),
              date: item.date,
              day: item.day,
              week: item.week,
              tem: item.tem,
              tem1: item.tem1,
              tem2: item.tem2,
              list: restList, // 剩余信息列表
            })
            wx.hideLoading();
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 2000
            })
          })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '正在更新',
    })
    this.onLoad();

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