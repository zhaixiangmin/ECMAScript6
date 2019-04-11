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
// let x = 1;
// //
// // function f(x, y = x) {
// //   console.log(y);
// // }
// // f(2); // 2
// // f(); // undefined
//
// // 全局变量x不存在，就会报错
// function f1(y = x) {
//   let x = 2;
//   console.log(y);
// }
// f1(); // Uncaught ReferenceError: x is not defined
//
//
// function f2(x) {
//   console.log(x);
// }
// f2(); // undefined
//
// // 参数x = x形成一个单独作用域。实际执行的是 let x = x
// function f3(x = x) {
//   console.log('f3', x);
// }
// f3(); // Uncaught ReferenceError: x is not defined

// let foo = 'outer';

// function bar(func = () => foo ) {
//   let foo = 'inner';
//   console.log(func());
// }
// bar();

// var x = 1;
// function foo(x , y = function () { x = 2; }) {
//   // var x = 3;
//   y();
//   console.log(x);
// }
//
// foo(); // 3
// console.log('x', x); // 1

// 应用
// function throwIfMissing() {
//   throw new Error('Missing parameter');
// }
//
// function foo(mustBeProvided = throwIfMissing()) {
//  return mustBeProvided;
// }
//
// foo(); // Uncaught Error: Missing parameter

// 2. rest 参数
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}
console.log(add(2, 5, 3)); // 10

function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
    console.log(item);
  })
}

var a = [];
push(a, 1, 2, 3);
console.log('a', a);

// 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
// Uncaught SyntaxError: Rest parameter must be last formal parameter
// function f(a, ...b, c) {
//   // ...
// }

// 函数的length属性，不包括 rest 参数
console.log((function(a) {}).length); // 1
console.log((function(...a) {}).length); // 0
console.log((function(a, ...b) {}).length); // 1

// 3. 严格模式
// function doSomething(a, b) {
//
// }

// ES2016 做了一点修改，
// 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
// 那么函数内部就不能显式设定为严格模式，否则会报错

// 报错
// function doSomething1(a, b = a) {
//   'use strict';
// }

// 报错
// function doSomething1({a, b}) {
//   'use strict';
// }

// 报错
// function doSomething1(...a) {
//   'use strict';
// }

// const obj = {
// // 报错
//   doSomething1({ a, b }) {
//     'use strict';
//   }
// };

// 两种方法可以规避这种限制。

// 第一种是设定全局性的严格模式，这是合法的
// 'use strict';
// function doSomething(a, b = a) {
//
// }

// 第二种是把函数包在一个无参数的立即执行函数里面
// const doSomething = (function () {
//   'use strict';
//   return function (value = 42) {
//     return value;
//   }
// }());

// 4. name 属性

// （1）函数的name属性，返回该函数的函数名
function foo() {

}
console.log(foo.name); // foo

// 如果将一个匿名函数赋值给一个变量
// ES5 的name属性，会返回空字符串，
// 而 ES6 的name属性会返回实际的函数名
var f = function () {

};
console.log(f.name); // f

// 如果将一个具名函数赋值给一个变量，
// 则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字
const bar = function baz() {

};
console.log(bar.name); // baz

console.log((new Function).name); // anonymous

function foo2() {
  
}

console.log((function () {}).bind({}).name); // bound


// 5. 箭头函数
// （1）如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分
var f = () => 5;

var sum = (num1, num2) => num1 + num2;

// （2） 如果箭头函数的代码块部分多于一条语句，
// 就要使用大括号将它们括起来，并且使用return语句返回
var sum2 = (num1, num2) => { return num1 + num2; }

// （3）由于大括号被解释为代码块，
// 所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错
var getTempItem = id => ({ id: id, name: 'Temp' });

// 下面是一种特殊情况，虽然可以运行，但会得到错误的结果
let foo5 = () => { a: 1 };
console.log(foo5()); // undefined

// 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了
let fn = () => void doesNotReturn();

// （4）箭头函数可以与变量解构结合使用
const full = ({ first, last }) => first + ' ' + last;
console.log(full({ first: 'Willian', last: 'John' })); // Willian John

// 箭头函数的一个用处是简化回调函数
console.log([1, 2, 3].map(x => x * x)); // [1, 4, 9]

// rest 参数与箭头函数结合
const numbers = (...nums) => nums;
console.log(numbers(1, 2, 3, 4, 5)); //  [1, 2, 3, 4, 5]

// 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
// function foo6() {
//   setTimeout(() => {
//     console.log('id', this.id);
//   }, 100);
// }
//
// var id = 21;
//
// foo6.call({ id: 42 }); // id 42

// function foo7() {
//   setTimeout(function () {
//     console.log('id', this.id);
//   }, 100);
// }
//
// var id = 21;
//
// foo7.call({ id: 42 }); // id 21

// function foo8() {
//   console.log('id', this.id);
// }
//
// foo8.call({ id: 42 }); // id 42


// function foo9() {
//   (function() {
//     console.log('id', this.id);
//   })()
// }
//
// var id = 21;
//
// foo9.call({ id: 42 }); // id 21

function Timer() {
  this.s1 = 0;
  this.s2 = 0;

  // 箭头函数
  setInterval(() => this.s1++, 1000);

  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100); // 3
setTimeout(() => console.log('s2: ', timer.s2), 3100); // 0

// 箭头函数里面根本没有自己的this，而是引用外层的this
// ES6
function fll () {
  setTimeout(() => {
    console.log('id: ', this.id);
  }, 100);
}

// ES5
function fll2 () {
  var _this = this;
  setTimeout( function () {
    console.log('id: ', _this.id);
  }, 100);
}

// 请问下面的代码之中有几个this？

function foo () {
  return () => {
    return () => {
      return () => {
        console.log('id: ', this.id);
      }
    }
  }
}

// 因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this
var f = foo.call({id: 1});
var t1 = f.call({ id: 2 })()(); // id: 1
var t1 = f.call({ id: 3 })()(); // id: 1
var t1 = f.call({ id: 4 })()(); // id: 1

// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：
// arguments、super、new.target
function foo2() {
  setTimeout(() => {
    console.log('args: ', arguments);
  }, 100);
  // setTimeout(function() {
  //   console.log('args: ', arguments);
  // }, 100);
}
foo2(2, 4, 6, 8); // [2, 4, 6, 8]