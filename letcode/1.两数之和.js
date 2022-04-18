/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function(nums, target) {
//   // 时间复杂度 O(n²)，需要优化下
//   let res = []
//   nums.forEach((num, i) => {
//     const _index = nums.findIndex((_e, _i) => _i != i && _e + num == target)
//     if(_index > -1){
//       res.push([i, _index])
//     }
//   })
//   因为使用的forEach 没法中断， 用 for 或者手动 throw error 停止循环
//   return res[0]
// };
var twoSum = function(nums, target) {
  // 利用了map对象，时间复杂度 O(n)
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const minus = target - nums[i];
    if(map.has(minus)){
      return [map.get(minus), i]
    }
    map.set(nums[i], i)
  }
  return []
};
// @lc code=end

