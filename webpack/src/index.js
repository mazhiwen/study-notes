import _ from 'lodash';
import printMe from './print.js';
// import utility from 'utility-mar';
function component() {
    // console.log(utility.toDateTime);
    var element = document.createElement('div');
    var btn = document.createElement('button');
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
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