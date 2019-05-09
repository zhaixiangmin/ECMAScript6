// 1. export命令对外部输出了三个变量
// export var firstName = 'Michael';
// export var lastName = 'Jackson';
// export var year = 1958;

// 2. 它与前一种写法（直接放置在var语句前）是等价的，
// 但是应该优先考虑使用这种写法
// var firstName = 'Michael';
// var lastName = 'Jackson';
// var year = 1958;
//
// export { firstName, lastName, year };

// 3. export命令除了输出变量，还可以输出函数或类（class）
// export function multiply(x, y) {
//   return x * y;
// };

// 4. 使用as关键字重命名
// function v1() {
//
// }
// function v2() {
//
// }
//
// export {
//   v1 as streamV1,
//   v2 as streamV2,
//   v2 as streamLatestVersion,
// }

// 5. export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
// 写法一
// export var m = 1;

// 写法二
// var m = 1;
// export {
//   m
// };

//
// var m = 1;
// export {
//   m as n
// }

// 写法四
// export function f() {
//
// }

// 写法五
// function f() {
//
// }
// export {
//   f
// }