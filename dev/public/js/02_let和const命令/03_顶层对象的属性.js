// var a = 1;
// console.log('window.a', window.a); // 1
//
// let b = 1;
// console.log('window.b', window.b); // undefined

var obj = {
  name: 'lucy',
  walk: function () {
    console.log(this);
  }
};

obj.walk(); // this 指向 obj本身

