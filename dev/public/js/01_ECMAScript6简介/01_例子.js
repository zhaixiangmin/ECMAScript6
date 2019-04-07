var input = [1, 2, 3, 4];
input.map(item => item + 1);
var str = input.join(',');

document.getElementById('data').innerText = str;