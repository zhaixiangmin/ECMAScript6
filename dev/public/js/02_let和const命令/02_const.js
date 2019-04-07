// // const声明一个只读的常量。一旦声明，常量的值就不能改变
// const PI = 3.1415;
// console.log('PI', PI);
//
// PI = 3; // Uncaught TypeError: Assignment to constant variable.

// // const声明的变量不得改变值，这意味着
// // const一旦声明变量，就必须立即初始化，不能留到以后赋值
// const foo; // Uncaught SyntaxError: Missing initializer in const declaration

// // const的作用域与let命令相同：只在声明所在的块级作用域内有效
// if (true) {
//   const MAX = 5;
// }
// console.log('MAX', MAX); // Uncaught ReferenceError: MAX is not defined

// // const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用
// if (true) {
//   console.log(MAX); // Uncaught ReferenceError: MAX is not defined
//   const MAX = 5;
// }

// // const声明的常量，也与let一样不可重复声明
// // var message = 'Hello';
// let age = 25;
//
// // const message = 'Goodbye!'; // Uncaught SyntaxError: Identifier 'message' has already been declared
// const age = 30; // Uncaught SyntaxError: Identifier 'age' has already been declared

// const foo = {};
//
// // 为 foo 添加一个属性，可以成功
// foo.prop = 123;
// console.log('foo', foo);
//
// foo = {}; // Uncaught TypeError: Assignment to constant variable

// 常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错
// const a = [];
// a.push('Hello');
// a.length = 0;
// a = ['Dave']; // Uncaught TypeError: Assignment to constant variable

// // 如果真的想将对象冻结，应该使用Object.freeze方法
// // "use strict";
// const foo = Object.freeze({});
// // 常规模式时，下面一行不起作用；
// // 严格模式时，该行会报错
// foo.prop = 123;
// console.log('foo', foo); // {}

// 将对象彻底冻结的函数
// var constantize = (obj) => {
//   Object.freeze(obj);
//   Object.keys(obj).forEach((key, i) => {
//     if (typeof obj[key] === 'object') {
//       constantize(obj[key]);
//     }
//   })
// };
//
// const obj = {
//   a: 1,
//   teacher: {
//     name: 'Lucy',
//     age: 34
//   },
//   b: 2
// };
//
// constantize(obj);
//
// obj.a = 123;
// obj.teacher.age = 123;
// console.log('obj', obj); // {a: 1, teacher: {name: 'Lucy', age: 34},b: 2}
