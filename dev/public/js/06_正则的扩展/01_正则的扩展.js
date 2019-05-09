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

// 9. 后行断言

// 先行断言
// “先行断言”括号之中的部分（(?=%)），是不计入返回结果的
console.log(/\d+(?=%)/.exec('100% of US presidents have been male')); // [100]
console.log(/\d+(?!%)/.exec('that\'s all 44 of them')); // [44]

// “后行断言”的括号之中的部分（(?<=\$)），也是不计入返回结果
console.log(/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')); // [100]
console.log(/(?<!\$)\d+/.exec('it\'s worth about €90')); // [90]

// 使用后行断言进行字符串替换
const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
console.log('$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar')); // $bar %foo foo

// 10. Unicode 属性类
// 指定匹配一个希腊文字母，所以匹配π成功
const regexGreekSymbol = /\p{Script=Greek}/u;
console.log(regexGreekSymbol.test('π')); // true

// 属性类指定匹配所有十进制字符
const regex2 = /^\p{Decimal_Number}+$/u;
console.log(regex2.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼') ); // true

// \p{Number}甚至能匹配罗马数字
const regex3 = /^\p{Number}+$/u;
console.log(regex3.test('²³¹¼½¾')); // true
console.log(regex3.test('㉛㉜㉝')); // true
console.log(regex3.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ')); // true

// 11. 具名组匹配
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

const matchObj = RE_DATE.exec('1992-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
console.log(matchObj);
console.log(year);
console.log(month);
console.log(day);

// 具名组匹配
const RE_DATE2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj2 = RE_DATE2.exec('1992-12-31');
console.log('matchObj2', matchObj2);
const year2 = matchObj2.groups.year;
const month2 = matchObj2.groups.month;
const day2 = matchObj2.groups.day;
console.log(year2);
console.log(month2);
console.log(day2);

// 解构赋值和替换
let { groups: { one, two } } = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
console.log('one', one); // foo
console.log('two', two); // bar

// 字符串替换时，使用$<组名>引用具名组
const re2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
console.log('2015-01-02'.replace(re2, '$<day>/$<month>/$<year>')); // 02/01/2015

// replace方法的第二个参数也可以是函数
let ret = '2019-04-09'.replace(re2, (matched, capture1, capture2, capture3, position, S, groups) => {
  let { day, month, year } = groups;
  return `${day}/${month}/${year}`;
});
console.log('ret', ret); // 09/04/2019

// 引用
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
console.log(RE_TWICE.test('abc!abc')); // true
console.log(RE_TWICE.test('abc!ab')); // false

// 数字引用（\1）依然有效
const RE_TWICE2 = /^(?<word>[a-z]+)!\1$/;
console.log(RE_TWICE2.test('abc!abc')); // true
console.log(RE_TWICE2.test('abc!ab')); // false

// 这两种引用语法还可以同时使用
const RE_TWICE3 = /^(?<word>[a-z]+)!\k<word>!\1$/;
console.log(RE_TWICE3.test('abc!abc!abc')); // true
console.log(RE_TWICE3.test('abc!abc!ab')); // false

// 12. String.prototype.matchAll
var regex4 = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match2;
while (match2 = regex4.exec(string)) {
  matches.push(match2);
}
console.log("matches", matches);
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3", groups: undefined]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3", groups: undefined]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3", groups: undefined]

var string2= 'test1test2test3';
var regex5 = /t(e)(st(\d?))/g;
console.log('string2.matchAll(regex5)', string2.matchAll(regex5));
// 由于string.matchAll(regex)返回的是遍历器，所以可以用for...of循环取出
// 返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源
for (const match of string2.matchAll(regex5)) {
  console.log(match);
}

// 遍历器转为数组
// 转为数组方法一
console.log('[...string2.matchAll(regex5)]', [...string2.matchAll(regex5)]);
console.log(Array.from(string2.matchAll(regex5)));