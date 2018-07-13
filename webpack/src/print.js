import _ from 'lodash';

console.log(
  _.join(['fuckprint', 'module', 'loaded!'], ' ')
);

export default function printMe() {
    console.log('I get called from print.js!');
  }