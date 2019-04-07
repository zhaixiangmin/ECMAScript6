// let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// console.log('foo', foo); // aaa
// console.log('bar', bar); // bbb

// let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
// console.log('foo', foo); // aaa
// console.log('bar', bar); // bbb

// let { baz } = { foo: 'aaa', bar: 'bbb' };
// console.log('baz', baz); // undefined

// // 将现有对象的方法，赋值到某个变量
// const { log } = console;
// log('hello'); // hello
//
// log = 'ni'; // Uncaught TypeError: Assignment to constant variable

// 如果变量名与属性名不一致
// let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// console.log('baz', baz); // aaa
//
// let obj = { first: 'hello', last: 'world' };
// let { first: f, last: l } = obj;
// console.log('f', f); // hello
// console.log('l', l); // world

// 与数组一样，解构也可以用于嵌套结构的对象
// let obj = {
//   p: [
//     'Hello',
//     { y: 'World' }
//   ]
// };
//
// let { p, p: [x, { y }] } = obj;
// console.log('x', x);
// console.log('y', y);
// console.log('p', p);

// const node = {
//   loc: {
//     start: {
//       line: 1,
//       column: 5
//     }
//   }
// };
//
// let { loc, loc: { start }, loc: { start: { line } } } = node;
// console.log('loc', loc); // {start: {line: 1, column: 5}}
// console.log('start', start); // {line: 1, column: 5}
// console.log('line', line); // 1

// // 嵌套赋值
// let obj = {};
// let arr = [];
//
// ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
// console.log('obj', obj); // { prop: 123 }
// console.log('arr', arr); // [true]

// 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错
// let { foo: {bar} } = {baz: 'baz'}; // Uncaught TypeError: Cannot destructure property `bar` of 'undefined' or 'null'

// // 对象的解构赋值可以取到继承的属性
// const obj1 = {};
// const obj2 = { foo: 'bar' };
// Object.setPrototypeOf(obj1, obj2);
// console.log('obj1', obj1); // {}  ==> _proto_: { foo: 'bar' }
// console.log('obj1.foo', obj1.foo); // bar
//
// const { foo } = obj1;
// console.log('foo', foo); // bar

// 对象的解构也可以指定默认值
// var { x = 3 } = {};
// console.log('x', x); // 3

// var { x, y = 5 } = { x: 1 };
// console.log('x', x); // 1
// console.log('y', y); // 5

// var { x: y = 3 } = {  };
// console.log('y', y); // 3

// var { x: y = 3 } = { x: 5 };
// console.log('y', y); // 5

// var { message: msg = 'Something went wrong' } = {  };
// console.log('msg', msg); // Something went wrong

// 默认值生效的条件是，对象的属性值严格等于undefined
// var { x = 3 } = { x: undefined };
// console.log('x', x); // 3
//
// var { x2 = 3 } = { x2: null };
// console.log('x2', x2); // null
// console.log('undefined == null', undefined == null); // true
// console.log('undefined === null', undefined === null); // false

// 注意点
// let x;
// // 因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误
// // {x} = {x: 1} // Uncaught SyntaxError: Unexpected token =
// // 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题
// ({x} = {x: 1});
// {
//   console.log('x', x); // 1
// }
// console.log('x', x); // 1

// 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
// let arr = [1, 2, 3];
// let { 0: first, [arr.length - 1]: last } = arr;
// console.log('first', first); // 1
// console.log('last', last); // 3


// 字符串的解构赋值
// const [a, b, c, d, e] = 'hello';
// console.log('a', a); // h
// console.log('b', b); // e
// console.log('c', c); // l
// console.log('d', d); // l
// console.log('e', e); // o

// 类似数组的对象都有一个length属性
// let {length: len} = 'hello';
// console.log('len', len); // 5

// 数值和布尔值的解构赋值
// let { toString: s } = 123;
// console.log('s', s); // ƒ toString() { [native code] }
// console.log('Number.prototype.toString', Number.prototype.toString); // ƒ toString() { [native code] }

// let { prop: x } = undefined; // Uncaught TypeError: Cannot destructure property `prop` of 'undefined' or 'null'
// let { prop: x } = null; // Uncaught TypeError: Cannot destructure property `prop` of 'undefined' or 'null'

// 函数参数的解构赋值
// function add([x, y]) {
//   return x + y;
// }
// console.log('add([1, 2])', add([1, 2])); // 3
//
// let arr = [[1, 2], [3, 4]].map(([a, b]) => a + b);
// console.log('arr', arr); // [3, 7]

// 函数参数的解构也可以使用默认值
// function move({x = 0, y = 0} = {}) {
//   return [x, y];
// }
// let ret = move({ x: 3, y: 8 });
// console.log('ret', ret); // [3, 8]
// ret = move({ x: 3 });
// console.log('ret', ret); // [3, 0]
// ret = move({ });
// console.log('ret', ret); // [0, 0]
// ret = move();
// console.log('ret', ret); // [0, 0]


// function move({x, y} = {x: 0, y: 0}) {
//   return [x, y];
// }
// let ret = move({ x: 3, y: 8 });
// console.log('ret', ret); // [3, 8]
// ret = move({ x: 3 });
// console.log('ret', ret); // [3, undefined]
// ret = move({ });
// console.log('ret', ret); // [undefined, undefined]
// ret = move();
// console.log('ret', ret); // [0, 0]

// 7.用途
// （1）交换变量的值
// let x = 1;
// let y = 2;
// [x, y] = [y, x];
// console.log('x', x); // 2
// console.log('y', y); // 1

// （2）从函数返回多个值
// function example() {
//   return [1, 2, 3];
// }
// let [a, b, c] = example();
// console.log('a', a); // 1
// console.log('b', b); // 2
// console.log('c', c); // 3

// function example() {
//   return {
//     foo: 1,
//     bar: 2
//   };
// }
// let {foo, bar}= example();
// console.log('foo', foo); // 1
// console.log('bar', bar); // 2

// （3）函数参数的定义
// 参数是一组有次序的值
// function f([x, y, z] = []) {
//   return x + y + z;
// }
// let ret = f([1, 2, 3]);
// console.log('ret', ret); // 6

// 参数是一组无次序的值
// function f({x, y, z}) {
//   return x + y + z;
// }
// let ret = f({z: 3, y: 2, x: 1});
// console.log('ret', ret); // 6

// （4）提取 JSON 数据
// let jsonData = {
//   id: 42,
//   status: 'OK',
//   data: [867, 5309]
// };
// let { id, status, data: number } = jsonData;
// console.log(id, status, number); // 42 "OK" [867, 5309]

// （5）函数参数的默认值
// jQuery.ajax = function (url, {
//   async = true,
//   beforeSend = function () {},
//   cache = true,
//   complete = function () {},
//   crossDomain = false,
//   global = true,
//   // ... more config
// } = {}) {
//   // ... do stuff
// };

// （6）遍历 Map 结构
// const map = new Map();
// map.set('first', 'hello');
// map.set('second', 'world');
// console.log('map', map); // {"first" => "hello", "second" => "world"}
// // for (let [key, value] of map) {
//   console.log(key + ' is ' + value);
//   // first is hello
//   // second is world
// }
// for (let m of map) {
//   console.log('m', m);
//   // ["first", "hello"]
//   // ["second", "world"]
// }

// for (let [key] of map) {
//   console.log(key);
//   // first
//   // second
// }
// for (let [, value] of map) {
//   console.log(value);
//   // hello
//   // world
// }

// （7）输入模块的指定方法
require('source-map');
console.log('require(\'source-map\');', require('source-map'));