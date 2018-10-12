


// n个数字
// /^\d{1,2}$/.test('2');


//多个数字
/^\d+$/


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


// 手机号
/^[0-9]{11}$/.test('sa')
/^1[3|4|5|7|8|9][0-9]\d{8}$/

//身份证号码
/^(\d|x|X){18}$/;


//文件类型
/.\.(gif|jpeg|png|jpg|bmp|svg)/i.test('aa');

