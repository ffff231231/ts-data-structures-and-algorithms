class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // 边界判断
  if (head === null || head.next === null) return head;

  // 用数组模拟栈结构
  const stack: ListNode[] = [];

  // 将旧链表中的节点依次入栈
  while (head) {
    stack.push(head);
    head = head.next;
  }

  // 从栈中依次取出节点，放到一个新链表中
  let newHead: ListNode = stack.pop()!;
  head = newHead;
  while (stack.length !== 0) {
    let currentNode = stack.pop()!;
    head.next = currentNode;
    head = currentNode;
  }

  // 注意，新链表最后一个节点的next一定要指向null！
  head.next = null

  // 将新链表的头节点返回
  return newHead;
}

export {};
