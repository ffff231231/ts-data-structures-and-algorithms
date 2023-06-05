import IQueue from "./IQueue";

class ArrayQueue<T> implements IQueue<T> {
  enqueue(element: T): void {
    throw new Error("Method not implemented.");
  }
  dequeue(): T | undefined {
    throw new Error("Method not implemented.");
  }
  peek(): T | undefined {
    throw new Error("Method not implemented.");
  }
  isEmpty(): boolean {
    throw new Error("Method not implemented.");
  }
  size(): number {
    throw new Error("Method not implemented.");
  }
  
}

export default ArrayQueue;
