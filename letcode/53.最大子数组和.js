/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let sum = 0, max = nums[0];
  nums.forEach(item => {
    if(sum < 0){
      sum = item
    }else{
      sum += item
    }
    max = Math.max(sum, max)
  })
  return max
};
// console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
// @lc code=end

