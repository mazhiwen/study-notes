


// n个数字
// /^\d{1,2}$/.test('2');


// n个非空
// /^\S{1,2}$/.test('2');

//匹配多行
var a=/(.*?)(href="(.*?)"(.*?)[\r\n])*/.exec(`href="aa"
bbhref=""`);
console.log(a);

//匹配 /aaa/bbb 中的aaa
'/aaa/bb'.match(/\/([^/]*)/);


//只匹配英文数字下划线
/^[\w]*$/.test('sd')