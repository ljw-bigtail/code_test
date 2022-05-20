/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  // 做一个栈 先进后出
  function stack(){
    this.data = []
    this.last = ''
    const obj = {
      '(': ')',
      '{': '}',
      '[': ']'
    }
    this.add = function(item){
      // console.log(this.last, obj[this.last]);
      if(obj[this.last] == item){
        this.minus()
      }else{
        this.last = item
        this.data.push(item)
      }
    }
    this.minus = function(){
      this.data.pop()
      this.last = this.data[this.data.length - 1]
    }
  }
  var res = new stack()
  s.split('').forEach(e=>{
    res.add(e)
  })
  return res.data.length == 0
};
// console.log(isValid("()[]{}"));
// console.log(isValid("(]"));
// console.log(isValid("[]"));
// @lc code=end

