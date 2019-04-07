// export default function () {
//   console.log('foo');
// }

// foo函数的函数名foo，在模块外部是无效的
// 加载的时候，视同匿名函数加载
// function foo() {
//   console.log('foo');
// }
// export default foo;


// export default就是输出一个叫做default的变量或方法
// 然后系统允许你为它取任意名字。所以，下面的写法是有效的
// function add(x, y) {
//  return x + y;
// }
// export { add as default };
// // 等同于
// // export default add;

// export var a = 1; // 正确

// 正确
// var a = 1;
// export default a;

// export default var a = 1; // 错误 ？？？
// 上面代码中，export default a的含义是将变量a的值赋给变量default。所以，最后一种写法会报错。


// 因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后
// export default 42; // 正确

// export 42; // 错误

// 同时输入默认方法和其他接口
// export default function (obj) {
//   // ...
// }
//
// export function each(obj, iterator, context) {
//   // ...
// }
//
// export { each as forEach };