/**
 * 哈希函数，将key映射成index
 * @param key 要转换的key
 * @param max 数组的长度(最大的数值)
 * @returns 索引值
 */
function hashFunc(key: string, max: number): number {
  let hashCode = 0;
  const length = key.length;
  for (let i = 0; i < length; i++) {
    // 霍纳法则计算hashCode
    hashCode = 31 * hashCode + key.charCodeAt(i);
  }

  // 求出索引值 
  const index = hashCode % max;
  return index;
}
