import ArrayStack from "./01_实现栈Stack(基于数组)";

function decimalToBinary(decimal: number): string {
  // 创建一个栈,用于存放余数
  const stack = new ArrayStack<number>()

  // 使用循环,将余数依次放入栈中
  // while循环使用条件：不知道循环次数
  // for循环使用条件：知道循环次数
  while(decimal > 0) {
    const remainder = decimal % 2
    stack.push(remainder)
    decimal = Math.floor(decimal / 2)
  }

  // 将余数在栈中依次取出
  let binary = ''
  while(!stack.isEmpty()) {
    binary += stack.pop()
  }

  return binary
}