/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// var lengthOfLongestSubstring = function(s) {
//   // 思路：先字符串去重，根据去重后的值，按照最长长度依次减1 然后哎原字符串中查找，如果找到了，就停止并返回
//   if(!s) return 0
//   const s_data = s.split('')
//   const str_data = Array.from(new Set(s_data)) // 字符串去重
//   //  获取长度为len的连续的字符串
//   function getStrByLen(len){
//     let res = []
//     for (let i = 0; i < s_data.length; i++) {
//       if(len + i > s_data.length){ // 大小超过s的长度，就不可能有长度合适的子串
//         continue
//       }
//       // 去重筛查
//       const s_item = s_data.slice(i, i+len)
//       const _s_item = Array.from(new Set(s_item))
//       if(s_item.join('') != _s_item.join('')){
//         continue
//       }
//       res.push(s_item.join(''))
//     }
//     return res
//   }
//   let len = str_data.length
//   let state = false
//   while (len > 0) {
//     const child_strs = getStrByLen(len)
//     for (let i = 0; i < child_strs.length; i++) {
//       if(s.indexOf(child_strs[i]) > -1){ // 查到包含关系 就是最长子串结果值
//         state = true
//       }
//     }
//     if(state){
//       return len
//     }
//     len--
//   }
// };
/**
 * 经过思考，我的这个方法实际还是暴力求解，只是通过条件筛掉一定不可能的结果再进行判断，相比完全的遍历解法，提升不高
 * 上面这个事件复杂度还是 O(n²)
 * 提交发现 性能排行大概在倒数5%
 */
// var lengthOfLongestSubstring = function(s) {
//   // 思路：依次遍历字符串，当前位如果包含在前面的子串中，从重复位的index开始重新计数子串，遍历结束后，获取最大值
//   if(!s) return 0
//   const s_data = s.split('')
//   const child_lens = []
//   let len = 0
//   for (let i = 0; i < s_data.length; i++) {
//     if(!child_lens[len]){
//       child_lens[len] = [s_data[i]]
//     }else{
//       const repeatIndex = child_lens[len].findIndex(e=>e==s_data[i])
//       if(repeatIndex > -1){
//         len++
//         child_lens[len] = [s_data[repeatIndex + 1]]
//         i = repeatIndex + 1
//     }else{
//         child_lens[len].push(s_data[i])
//       }
//     }
//   }
//   return Math.max(...child_lens.map(e=>e.length))
// };
/**
 * 上面这个函数在node、chrome中都可以执行 但是使用leetcode 报错
 *   terminate called after throwing an instance of 'std::bad_alloc'
 *     what():  std::bad_alloc
 * 网上搜了下说是内存溢出，测试用例( lengthOfLongestSubstring("abcabcbb") )
 * 先手动执行下，看是哪一步陷入死循环导致的bug
 * 发现是由于最后两位一致，len的长度超出时没有停止计算
 * 还有一个问题是在提交中发现的：假设后面重复位在前面就重复多次时，查找到的index是错误的
 */
// var lengthOfLongestSubstring = function(s) {
//   if(!s) return 0
//   const s_data = s.split('')
//   const child_lens = [] // 改为存放index
//   let len = 0
//   let max = 0
//   for (let i = 0; i < s_data.length; i++) {
//     if(len == s_data.length){ // fix：len超出时 停止循环
//       break
//     }
//     if(!child_lens[len]){
//       child_lens[len] = [i]
//       max = Math.max(max, 1)
//     }else{
//       const repeatIndex = child_lens[len].find(e=>s_data[e]==s_data[i]) // fix 查找到错误的index 
//       if(repeatIndex != undefined){
//         len++
//         child_lens[len] = [repeatIndex + 1]
//         i = repeatIndex + 1
//       }else{
//         child_lens[len].push(i)
//         max = Math.max(child_lens[len].length, max) // 优化 减少一边循环
//       }
//     }
//   }
//   return max
// };
// 提交发现 性能排行 还是 大概在倒数5% ···
// 相比之下性能还差了不少 ···
// 现在的标记点是start，如果加上end 使用滑动窗口的思路来处理，并且使用set来做重复判断，可以减少内存占用
// var lengthOfLongestSubstring = function(s) {
//   // 滑动窗口
//   if(!s) return 0
//   const s_data = s.split('')
//   if(s_data.length <= 1) return 1

//   let left = 0, right = 0;
//   const s_window = new Set()
//   let max = 0
//   while(right < s_data.length){
//     if(!s_window.has(s_data[right])){
//       max = Math.max(max, right - left + 1)
//       s_window.add(s_data[right])
//       right++
//     }else{
//       s_window.delete(s_data[left])
//       left++ 
//     }
//   }
//   return max
// };
// 性能超过60% 内存也小了一半
// 但是这个left是一位一位的进，可以把上面的思路加进去：left移动到 重复位+1
// 因为需要使用index 所以set就不够用了，现在使用map来存
var lengthOfLongestSubstring = function(s) {
  // 滑动窗口
  if(!s) return 0
  const s_data = s.split('')
  if(s_data.length <= 1) return 1

  let left = 0, right = 0;
  const s_window = new Map()
  let max = 0
  while(right < s_data.length){
    // 获得重复位index
    const item = s_data[right]
    const repeatIndex = s_window.has(item) ? s_window.get(item) : -1
    if(repeatIndex > -1 && repeatIndex >= left){
      // 有重复 且 重复在left右侧
      left = repeatIndex
    }
    s_window.set(item, right + 1)
    max = Math.max(max, right - left + 1)
    right++
  }
  return max
};
// 性能现在时73%+了 
console.log(lengthOfLongestSubstring("abcabcbb"));
// @lc code=end
