function C() {
  this.sum = 0;
  this.add = function () {
    this.sum++;
  };
  this.show = function () {
    console.log('this.sum', this.sum);
  };
}

export let c = new C();