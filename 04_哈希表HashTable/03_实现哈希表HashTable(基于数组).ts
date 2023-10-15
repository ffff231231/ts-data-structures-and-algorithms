class HashTable<T = any> {
  // 创建一个数组，用来存放链地址法中的桶(桶在这里用数组表示)
  private storage: [string, T][][] = [];

  // 定义数组的长度
  private length: number = 7;

  // 纪录已经存放元素的个数
  private count: number = 0;

  // 定义哈希函数
  private hashFunc(key: string, max: number): number {
    let hashCode = 0;
    const length = key.length;
    for (let i = 0; i < length; i++) {
      // 霍纳法则计算hashCode
      hashCode = 31 * hashCode + key.charCodeAt(i);
    }

    // 求出索引值
    const index = hashCode % max;
    return index;
  }

  // 判断数字是否为质数
  private isPrime(num: number): boolean {
    // 求出传入的数字的平方根
    const sqrt = Math.sqrt(num);

    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) {
        return false;
      }
    }

    return true;
  }

  // 对哈希表进行扩容/缩容操作
  private resize(newLength: number) {
    // 设置新长度
    let newPrime = newLength;
    while (!this.isPrime(newPrime)) {
      newPrime++;
    }
    if (newPrime < 7) {
      newPrime = 7;
    }
    this.length = newPrime;

    // 对数据进行初始化操作
    const oldStorage = this.storage;
    this.storage = [];
    this.count = 0;

    // 获取原来的数据，放入新的数组中
    oldStorage.forEach((bucket) => {
      if (!bucket) return;

      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }

  // 插入/更新操作
  put(key: string, value: T) {
    // 根据key获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);

    // 取出索引值对应位置的桶
    let bucket = this.storage[index];

    // 判断桶是否有值，如果没有值，给桶赋值一个空数组
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }

    // 确定桶已经有值了，但是不确定桶中是否已经存在key
    let isUpdate = false;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      if (tupleKey === key) {
        // 更新操作
        tuple[1] = value;
        isUpdate = true;
      }
    }

    // 如果上面的代码没有进行更新操作，那么在该位置进行插入操作
    if (!isUpdate) {
      bucket.push([key, value]);
      this.count++;

      // 如果loadFactor大于0.75，则直接扩容
      const loadFactor = this.count / this.length;
      if (loadFactor > 0.75) {
        this.resize(this.length * 2);
      }
    }
  }

  // 获取值操作
  get(key: string): T | undefined {
    // 根据key获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);

    // 取出索引值对应位置的桶
    let bucket = this.storage[index];
    if (!bucket) return undefined;

    // 对桶进行遍历
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (tupleKey === key) {
        return tupleValue;
      }
    }

    return undefined;
  }

  // 删除操作
  delete(key: string): T | undefined {
    // 根据key获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);

    // 取出索引值对应位置的桶
    let bucket = this.storage[index];
    if (!bucket) return undefined;

    // 对桶进行遍历
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (tupleKey === key) {
        bucket.splice(i, 1);
        this.count--;

        // 如果loadFactor小于0.25，则直接缩容
        const loadFactor = this.count / this.length;
        if (loadFactor < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2));
        }

        return tupleValue;
      }
    }

    return undefined;
  }
}
