import { firstName, lastName, year } from './/profile.js'
const x = 1;

console.log(x == window.x); // false
console.log(this == undefined); // true
console.log('firstName', firstName); // Michael
console.log('lastName', lastName); // Jackson
console.log('year', year); // 1958
