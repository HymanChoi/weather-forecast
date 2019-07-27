// 删除当天信息
let shiftArray = function(arr) {
  return arr.shift();
}

let shiftArrayLeft = function(arr) {
  arr.shift();
  return arr;
}

module.exports = {
  shiftArray,
  shiftArrayLeft
}