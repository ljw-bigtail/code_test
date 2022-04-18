/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// var addTwoNumbers = function(l1, l2) {
//   // 题目没有看明白，题目中说的传入的参数是链表；
//   // 虽然打印输入的参数是[2,4,3] [5,6,4]，但是这个实际上不是数组，所以就不能使用数组相关的api
//   const sum = new Array(Math.max(l1.length, l2.length) + 1).fill(0)
//   let yichu = 0
//   sum.map((item, index)=>{
//     const item_sum = l1[index] + l2[index] + yichu
//     if(item_sum > 9){
//       yichu = 1
//       return 0
//     }
//     yichu = 0
//     return item_sum
//   })
//   console.log(sum)
// };
var addTwoNumbers = function(l1, l2) {
  let resNode = new ListNode(0), flag = 0, res = resNode;
  while(l1 || l2 || flag){
    const v1 = l1 && l1.val ? l1.val : 0
    const v2 = l2 && l2.val ? l2.val : 0
    let sum = v1 + v2 + flag
    flag = sum > 9 ? 1 : 0
    resNode.next = new ListNode(sum % 10)
    // 修改l1 l2 resNode指向，为了处理下一步的数据
    if(l1){
      l1 = l1.next
    }
    if(l2){
      l2 = l2.next
    }
    resNode = resNode.next
  }
  // 跳过初始化listNode(0)，直接使用
  return res.next
}
// @lc code=end

