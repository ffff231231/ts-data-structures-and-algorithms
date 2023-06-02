import ArrayQueue from "./01_实现队列结构Queue(数组)";

function hotPotato(names: string[], num: number): number {
  // 创建队列
  const queue = new ArrayQueue<string>();

  // 将所有的name都加入队列
  for (const name of names) {
    queue.enqueue(name);
  }

  // 淘汰规则
  while (queue.size() > 1) {
    for (let i = 1; i < num; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    queue.dequeue();
  }

  // 取出剩余的最后一个名字
  const leftName = queue.dequeue()!;
  return names.indexOf(leftName);
}
