import IQueue from "./IQueue";

class ArrayQueue<T> implements IQueue<T> {
  private data: T[] = [];

   // 将一个元素放入到队列中
  enqueue(element: T): void {
    this.data.push(element);
  }

  // 将队列头部的元素取出
  dequeue(): T | undefined {
    return this.data.shift();
  }

   // 看一眼队列头部的元素,但是不进行任何的操作
  peek(): T | undefined {
    return this.data[0];
  }

  // 判断队列是否为空
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 返回队列中元素的个数
  size(): number {
    return this.data.length;
  }
}

export default ArrayQueue;
