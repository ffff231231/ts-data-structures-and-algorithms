import IList from "../types/IList";

interface IStack<T> extends IList<T> {
  // 将一个元素放入到栈中
  push(element: T): void;

  // 将栈顶元素取出
  pop(): T | undefined;
}

export default IStack;
