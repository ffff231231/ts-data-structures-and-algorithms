import ILinkedList from "./ILinkedList";

// 创建Node类
class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// 创建LinkedList类
class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private length: number = 0;

  // 检查index是否越界
  private borderCheck(index: number, isInsert: boolean = false) {
    if (isInsert) {
      // insert方法的边界判断
      if (index < 0 || index > this.length) {
        throw new Error(`传入的index: ${index} 越界了,请检查！`);
      }
    } else {
      // 其他方法的边界判断
      if (index < 0 || index >= this.length) {
        throw new Error(`传入的index: ${index} 越界了,请检查！`);
      }
    }
  }

  // 根据index,获取对应节点
  private getNode(index: number): Node<T> {
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode!.next;
    }
    return currentNode!;
  }

  // 向链表尾部添加节点
  append(value: T) {
    // 根据value创建一个新节点
    const newNode = new Node<T>(value);

    // 判断this.head是否为null
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  // 根据index,向链表中插入节点
  insert(index: number, value: T) {
    // 边界判断
    this.borderCheck(index, true);

    // 根据value创建一个新节点
    const newValue = new Node<T>(value);

    // 判断是否插入头部
    if (index === 0) {
      newValue.next = this.head;
      this.head = newValue;
    } else {
      let previousNode = this.getNode(index - 1);
      newValue.next = previousNode.next;
      previousNode.next = newValue;
    }

    this.length++;
  }

  // 根据index,从链表中删除对应节点
  removeAt(index: number): T {
    // 边界判断
    this.borderCheck(index);

    // 判断是否删除头部
    let tem = this.head;
    if (index === 0) {
      this.head = this.head!.next;
    } else {
      let previousNode = this.getNode(index - 1);
      tem = previousNode.next;
      previousNode.next = previousNode.next!.next;
    }

    this.length--;
    return tem!.value;
  }

  // 根据value,从链表中删除对应节点
  remove(value: T): T {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }

  // 根据index,获取对应节点的value
  get(index: number): T {
    // 边界判断
    this.borderCheck(index);

    const currentNode = this.getNode(index);
    return currentNode.value;
  }

  // 根据index,更新对应节点的value
  update(index: number, value: T) {
    // 边界判断
    this.borderCheck(index);

    const currentNode = this.getNode(index);
    currentNode.value = value;
  }

  // 根据value，获取对应节点的index
  indexOf(value: T): number {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (currentNode.value === value) {
        return index;
      } else {
        currentNode = currentNode.next;
        index++;
      }
    }

    return -1;
  }

  // 遍历链表的方法
  traverse() {
    const values: T[] = [];

    let currentNode = this.head;
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(values.join("->"));
  }

  // 获取链表中第一个节点的value
  peek(): T | undefined {
    return this.head?.value;
  }

  // 判断链表是否为空
  isEmpty(): boolean {
    return this.length === 0;
  }

  // 获取链表的长度
  size() {
    return this.length;
  }
}

export default LinkedList;
