console.log('\u0061'); // a
console.log('\uD842\uDFB7'); // 𠮷
console.log('\u20BB7'); // 7
// avaScript 会理解成\u20BB+7。
// 由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7

// 只要将码点放入大括号，就能正确解读该字符
console.log('\u{20BB7}'); // 𠮷
console.log('\u{41}\u{42}\u{43}'); // ABC

let hello = 123;
console.log(hell\u{6F}); // 123

console.log('\u{1F680}' == '\uD83D\uDE80'); // true

console.log('\z' == 'z'); // true
console.log('\172' == 'z'); // true
console.log('\x7A' == 'z'); // true
console.log('\007A' == 'z'); // true
console.log('\u{7A}' == 'z'); // true

var s = '𠮷';
console.log("s.length", s.length); // 2
console.log("s.charAt(0)", s.charAt(0)); // ''
console.log("s.charAt(1)", s.charAt(1)); // ''
console.log("s.charCodeAt(0)", s.charCodeAt(0)); // 55362
console.log("s.charCodeAt(1)", s.charCodeAt(1)); // 57271


// ES6 提供了codePointAt方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点
let s2 = '𠮷a';
// codePointAt方法会正确返回 32 位的 UTF-16 字符的码点
console.log("s2.charCodeAt(0)", s2.codePointAt(0)); // 134071
console.log("s2.charCodeAt(1)", s2.codePointAt(1)); // 57271
console.log("s2.charCodeAt(2)", s2.codePointAt(2)); // 97
// 想要十六进制的值，可以使用toString方法转换一下
console.log("s2.charCodeAt(0).toString(16)", s2.codePointAt(0).toString(16)); // 20bb7
console.log("s2.charCodeAt(2).toString(16)", s2.codePointAt(2).toString(16)); // 61

// for...of循环
// 正确识别 32 位的 UTF-16 字符
for (let ch of s2) {
  console.log(ch.codePointAt(0).toString(16));
  // 20bb7
  // 61
}

// codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
console.log(is32Bit('𠮷')); // true
console.log(is32Bit('a')); // false

// ES6 提供了String.fromCodePoint方法，可以识别大于0xFFFF的字符
console.log(String.fromCodePoint(0x20BB7)); // 𠮷
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'); // true

// 4. 字符串的遍历器接口
for (let codePoint of 'foo') {
  console.log(codePoint); // f o o
}

let text = String.fromCodePoint(0x20BB7);
for (let i = 0;  i < text.length; i++) {
  console.log(text[i]); // '' ''
}
// 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，
// 传统的for循环无法识别这样的码点
for (let i of text) {
  console.log(i); // 𠮷
}

// 5. normalize()
// ES6 提供字符串实例的normalize()方法，
// 用来将字符的不同表示方法统一为同样的形式，
// 这称为 Unicode 正规化
console.log('\'\u01D1\' === \'\u004F\u030C\'', '\u01D1' === '\u004F\u030C'); // false

console.log('\'\u01D1\'.normalize() === \'\u004F\u030C\'.normalize()', '\u01D1'.normalize() === '\u004F\u030C'.normalize()); // true

console.log('\'\u004F\u030C\'.normalize(\'NFC\').length', '\u004F\u030C'.normalize('NFC').length); // 1
console.log('', '\u004F\u030C'.normalize('NFD').length); // 2

// 6. includes(), startsWith(), endsWith()
let s3 = 'Hello world!';
console.log('s3.startsWith(\'Hello\')', s3.startsWith('Hello')); // true
console.log('s3.endsWith(\'!\')', s3.endsWith('!')); // true
console.log('s3.includes(\'o\')', s3.includes('o')); // true

// 这三个方法都支持第二个参数，表示开始搜索的位置
console.log('s3.startsWith(\'world\', 6)', s3.startsWith('world', 6)); // true
console.log('s3.endsWith(\'Hello\', 5)', s3.endsWith('Hello', 5)); // true
console.log('s3.endsWith(\'world\', 11)', s3.endsWith('world', 11)); // true
console.log('s3.includes(\'Hello\', 6)', s3.includes('Hello', 6)); // false

// 7. repeat()
// repeat方法返回一个新字符串，表示将原字符串重复n次
console.log('x'.repeat(3)); // xxx
console.log('hello'.repeat(2)); // hellohello
console.log('na'.repeat(0)); // ''

// 8. padStart()，padEnd()
// padStart()用于头部补全，padEnd()用于尾部补全
console.log('x'.padStart(5, 'ab')); // ababx
console.log('x'.padStart(4, 'ab')); // abax

console.log('12'.padStart(10, 'YYYY-MM-DD')); // YYYY-MM-12
console.log('09-12'.padStart(10, 'YYYY-MM-DD')); // YYYY-09-12

let basket = {
  count: 123,
  onSale: 18.23
};

// 10. 模板字符串
// 模板字符串（template string）是增强版的字符串，用反引号（`）标识。
// 它可以当作普通字符串使用，
// 也可以用来定义多行字符串，
// 或者在字符串中嵌入变量

document.getElementById('result').innerHTML = `
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`;

document.getElementById('list').innerHTML = `
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim();

// 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性
let x = 1;
let y = 2;
console.log(`${x} + ${y} = ${x + y}`); // 1 + 2 = 3
console.log(`${x} + ${y * 2} = ${x + y * 2}`); // 1 + 4 = 5

let obj = {
  x: 1,
  y: 2
};
console.log(`${obj.x + obj.y}`); // 3

// 模板字符串之中还能调用函数
function fn() {
  return 'Hello World';
}
console.log(`foo ${fn()} bar`); // foo Hello World bar

// 大括号内部是一个字符串，将会原样输出
console.log(`Hello ${'World'}`); // Hello World

// 模板字符串甚至还能嵌套
const data = [
  { first: '<Jane>', last: 'Bond' },
  { first: 'Lars', last: '<Croft>' },
];
const tmpl = addrs => `
  <table>
    ${addrs.map(
      addr => `
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
      `  
    ).join('')}  
  </table>
`;
console.log(tmpl(data));
// <table>
//
// <tr><td><Jane></td></tr>
// <tr><td>Bond</td></tr>
//
// <tr><td>Lars</td></tr>
// <tr><td><Croft></td></tr>
//
// </table>

// 如果需要引用模板字符串本身，在需要时执行，可以写成函数
let func = (name) => `Hello ${name}`;
console.log(func('Jack'));

// 12. 标签模板
let a = 5;
let b = 10;

function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return 'OK';
}

tag`Hello ${ a + b } world ${ a * b }`;
// Hello Jack
// Hello
//  world
//
// 15
// 50

// 下面是一个更复杂的例子
let total = 30;
let msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
function passthru(literals) {
  let result = '';
  let i = 0;

  while(i < literals.length) {
    console.log('literals[' + i + ']', literals[i]);
    result += literals[i++];
    if(i < arguments.length) {
      console.log('arguments[' + i + ']', arguments[i]);
      result += arguments[i];
    }
  }

  return result;
}
console.log('msg', msg); //  The total is 30 (31.5 with tax)

// passthru函数采用 rest 参数的写法
let msg2 = passthru2`The total is ${total} (${total * 1.15} with tax)`;
function passthru2(literals, ...values) {
  let result = '';
  let index = 0;

  for ( ; index < values.length; index++) {
    result += literals[index] + values[index];
  }

  result += literals[index];
  return result;
}
console.log('msg2', msg2); // The total is 30 (34.5 with tax)


// “标签模板”的一个重要应用，
// 就是过滤 HTML 字符串，防止用户输入恶意内容

let sender = '<script>alert("abc")</script>';
let message = SaferHTML`<p>${sender} has sent you a message</p>`;
function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    s += arg.replace(/&/g, '&amp;')
      .replace(/</g, '&lt:')
      .replace(/>/g, '&gt:');

    s += templateData[i];
  }

  return s;
}

console.log('message', message);
// <p>&lt:script&gt:alert("abc")&lt:/script&gt: has sent you a message</p>

// 13. String.raw()
// 充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，
// 对应于替换变量后的模板字符串
console.log(String.raw`Hi\n${2+3}!`); // Hi\n5!
console.log(String.raw`Hi\u000A!`); // Hi\u000A!