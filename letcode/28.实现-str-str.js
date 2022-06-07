/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  var sameLen = 0, index = -1, maxLen = haystack.length
  for (var i = 0; i < maxLen; i++) {
    // console.log(sameLen, i, needle[sameLen] == haystack[i]);
    if(needle[sameLen] == haystack[i]){
      sameLen++
      if(index == -1){
        index = i
      }
    }else{
      if(sameLen != 0){
        i = index
        sameLen = 0
        index = -1
      }
    }
    // console.log(sameLen, needle.length);
    if(sameLen == needle.length){
      return index
    }
  }
  return -1
};
// console.log(strStr("hello", "ll"));
// console.log(strStr("a", "a"));
// console.log(strStr("mississippi", "pi"));  
// console.log(strStr("mississippi", "issipi"));  
// console.log(strStr("aaaa", "aaaa"));
// @lc code=end
