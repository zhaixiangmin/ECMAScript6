// 面代码中的export *，表示再输出circle模块的所有属性和方法。
// 注意，export * 命令会忽略circle模块的default方法。
export * from './circle'
export var e = 2.7982555;
export default function (x) {
  return Math.exp(x);
}

// 也可以将circle的属性或方法，改名后再输出
// export { area as circleArea } from 'circle';
// 上面代码表示，只输出circle模块的area方法，且将其改名为circleArea
