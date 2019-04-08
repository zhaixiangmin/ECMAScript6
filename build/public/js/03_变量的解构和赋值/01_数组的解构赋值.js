"use strict";

// let [a, b, c] = [1, 2, 3];
// console.log('a', a); // 1
// console.log('b', b); // 2
// console.log('c', c); // 3
//
// let [foo, [[bar], baz]] = [1, [[2], 3]];
// console.log('foo', foo); // 1
// console.log('bar', bar); // 2
// console.log('baz', baz); // 3
//
// let [ , , third] = ['foo', 'bar', 'baz'];
// console.log('third', third); // baz
//
// let [x, , y] = [1, 2, 3];
// console.log('x', x); // 1
// console.log('y', y); // 3
//
// let [head, ...tail] = [1, 2, 3, 4];
// console.log('head', head); // 1
// console.log('tail', tail); // [2, 3, 4]
//
// let [x2, y2, ...z2] = ['a'];
// console.log('x2', x2); // a
// console.log('y2', y2); // undefined
// console.log('z2', z2); // []
//
// let [foo2] = [];
// console.log('foo2', foo2); // undefined
//
// let [bar3, foo3] = [1];
// console.log('bar3', bar3); // 1
// console.log('foo3', foo3); // undefined
//
// let [x3, y3] = [1, 2, 3];
// console.log('x3', x3); // 1
// console.log('y3', y3); // 2
//
// let [a2, [b2], d3] = [1, [2, 3], 4];
// console.log('a2', a2); // 1
// console.log('b2', b2); // 2
// console.log('d3', d3); // 4
//
// // let [foo4] = 1; // Uncaught TypeError: 1 is not iterable
// // let [foo5] = false; // Uncaught TypeError: false is not iterable
// // let [foo6] = NaN; // Uncaught TypeError: NaN is not iterable
// // let [foo7] = undefined; // Uncaught TypeError: undefined is not iterable
// // let [foo8] = null; // Uncaught TypeError: null is not iterable
// // let [foo9] = {}; // Uncaught TypeError: {} is not iterable
//
// let [x4, y4, z4] = new Set(['a', 'b', 'c']);
// console.log('x4', x4); // a
//
// function* fibs() {
//   let a = 0;
//   let b = 1;
//   while (true) {
//     yield a;
//     [a, b] = [b, a + b];
//   }
// }
//
// let [first, second, third2, fourth, fifth, sixth] = fibs();
// console.log('sixth', sixth); // 5
// 默认值
// let [foo = true] = [];
// console.log('foo', foo); // true
//
// // let [x, y = 'b'] = ['a'];
// // console.log('x', x); // a
// // console.log('y', y); // b
//
// let [x, y = 'b'] = ['a', undefined];
// console.log('x', x); // a
// console.log('y', y); // b
//
// // ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
// // 所以，只有当一个数组成员严格等于undefined，默认值才会生效
// let [x2 = 1] = [undefined];
// console.log('x2', x2); // 1
//
// let [x3 = 1] = [null];
// console.log('x3', x3); // null
//
// function f() {
//   console.log('aaa');
//   return '1234'
// }
// // let [x4 = f()] = [1];
// // console.log('x4', x4); // 1
// let [x4 = f()] = [];
// console.log('x4', x4); // 1234
// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
// let [x = 1, y = x] = [];
// console.log('x', x); // 1
// console.log('y', y); // 1
// let [x = 1, y = x] = [2];
// console.log('x', x); // 2
// console.log('y', y); // 2
// let [x = 1, y = x] = [1, 2];
// console.log('x', x); // 1
// console.log('y', y); // 2
var _ref = [],
    _ref$ = _ref[0],
    x = _ref$ === void 0 ? y : _ref$,
    _ref$2 = _ref[1],
    y = _ref$2 === void 0 ? 1 : _ref$2; // Uncaught ReferenceError: y is not defined

console.log('x', x); // 1

console.log('y', y); // 2