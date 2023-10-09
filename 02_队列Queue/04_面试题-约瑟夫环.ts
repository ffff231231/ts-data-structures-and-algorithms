import ArrayQueue from "./01_实现队列Queue(基于数组)";

function lastRemaining(n: number, m: number): number {
  // 创建队列
  const queue = new ArrayQueue<number>();

  // 将所有的数字都加入队列
  for (let i = 0; i < n; i++) {
    queue.enqueue(i);
  }

  // 删除规则
  while (queue.size() > 1) {
    for (let i = 1; i < m; i++) {
      queue.enqueue(queue.dequeue()!)
    }
    queue.dequeue()
  }

  return queue.dequeue()!
}
