// import { foo } from './m1.js';
// console.log(foo);
// setTimeout(() => console.log(foo), 500);

// import obj from './m1.js';
import { obj } from './m1.js';

obj.prop = 456;
// 变量obj指向的地址是只读的，不能重新赋值
// 这就好比创造了一个名为obj的const变量
obj = {}; // Uncaught TypeError: Assignment to constant variable