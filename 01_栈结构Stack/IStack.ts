interface IStack<T> {
  push(element: T);
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}

export default IStack
