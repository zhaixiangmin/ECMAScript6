var counter = 3;
function incCounter() {
  counter++;
}

// module.exports = {
//   // CommonJS 模块输出的是值的拷贝，
//   // 也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
//   // 因为mod.counter是一个原始类型的值，会被缓存
//   counter: counter,
//   incCounter: incCounter,
// };


module.exports = {
  // 输出的counter属性实际上是一个取值器函数
  // 可以正确读取内部变量counter的变动了。
  get counter() {
    return counter
  },
  incCounter: incCounter,
};