/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  var index = 0
  var item = nums[index]
  // var arr = [item]
  for (let i = 0; i < nums.length; i++) {
    if(nums[i] !== item){
      index++
      item = nums[i]
      // arr.push(item)
      nums[index] = item
    }
  }
  // console.log(nums);
  return index + 1
};
// console.log(removeDuplicates([1,1,2]));
// @lc code=end

