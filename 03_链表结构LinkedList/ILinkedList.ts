import IList from "../types/IList";

interface ILinkedList<T> extends IList<T> {
  append(value: T): void;
  insert(index: number, value: T): any;
  removeAt(index: number): T;
  remove(value: T): T;
  get(index: number): T;
  update(index: number, value: T): void;
  indexOf(value: T): number;
  traverse(): void;
}

export default ILinkedList;
