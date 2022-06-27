/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  // return (parseInt(a, 2) + parseInt(b, 2)).toString(2)
  var sum = new Array(Math.max(a.length, b.length) + 1).fill(0)
  var _a = sum.length - a.length
  var _b = sum.length - b.length
  var cache = 0
  for (let index = sum.length - 1; index >= 0; index--) {
    var _sum = ((a[index - _a] || 0) - 0) + ((b[index - _b] || 0) - 0) + cache
    var c = _sum % 2 
    cache = (_sum - c) / 2
    sum[index] = c
  }
  return sum.slice(sum.findIndex(e=>e==1)).join('')
};
// console.log(addBinary("1111", "1111"))
// console.log(addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101", "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"));
// @lc code=end
