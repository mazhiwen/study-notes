/**************** async/await ****************/
//babel 转换  node8支持
//await挂起当前函数，将后续语句加入到 event loop 循环中
async function asyncCall() {
  const v1 = await asyncFunc();
  const v2 = await asyncFunc(v1);
  const v3 = await asyncFunc(v2);
  return v3;
}




1.Object.values/Object.entries






