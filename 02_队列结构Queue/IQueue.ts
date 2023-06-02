import IList from "../types/IList";

interface IQueue<T> extends IList<T> {
  // 将一个元素放入到队列中
  enqueue(element: T): void;

  // 将队列头部的元素取出
  dequeue(): T | undefined;
}

export default IQueue;
