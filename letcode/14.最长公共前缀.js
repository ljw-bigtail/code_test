/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  function same(arr){
    return arr.join('').replace(new RegExp(arr[0], 'g'), '') == '' ? arr[0] : false
  }
  const maxLen = Math.min(...strs.map(e=>e.length))
  let str = ''
  for (let i = 0; i < maxLen; i++) {
    var _str = same(strs.map(e=>e[i]))
    if(_str){
      str += _str
    }else{
      break
    }
  }
  return str
};
// console.log(longestCommonPrefix(["dog","racecar","car"]));
// console.log(longestCommonPrefix(["ab", "a"]))
// @lc code=end

