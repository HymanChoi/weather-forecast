//detail.js
const app = getApp()

Page({
  // 页面的初始数据
  data: {
    today: '' // 当天信息
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(JSON.parse(options.query))
    this.setData({
      today: JSON.parse(options.query)
    })
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  }
})