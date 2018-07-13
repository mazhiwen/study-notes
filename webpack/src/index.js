// import _ from 'lodash';
import printMe from './print.js';
// import utility from 'utility-mar';
import { cube } from './math.js';
import './style.css';
function component() {
    // console.log(utility.toDateTime);
    var element = document.createElement('div');
    var btn = document.createElement('button');
    // lodash 是由当前 script 脚本 import 导入进来的
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');


    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
  }
  
  document.body.appendChild(component());








//测试模块热更新  
/*  
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}
*/


//测试 node环境
/*
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
*/