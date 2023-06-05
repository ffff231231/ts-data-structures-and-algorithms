class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function reverseList(head: ListNode | null): ListNode | null {
  // 终止条件成立时，手动解决最后1层子问题。（做递归最后1层应做的事情）
  if (head === null || head.next === null) return head
  
  // 终止条件不成立时，首先假设递归函数已经解决了第1层子问题
  const newHead = reverseList(head.next)
  // 然后手动完善父问题和第1层子问题之间的逻辑关系。（做递归第1层应做的事情）
  head.next.next = head
  head.next = null
  return newHead
}
export {};
