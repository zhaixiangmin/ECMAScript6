// let 命令 只在所在的代码块内有效

// {
//   let a = 10;
//   var b = 1;
// }
//
// console.log('b', b); // 1
// console.log('a', a); // a is not defined


// for (var j = 0; j < 10; j++) {
//
// }
//
// console.log('j', j);
//
// for (let i = 0; i < 10; i++) {
//
// }
//
// console.log('i', i);

// var a = [];
// for (var i = 0; i < 10; i++) {
//   a[i] = function () {
//     console.log(i);
//   }
// }
// a[6](); // 10
//
// let b = [];
// for (let j = 0; j < 10; j++) {
//   b[j] = function () {
//     console.log(j);
//   }
// }
// b[6](); // 6

// // 设置循环变量的那部分是一个父作用域
// for (let i = 0; i < 3; i++) {
//   // 循环体内部是一个单独的子作用域
//   let i = 'abc';
//   console.log(i);
// }
// // abc
// // abc
// // abc

// // var 变量可以在声明之前使用，值为undefined
// console.log(foo); // 输出undefined
// var foo = 2;
//
// // let 声明的变量一定要在声明后使用，否则报错
// console.log(bar); // 报错ReferenceError
// let bar = 2;

// // 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
// var tmp = 123;
// if(true) {
//   tmp = 'abc'; // ReferenceError
//   let tmp;
// }

// 在代码块内，使用let命令声明变量之前，该变量都是不可用的。
// 称为“暂时性死区”（temporal dead zone，简称 TDZ）
// if(true) {
//   // TDZ 开始
//   // tmp = 'abc';
//   // console.log(tmp); // ReferenceError
//
//   let tmp; // TDZ 结束
//   console.log(tmp); // undefined
//
//   tmp = 123;
//   console.log(tmp); // 123
// }

// typeof x; // ReferenceError
// let x;

// typeof undeclared_variable // 空

// function bar(x = y, y = 2) {
//   return [x, y];
// }
//
// bar(); // ReferenceError: y is not defined


// function bar(x = 2, y = x) {
//   return [x, y];
// }
//
// console.log(bar()); // [2, 3]

// var x = x;
//
// let y = y; // ReferenceError: y is not defined

// 不允许重复声明
// function func() {
//   let a = 10;
//   var a = 1;
// }
// func(); // Uncaught SyntaxError: Identifier 'a' has already been declared
//
// function func() {
//   let a = 10;
//   let a = 1;
// }
// func(); // Uncaught SyntaxError: Identifier 'a' has already been declared

// function func(arg) {
//   let arg;
// }
// func(); // Uncaught SyntaxError: Identifier 'arg' has already been declared
//
// function func(arg) {
//   {
//     let arg;
//   }
// }
// func(); // 不报错

// 为什么需要块级作用域？
// var tmp = new Date();
// function f() {
//   console.log(tmp);
//   if (false) {
//     var tmp = 'hello world'; // var 变量提升，导致内层的tmp变量覆盖了外层的tmp变量
// //   }
// }
// f(); // undefined
//
// let tmp2 = new Date();
// function f() {
//   console.log(tmp2);
//   if (false) {
//     let tmp2 = 'hello world';
//   }
// }
// f(); // Fri Apr 05 2019 22:05:15 GMT+0800 (中国标准时间)

// // i循环结束后，并没有消失，泄露成了全局变量
// var s = 'hello';
// for (var i = 0; i< s.length; i++) {
//   console.log(i);
// }
//
// console.log('i', i); // 5

// // ES6 的块级作用域
// function f1() {
//   var n = 5;
//   if (true) {
//     var n = 10;
//   }
//   console.log(n); // 10
// }
// f1();

// function f2() {
//   let n = 5;
//   if (true) {
//     let n = 10;
//   }
//   console.log(n); // 5
// }
// f2();

// // 外层作用域无法读取内层作用域的变量
// {{{{
//   { let insane = 'Hello World' }
//   console.log(insane); // Uncaught ReferenceError: insane is not defined
// }}}}

// 内层作用域可以定义外层作用域的同名变量
// {{{{
//   let insane = 'Hello World';
//   { let insane = 'Hello World'; }
// }}}}

// var tmp = 10;
// function func() {
//   var tmp = 20;
// }
// console.log(tmp); // 10

// // 闭包
// var tmp = 10;
// // 立即执行函数表达式
// (function func() {
//   console.log(tmp); // 10
// }());

// function f() {
//   console.log('I am outside!');
// }
//
// (function () {
// // ES6 引入了块级作用域，明确允许在块级作用域之中声明函数
//   if (false) {
//     // 重复声明一次函数f
//     function f() {
//       console.log('I am inside!');
//     }
//   }
//
//   f(); // Uncaught TypeError: f is not a function
// }());
// // 上面的代码在符合 ES6 的浏览器中，都会报错，因为实际运行的是下面的代码。
// (function () {
// // ES6 引入了块级作用域，明确允许在块级作用域之中声明函数
//   var f = undefined;
//   if (false) {
//     // 重复声明一次函数f
//     function f() {
//       console.log('I am inside!');
//     }
//   }
//
//   f(); // Uncaught TypeError: f is not a function
// }());

// // 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数
// // 如果确实需要，也应该写成函数表达式，而不是函数声明语句
// // 函数声明语句
// // {
// //   let a = 'secret';
// //   function f() {
// //     return a;
// //   }
// //   // console.log(f()); // secret
// // }
// // console.log(f());
//
// // 函数表达式
// {
//   let a = 'secret';
//   let f = function () {
//     return a;
//   };
//   // console.log(f()); // secret
// }
// console.log(f()); // Uncaught ReferenceError: f is not defined

// // ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立
// // 如果没有使用大括号，就会报错
// // // 不报错
// // 'use strict'
// // if (true) {
// //   function f() {}
// // }
//
// // 报错
// 'use strict'
// if (true)
//   function f() {}
