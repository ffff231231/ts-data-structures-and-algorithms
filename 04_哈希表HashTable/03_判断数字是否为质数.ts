/**
 * 根据传入的数字，判断该数字是否为一个质数
 * @param num 传入的数字
 * @returns 是否为一个质数
 */
function isPrime(num: number): boolean {
  // 求出传入的数字的平方根
  const sqrt = Math.sqrt(num);

  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}
