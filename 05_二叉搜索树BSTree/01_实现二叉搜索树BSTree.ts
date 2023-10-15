import { btPrint } from "hy-algokit";

// 创建TreeNode类
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  // 当前节点的父节点
  parent: TreeNode<T> | null = null;

  // 判断当前节点是不是其父节点的左子节点
  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this);
  }

  // 判断当前节点是不是其父节点的右子节点
  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this);
  }

  constructor(value: T) {
    this.value = value;
  }
}

// 创建BSTree类
class BSTree<T> {
  // 根节点
  private root: TreeNode<T> | null = null;

  // 一个递归函数，供插入操作使用
  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    // 判断应该把newNode节点插入到node节点的左边还是右边
    if (newNode.value < node.value) {
      // 判断node节点的左子节点是否为空
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // 判断node节点的右子节点是否为空
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // 一个递归函数，供先序遍历使用
  private preOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value);
      this.preOrderTraverseNode(node.left);
      this.preOrderTraverseNode(node.right);
    }
  }

  // 一个递归函数，供中序遍历使用
  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left);
      console.log(node.value);
      this.inOrderTraverseNode(node.right);
    }
  }

  // 一个递归函数，供后序遍历使用
  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left);
      this.postOrderTraverseNode(node.right);
      console.log(node.value);
    }
  }

  // 供搜索特定值的操作和删除操作使用
  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent: TreeNode<T> | null = null;
    while (current) {
      // 如果能找到匹配的current，则将其直接返回
      if (current.value === value) {
        return current;
      }

      // 如果不能找到匹配的current，则继续向下找
      parent = current;
      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }

      // 如果current有值，那么current保存自己的父节点
      if (current) current.parent = parent;
    }
    return null;
  }

  // 寻找后继节点，供删除操作使用(删除的节点有两个子节点)
  private getSuccessor(delNode: TreeNode<T>): TreeNode<T> {

    // 获取删除的节点的右子节点
    let current = delNode.right;
    let successor: TreeNode<T> | null = null;
    while (current) {
      successor = current;
      current = current.left;
      if (current) {
        current.parent = successor
      }
    }

    // 如果后继节点不等于删除的节点的右子节点
    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right
      successor!.right = delNode.right
    }

    // 将删除的节点的左子节点，赋值给后继节点的left
    successor!.left = delNode.left

    return successor!;
  }

  // 暴露给外界，供打印使用
  print() {
    btPrint(this.root);
  }

  // 插入操作
  insert(value: T) {
    // 根据传入的value创建TreeNode节点
    const newNode = new TreeNode(value);

    // 判断根节点是否存在
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  // 先序遍历
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }

  // 中序遍历
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }

  // 后序遍历
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }

  // 层序遍历
  levelOrderTraverse() {
    // 如果没有根节点，那么不需要层序遍历
    if (!this.root) return;

    // 创建队列结构
    const queue: TreeNode<T>[] = [];

    // 让根节点入队
    queue.push(this.root);

    // 遍历队列中的所有节点
    while (queue.length !== 0) {
      // 访问节点的过程
      const current = queue.shift()!;
      console.log(current);

      // 如果current左子节点不为空，则将其放入到队列中
      if (current.left) {
        queue.push(current.left);
      }

      // 如果current右子节点不为空，则将其放入到队列中
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  // 获取最大值的操作
  getMaxValue(): T | undefined {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current?.value;
  }

  // 获取最小值的操作
  getMinValue(): T | undefined {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.value;
  }

  // 搜索特定值的操作
  search(value: T): boolean {
    return !!this.searchNode(value);
  }

  // 删除操作
  remove(value: T): boolean {
    // 搜索是否有这个value
    const current = this.searchNode(value);
    if (!current) return false;

    // current为叶子节点
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null;
      } else if (current.isLeft) {
        current.parent!.left = null;
      } else {
        current.parent!.right = null;
      }
    }

    // current只有一个左子节点
    else if (current.right === null) {
      if (current === this.root) {
        this.root = current.left;
      } else if (current.isLeft) {
        current.parent!.left = current.left;
      } else {
        current.parent!.right = current.left;
      }
    }

    // current只有一个右子节点
    else if (current.left === null) {
      if (current === this.root) {
        this.root = current.right;
      } else if (current.isLeft) {
        current.parent!.left = current.right;
      } else {
        current.parent!.right = current.right;
      }
    }

    // current有两个子节点
    else {
      const successor = this.getSuccessor(current);
      if (current === this.root) {
        this.root = successor;
      } else if (current.isLeft) {
        current.parent!.left = successor;
      } else {
        current.parent!.right = successor;
      }
    }
    return true;
  }
}

const bst = new BSTree<number>();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);
bst.print();
bst.remove(11);
bst.print();
bst.remove(15);
bst.print();