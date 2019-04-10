// // 1. 函数参数的默认值
// // 基本用法
// function log(x, y) {
//   y  = y || 'World';
//   console.log(x, y);
// }
// log('Hello'); // Hello World
// log('Hello', 'China'); // Hello China
// log('Hello', ''); // Hello World
//
// if (typeof y === 'undefined') {
//   y = 'World';
// }
//
// // ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面
// function log2(x, y = 'World') {
//   console.log(x, y);
// }
//
// log2('Hello'); // Hello World
// log2('Hello', 'China'); // Hello China
// log2('Hello', ''); // Hello
//
// function Point(x = 0, y = 0) {
//   this.x = x;
//   this.y = y;
// }
//
// const p = new Point();
// console.log('p', p); // Point {x: 0, y: 0}
//
// // 参数默认值是惰性求值
// // 每次都重新计算默认值表达式的值
// let x = 99;
// function foo(p2 = x + 1) {
//   console.log('p2', p2);
// }
// foo(); // 100
//
// x = 100;
// foo(); // 101
//
// // 只使用了对象的解构赋值默认值
// function foo2({ x, y = 5 }) {
//   console.log(x, y);
// }
// foo2({}); // undefined 5
// foo2({ x: 1 }); // 1 5
// foo2({ x: 1, y: 2 }); // 1 2
// // foo2(); // Uncaught TypeError: Cannot destructure property `x` of 'undefined' or 'null'
//
// // 参数默认值可以与解构赋值的默认值，结合起来使用
// function foo3({ x, y = 5 } = {} ) {
//   console.log(x, y);
// }
// foo3(); // undefined 5
//
// function m1({ x = 0, y = 0 } = {}) {
//   console.log('m1', [x, y]);
//   return [x, y];
// }
// function m2({ x, y } = { x: 0, y: 0 }) {
//   console.log('m2', [x, y]);
//   return [x, y];
// }
// m1(); // [0, 0]
// m2(); // [0, 0]
//
// m1({ x: 3, y: 8 }); // [3, 8]
// m2({ x: 3, y: 8 }); // [3, 8]
//
// m1({ x: 3 }); // [3, 0]
// m2({ x: 3 }); // [3, undefined]
//
// m1({}); // [0, 0]
// m2({}); // [undefined, undefined]
//
// m1({ z: 3}); // [0, 0]
// m2({ z: 3}); // [undefined, undefined]
//
// function foo4(x = 5, y = 6) {
//   console.log(x, y);
// }
// foo4(undefined, null); // 5 null
//
// // 函数的 length 属性
// console.log((function (a) {}).length); // 1
// console.log((function (a = 5) {}).length); // 0
// console.log((function (a, b, c = 5) {}).length); // 2
// console.log((function (a, b, c = 5) {}).length); // 2

// 作用域
// var x = 1;
//
// function f(x, y = x) {
//   console.log(y);
// }
// f(2); // 2
// f(); // undefined

function f1(y = x) {
  // let x = 2;
  console.log(y);
}
f1(); // Uncaught ReferenceError: x is not defined