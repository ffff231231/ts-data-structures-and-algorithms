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

  let currentNode: ListNode = head;
  let newHead: ListNode | null = null;
  while (currentNode !== null) {
    currentNode = currentNode.next!;
    head!.next = newHead;
    newHead = head;
    head = currentNode;
  }

  return newHead;
}

export {};
