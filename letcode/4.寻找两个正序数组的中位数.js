/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// var findMedianSortedArrays = function(nums1, nums2) {
//   // 暴力解法
//   const nums = [].concat(nums1, nums2).sort((a, b)=>{return a - b})
//   if(nums.length % 2 == 1){
//     return nums[(nums.length - 1) / 2]
//   }else{
//     return (nums[nums.length / 2] + nums[nums.length / 2 - 1]) / 2
//   }
// };
// 8.7%  性能太差
// 学习下使用二分查找
var findMedianSortedArrays = function(nums1, nums2) {
  // 规定 nums1 相对较短  偶数位退1
  const m = nums1.length, n = nums2.length;
  if(m > n){
    return findMedianSortedArrays(nums2, nums1)
  }
  // 分割线满足：交叉小于等于
  // 假设分割线是 i，j； nums1[i-1]<=nums2[j] && nums1[i]>=nums2[j-1]
  let left = 0 , right = m;
  
  while(left < right){
    let i = (left + right) >> 1 // nums1的二分位置
    let j = ((m + n + 1) >> 1) - i // nums2的二分位置
    
    //L1:nums1二分之后左边的位置，L2，nums1二分之后右边的位置
    //R1:nums2二分之后左边的位置，R2，nums2二分之后右边的位置
    // Infinity是处理边界
    let L1 = i === 0 ? -Infinity : nums1[i - 1],
        L2 = j === 0 ? -Infinity : nums2[j - 1];
    let R1 = i === m ? Infinity : nums1[i],
        R2 = j === n ? Infinity : nums2[j];
    console.log(L1, L2, R1, R2, i, j);
    if(L1 > R2){ // 左上大于右下，不符合二分查找，右边缩小范围
      right = i - 1
    } else if(R1 < L2){ // 右上大于左下，不符合二分查找，左边缩小范围
      left = i + 1
    } else { // 符合条件
      return (m + n) / 2 ? (Math.max(L1, L2) + Math.min(R1, R2)) / 2 : Math.max(L1, L2)
    }
  }
};
console.log(findMedianSortedArrays([1,2], [3, 4]));
// @lc code=end

