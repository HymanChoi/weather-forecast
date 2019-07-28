// util.js
// 删除当天信息
let shiftArray = function(arr) {
  return arr.shift();
}

// 返回剩余信息
let shiftArrayLeft = function(arr) {
  return arr;
}

let svgName = function(str) {
  let arr = str.split('转')
  switch (arr[0]) {
    case '暴雨':
      return 'baoyu.svg';
      break;
    case '大暴雨':
      return 'dabaoyu.svg';
      break;
    case '大风':
      return 'dafeng.svg';
      break;
    case '打雷':
      return 'dalei.svg';
      break;
    case '大雪':
      return 'daxue.svg';
      break;
    case '大雨':
      return 'dayu.svg';
      break;
    case '多云':
      return 'duoyun.svg';
      break;
    case '晴':
      return 'qing.svg';
      break;
    case '特大暴雨':
      return 'tedabaoyu.svg';
      break;
    case '雾':
      return 'wu.svg';
      break;
    case '小雪':
      return 'xiaoxue.svg';
      break;
    case '小雨':
      return 'xiaoyu.svg';
      break;
    case '阴':
      return 'yin.svg';
      break;
    case '中雨':
      return 'zhongyu.svg';
      break;
    default:
      return 'qing.svg';
  }
}

module.exports = {
  shiftArray,
  shiftArrayLeft,
  svgName
}