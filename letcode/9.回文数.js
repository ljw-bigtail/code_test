/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  var str = x.toString()
  var len = str.length
  if(len % 2 == 0){
    // 偶数
    var center = len / 2
    return str.slice(0, center) == str.slice(center).split('').reverse().join('')
  }else{
    // 奇数
    var center = Math.floor(len / 2)
    return str.slice(0, center) == str.slice(center + 1).split('').reverse().join('')
  }
};
// console.log(isPalindrome(121));
// console.log(isPalindrome(-121));
// console.log(isPalindrome(10));
// console.log(isPalindrome(NaN));
console.log(isPalindrome(1001));
// @lc code=end

