// 1. 通过import命令加载模块
// import { firstName, lastName, year } from './profile';
//
// function setName(element) {
//   element.textContent = firstName + ' ' + lastName;
// }
// 2. import命令使用as关键字，将导入的变量重命名
// import { lastName as surname } from './profile';

// 3.import命令导入的变量都是只读
// import { lastName } from './profile'
// lastName = ''; // Syntax Error: 'lastName' is read-only

// 4. 如果a是一个对象，改写a的属性是允许的
// import { a } from './profile'
// a.foo = 'hello';
// a的属性可以成功改写，并且其他模块也可以读到改写后的值
// 不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，轻易不要改变它的属性

// 5. 如果只是模块名，不带有路径，
// 那么必须有配置文件，告诉 JavaScript 引擎该模块的位置
// import { myMethod } from 'util';

// 6. import命令具有提升效果，会提升到整个模块的头部，首先执行
// foo();
//
// import { foo } from 'my_module';
// import命令是编译阶段执行的，在代码运行之前

// 7. 由于import是静态执行，所以不能使用表达式和变量，
// 这些只有在运行时才能得到结果的语法结构
// import { 'f' + 'oo' } from 'my_module'; // 报错

// 报错
// let module = 'my_module';
// import { foo } from module;

// 报错
// if(x == 1) {
//   import { foo } from 'module1';
// } else {
//   import { foo } from 'module2';
// }

// 8. import语句会执行所加载的模块，因此可以有下面的写法
// import 'lodash';
// 上面代码仅仅执行lodash模块，但是不输入任何值

// 9.  如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次
// import 'lodash'
// import 'lodash'
// 上面代码加载了两次lodash，但是只会执行一次

// 10. import语句是 Singleton 模式
// import { foo } from 'my_module';
// import { bar } from 'my_module';

// 等同于
// import { foo, bar } from 'my_module';

// 11. 通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。
// import在静态解析阶段执行，所以它是一个模块之中最早执行的。
// 下面的代码可能不会得到预期结果。
// require('core-js/modules/es6.symbol');
// require('core-js/modules/es6.promise');
// import React from 'React';

// 模块的整体加载
// （1）逐一指定要加载的方法
// import { area, circumference } from "./circle";
// console.log('圆面积：' + area(4));
// console.log('圆周长：' + circumference(4));

// （2）整体加载的写法
// import * as circle from './circle'
// console.log('圆面积：' + circle.area(4));
// console.log('圆周长：' + circle.circumference(4));

// （3） 模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，
// 所以不允许运行时改变。下面的写法都是不允许的
// import * as circle from './circle'
// // 下面两行都是不允许的
// circle.foo = 'hello';
// circle.area = function () {
//
// };

// 6. export-default
// （1）其他模块加载该模块时，import命令可以为该匿名函数指定任意名字
// import customName from './export-default';
// customName(); // foo

// 有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例
import _ from 'lodash';

// 如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。
// import _, { each, forEach } from 'export-default';

// export default也可以用来输出类
import MyClass from 'MyClass';
// let o = new NyClass();

// 7. export default也可以用来输出类
// （1） 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起
// export { foo, bar } from 'my_module';
// 可以理解为
// import { foo, bar } from 'my_module';
// export  { foo, bar }

// （2） 模块的接口改名和整体输出，也可以采用这种写法
// 接口改名
// export { foo as myFoo } from 'my_module';
// 整体输出
// export * from 'my_module';

// （3） 默认接口的写法
// export { default } from 'my_module';

// （4） 具名接口改为默认接口的写法
// export { es6 as default } from './someModule';
// 等同于
// export { es6 } from './someModule';
// export default es6;

// （5） 默认接口也可以改名为具名接口。
// export { default as es6 } from './someModule';

// 加载上面模块的写法
// import * as math from 'circleplus';
// import exp from 'circleplus'
// // 上面代码中的import exp表示，将circleplus模块的默认方法加载为exp方法
// console.log(exp(math.e));

// 9. 跨模块常量
// （1）
// import * as contants from './constants';
// console.log(contants.A); // 1
// console.log(contants.B); // 3

// （2）
// import { A, B } from './constants'
// console.log(A); // 1
// console.log(B); // 3

// import { db, users } from '../constants/index'


// 10. import()
// 引入import()函数，完成动态加载
// const main = document.querySelector('main');
// import ('./section-modules/${someVariable}.js')
//   .then(module => {
//     module.loadPageInto(main);
//   })
//   .catch(err => {
//     main.textContent = err.message;
//   });

// （2）适用场合
// button.addEventListener('click', event => {
//   import('./dialogBox.js')
//     .then(dialogBox => {
//       dislogBox.open();
//     })
//     .catch(error => {
//     //  Error handling
//     })
// });

// （3）import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数
// import ('./myModule.js')
//   .then(({ export1, export2 }) => {
//     // ...
//   });

// （4）如果模块有default输出接口，可以用参数直接获得
// import ('./myModule.js')
//   .then(myModule => {
//     console.log.log(myModule.default);
//   });
// （5）上面的代码也可以使用具名输入的形式
// import ('./myModule.js')
//   .then(({ default: theDefault }) => {
//   console.log.log(theDefault);
// });

// （6） 同时加载多个模块
// Promise.all([
//   import('./module1.js'),
//   import('./module2.js'),
//   import('./module3.js'),
// ])
// .then(([module1, module2, module3]) => {
// //  ...
// });

// （7）import()也可以用在 async 函数之中
async function main() {
  const myModule = await import('./myModule.js');
  const { export1, export2 } = await import('./myModule.js');
  const [module1, module2, module3] = await Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js'),
  ]);
}
main();