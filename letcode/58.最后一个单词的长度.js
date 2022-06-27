/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  var data = s.split(' ').filter(e=>{
    return e != ''
  })
  return data.slice(-1)[0].length
};
// console.log(lengthOfLastWord("Today is a nice day"));
// @lc code=end

