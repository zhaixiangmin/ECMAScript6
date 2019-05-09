// 1. 二进制和八进制表示法
console.log(0b111110111 === 503); // true
console.log(0o767 === 503); // true

// 从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6 进一步明确，要使用前缀0o表示
// 非严格模式
(function () {
  console.log(0o11 === 011); // true
})()

// 严格模式
// (function () {
//   'use strict';
//   console.log(0o11 === 011); // ncaught SyntaxError: Octal literals are not allowed in strict mode.
// })()

// 如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法
console.log(Number('0b111')); // 7
console.log(Number('0o10')); // 8

// 2. Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity
console.log(Number.isFinite(15)); // true
console.log(Number.isFinite(0.8)); // true
// 如果参数类型不是数值，Number.isFinite一律返回false
console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(-Infinity)); // false
console.log(Number.isFinite('foo')); // false
console.log(Number.isFinite('15')); // false
console.log(Number.isFinite(true)); // false

// Number.isNaN()用来检查一个值是否为NaN
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(15)); // false
console.log(Number.isNaN('15')); // false
console.log(Number.isNaN(true)); // false
console.log(Number.isNaN(9/NaN)); // true
console.log(Number.isNaN('true' / 0)); // true
console.log(Number.isNaN('true' / 'true')); // true

console.log(isFinite(25)); // true
console.log(isFinite("25")); // true
console.log(Number.isFinite(25)); // true
console.log(Number.isFinite("25")); // false

console.log(isNaN(NaN)); // true
console.log(isNaN("NaN")); // true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("NaN")); // false
console.log(Number.isNaN(1)); // false

// 2. Number.parseInt(), Number.parseFloat()
// ES5的写法
console.log(parseInt('12.34')); // 12
console.log(parseFloat('123.45#')); // 123.45

// ES6的写法
console.log(Number.parseInt('12.34')); // 12
console.log(Number.parseFloat('123.45#')); // 123.45

// 4. Number.isInteger()
console.log(Number.isInteger(25)); // true
console.log(Number.isInteger(25.1)); // false

// JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值
console.log(Number.isInteger(25)); // true
console.log(Number.isInteger(25.0)); // true

// 如果参数不是数值，Number.isInteger返回false
console.log(Number.isInteger()); // false
console.log(Number.isInteger(null)); // false
console.log(Number.isInteger('15')); // false
console.log(Number.isInteger(true)); // false
// 如果数值的精度超过这个限度，
// 第54位及后面的位就会被丢弃，
// 这种情况下，Number.isInteger可能会误判。
console.log(Number.isInteger(3.0000000000000002)); // true

// 如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），
// 即小于 JavaScript 能够分辨的最小值，会被自动转为 0。
// 这时，Number.isInteger也会误判
console.log(Number.isInteger(5E-324)); // false
console.log(Number.isInteger(5E-325)); // true

// 5. Number.EPSILON
console.log('Number.EPSILON === Math.pow(2, -52)', Number.EPSILON === Math.pow(2, -52)); // true
console.log("Number.EPSILON", Number.EPSILON); // 2.220446049250313e-16
console.log(Number.EPSILON.toFixed(20)); // 0.00000000000000022204

console.log('0.1 + 0.2', 0.1 + 0.2); // 0.30000000000000004
console.log('0.1 + 0.2 - 0.3', 0.1 + 0.2 - 0.3); // 5.551115123125783e-17

// Number.EPSILON的实质是一个可以接受的最小误差范围
function withinErrorMargin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
console.log('withinErrorMargin(0.1 + 0.2, 0.3)', withinErrorMargin(0.1 + 0.2, 0.3));

// 6. 安全整数和 Number.isSafeInteger()
console.log('Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1', Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); // true
console.log('9007199254740992', 9007199254740992);
console.log('9007199254740993', 9007199254740993);

console.log('Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1', Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); // true
console.log('Number.MAX_SAFE_INTEGER === 9007199254740991', Number.MAX_SAFE_INTEGER === 9007199254740991); // true
console.log('Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER', Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER); // true
console.log('Number.MIN_SAFE_INTEGER === -9007199254740991', Number.MIN_SAFE_INTEGER === -9007199254740991); // true

console.log('---------------------');
console.log(Number.isSafeInteger('a')) ;// false
console.log(Number.isSafeInteger(null)) ;// false
console.log(Number.isSafeInteger(NaN)) ;// false
console.log(Number.isSafeInteger(Infinity)) ;// false
console.log(Number.isSafeInteger(-Infinity)) ;// false

console.log(Number.isSafeInteger(3)); // true
console.log(Number.isSafeInteger(1.2)) ;// false
console.log(Number.isSafeInteger(9007199254740990)); // true
console.log(Number.isSafeInteger(9007199254740992)) ;// false

console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)) ;// false
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)) ;// false

// Number.isSafeInteger = function (n) {
//   return (typeof n === 'number' && Math.round(n) === n && Number.MIN_SAFE_INTEGER <= n && n <= Number.MAX_SAFE_INTEGER );
// };
// console.log('Number.isSafeInteger', Number.isSafeInteger(12.23)); // false
// console.log('Number.isSafeInteger', Number.isSafeInteger(12)); // true


// 超出了精度范围，导致在计算机内部，以9007199254740992的形式储存
console.log('9007199254740993', 9007199254740993); // 9007199254740992


// 验证两个运算数和运算结果
function trusty (left, right, result) {
  if(
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }

  throw new RangeError('Operation cannot be trusty!');
}

console.log("trusty(1, 2, 3)", trusty(1, 2, 3));
// console.log(trusty(9007199254740993, 990, 9007199254740993 - 990)); // Uncaught RangeError: Operation cannot be trusty!
// console.log(trusty(9007199254740991, 990, 9007199254740991 + 990));


// 7. Math 对象的扩展
// （1）Math.trunc方法用于去除一个数的小数部分，返回整数部分。
console.log(Math.trunc(4.1)); // 4
console.log(Math.trunc(-4.1)); // -4

// 对于非数值，Math.trunc内部使用Number方法将其先转为数值
console.log(Math.trunc('123.456')); // 123
console.log(Math.trunc(true)); // 1
console.log(Math.trunc(false)); // 0
console.log(Math.trunc(null)); // 0

// 对于空值和无法截取整数的值，返回NaN
console.log(Math.trunc(NaN)); // NaN
console.log(Math.trunc('foo')); // NaN
console.log(Math.trunc()); // NaN
console.log(Math.trunc(undefined)); // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟
Math.trunc = Math.trunc || function (x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

// （2）Math.sign()
console.log(Math.sign(-5)); // -1
console.log(Math.sign(5)); // 1
console.log(Math.sign(0)); // 0
console.log(Math.sign(-0)); // -0
console.log(Math.sign(NaN)); // NaN

console.log(Math.sign('')); // 0
console.log(Math.sign(true)); // 1
console.log(Math.sign(false)); // 0
console.log(Math.sign(null )); // 0
console.log(Math.sign('9' )); // 1
console.log(Math.sign('foo' )); // NaN
console.log(Math.sign( )); // NaN
console.log(Math.sign(undefined )); // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟
Math.sign2 = function (x) {
  x = +x;
  if (x === 0 || isNaN(x)) {
    return 0;
  }

  return x > 0 ? 1 : -1;
}
console.log(Math.sign2('foo' )); // NaN

// （3）Math.cbrt()
// Math.cbrt方法用于计算一个数的立方根
console.log(Math.cbrt(-1)); // -1
console.log(Math.cbrt(0)); // 0
console.log(Math.cbrt('8')); // 2
console.log(Math.cbrt('hello')); // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟
Math.cbrt2 = function (x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x > 0 ? y : -y;
}
console.log(Math.cbrt2(-1)); // -1
console.log(Math.cbrt2(0)); // 0
console.log(Math.cbrt2('8')); // 2
console.log(Math.cbrt2('hello')); // NaN

// （4）cbrt2()
// 计算一个数的 32 位二进制形式的前导 0 的个数
console.log(Math.clz32(0)); // 32
console.log(Math.clz32(1)); // 31
console.log(Math.clz32(1000)); // 22
console.log(Math.clz32(0b01000000000000000000000000000000)); // 1
console.log(Math.clz32(0b00100000000000000000000000000000)); // 2

// 对于小数，Math.clz32方法只考虑整数部分
console.log(Math.clz32(3.2)); // 30

// （8）指数运算符
// ES2016 新增了一个指数运算符（**）
console.log(2 ** 2); // 4
console.log(2 ** 3); // 8

// 这个运算符的一个特点是右结合
console.log(2 ** 3 ** 2); // 512 => 2 ** (3 ** 2)