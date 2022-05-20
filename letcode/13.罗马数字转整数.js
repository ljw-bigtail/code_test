/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  // 思路 把字符串转换为数学公式：先把特殊情况处理了，然后在连续加  
  const obj = {
    'IV': 4,
    'IX': 9,
    'XL': 40,
    'XC': 90,
    'CD': 400,
    'CM': 900,
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
  }
  const sp_keys = ['IV','IX','XL','XC','CD','CM']
  const s_arr = s.split('')
  let next = false
  let data = 0
  for (let i = 0; i < s_arr.length; i++) {
    if(next) {
      next = false
      continue
    }
    if(s_arr[i + 1] != undefined && sp_keys.includes(s_arr[i] + s_arr[i + 1])){
      // console.log(s_arr[i] + s_arr[i + 1], 'true');
      data += obj[s_arr[i] + s_arr[i + 1]]
      next = true
    }else{
      // console.log(s_arr[i], 'false');
      data += obj[s_arr[i]]
      next = false
    }
  }
  return data
};
// @lc code=end

