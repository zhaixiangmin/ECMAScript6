// 1. RegExp 构造函数
// 返回的正则表达式会忽略原有的正则表达式的修饰符，
// 只使用新指定的修饰符
var regex = new RegExp(/xyz/ig, 'i');
var str = 'xyz sfjdlkfj xyz fjldsfj xyz';
console.log('regex.exec(str)', str.replace(regex, 'xxx'));
// xxx sfjdlkfj xyz fjldsfj xyz


// 3. u 修饰符
// \uD83D\uDC2A是一个四个字节的 UTF-16 编码，代表一个字符
// 但是，ES5 不支持四个字节的 UTF-16 编码，会将其识别为两个字符
// 加了u修饰符以后，ES6 就会识别其为一个字符
console.log(/^\uD83D/u.test('\uD83D\uDC2A')); // false
console.log(/^\uD83D/.test('\uD83D\uDC2A')); // true

// （1）点字符
var s = '𠮷';
console.log(/^.$/.test(s)); // false
// 对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，
// 必须加上u修饰符
console.log(/^.$/u.test(s)); // true

// （2）Unicode 字符表示法
console.log(/\u{61}/.test('a')); // false
console.log(/\u{61}/u.test('a')); // true
console.log(/\u{20BB7}/u.test('𠮷')); // true

// （3）量词
console.log(/a{2}/.test('aa')); // true
console.log(/a{2}/u.test('aa')); // true
console.log(/𠮷{2}/.test('𠮷𠮷')); // false
// 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符
console.log(/𠮷{2}/u.test('𠮷𠮷')); // true

// （4）预定义模式
// 只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符
console.log(/^\S$/.test('𠮷')); // false
console.log(/^\S$/u.test('𠮷')); // true

// 利用这一点，可以写出一个正确返回字符串长度的函数
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s2 = '𠮷𠮷';
console.log(s2.length); // 4
console.log(codePointLength(s2)); // 2

// （5）i 修饰符
// \u004B与\u212A都是大写的K
// 不加u修饰符，就无法识别非规范的K字符
console.log(/[a-z]/i.test('\u212A')); // false
console.log(/[a-z]/iu.test('\u212A')); // true

// 4. RegExp.prototype.unicode 属性
const r1 = /hello/;
const r2 = /hello/u;
// 正则实例对象新增unicode属性，表示是否设置了u修饰符
console.log(r1.unicode); // false
console.log(r2.unicode); // true

// 5. y 修饰符
// g修饰符只要剩余位置中存在匹配就可
// y修饰符要求匹配必须从头部开始，所以返回null
var s3 = 'aaa_aa_a';
var r3 = /a+/g;
var r4 = /a+/y;
console.log(r3.exec(s3)); // aaa
console.log(r4.exec(s3)); // aaa

console.log(r3.exec(s3)); // aa
console.log(r4.exec(s3)); // null

// 改一下正则表达式，保证每次都能头部匹配，y修饰符就会返回结果了
var s5 = 'aaa_aa_a';
var r5 = /a+_/y;
console.log(r5.exec(s5)); // aaa_
console.log(r5.exec(s5)); // aa_

// 单单一个y修饰符对match方法，
// 只能返回第一个匹配，
// 必须与g修饰符联用，才能返回所有匹配
console.log('a1a2a3'.match(/a\d/y)); // ['a1']
console.log('a1a2a3'.match(/a\d/gy)); // ['a1', 'a2', 'a3']

// y修饰符的一个应用，是从字符串提取 token（词元）
// y修饰符确保了匹配之间不会有漏掉的字符
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

function tokenize(TOKEN_REGEX, str) {
  let result = [];
  let match;
  while (match = TOKEN_REGEX.exec(str)) {
    result.push(match[1]);
  }

  return result;
}

console.log(tokenize(TOKEN_Y, '3 + 4')); //  ["3", "+", "4"]
console.log(tokenize(TOKEN_G, '3 + 4')); //  ["3", "+", "4"]

// g修饰符会忽略非法字符
console.log(tokenize(TOKEN_Y, '3x + 4')); //  ["3"]
// 而y修饰符不会，这样就很容易发现错误
console.log(tokenize(TOKEN_G, '3x + 4')); //  ["3", "+", "4"]

// 6. RegExp.prototype.sticky 属性
var r = /hello\d/y;
console.log('r.sticky', r.sticky); // true

// 7. RegExp.prototype.flags 属性
console.log('/abc/ig.source', /abc/ig.source); // abc
console.log('/abc/ig.flags', /abc/ig.flags); // gi

// 8. s 修饰符：dotAll 模式
console.log(/foo.bar/.test('foo\nbar')); // false
// ES2018 引入s修饰符，使得.可以匹配任意单个字符
console.log(/foo.bar/s.test('foo\nbar')); // true

// 正则表达式还引入了一个dotAll属性，返回一个布尔值，表示该正则表达式是否处在dotAll模式
const re = /foo.bar/s;

console.log(re.test('foo\nbar')); // true
console.log(re.dotAll); // true
console.log(re.flags); // s