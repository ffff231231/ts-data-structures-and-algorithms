import IStack from "./IStack";

class ArrayStack<T> implements IStack<T> {
  private data: T[] = [];

  // 将一个元素放入到栈中
  push(element: T): number {
    return this.data.push(element);
  }

  // 将栈顶元素取出
  pop(): T | undefined {
    return this.data.pop();
  }

   // 看一眼栈顶元素,但是不进行任何的操作
  peek(): T | undefined {
    return this.data[this.data.length - 1];
  }

  // 判断栈是否为空
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 返回栈中元素的个数
  size(): number {
    return this.data.length;
  }
}

export default ArrayStack;
