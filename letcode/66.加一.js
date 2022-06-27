/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let cache = 0, add = 1;
  for (let index = digits.length - 1; index >= 0; index--) {
    if(digits[index] + 1 > 9){
      digits[index] = 0
      cache = 1
      add--
    }else{
      digits[index]++
      cache = 0
      break
    }
  }
  return cache == 1 ? [1].concat(digits) : digits
};
// console.log(plusOne([1,2,3]));
// console.log(plusOne([9]));
// @lc code=end

