# Group 组

## Group

也有继承自Object3D

例子如下：场景对象是scene是group的父对象，group是mesh1、mesh2的父对象

父对象group进行旋转、缩放、平移变换，子对象同样跟着变换，就像你的头旋转了，眼睛会跟着头旋转。

```js
var group = new THREE.Group();
var mesh1 = new THREE.Mesh(geometry, material);
var mesh2 = new THREE.Mesh(geometry, material);
//把mesh1型插入到组group中，mesh1作为group的子对象
group.add(mesh1);
//把mesh2型插入到组group中，mesh2作为group的子对象
group.add(mesh2);
//把group插入到场景中作为场景子对象
scene.add(group);
```

## .children

Threejs场景对象Scene、组对象Group都有一个子对象属性.children,通过该属性可以访问父对象的子对象

## .add()

group也有add

父对象执行.add()方法的本质就是把参数中的子对象添加到自身的子对象属性.children中。

.add()方法可以单独插入一个对象，也可以同时插入多个子对象。

## .remove()

```js
// 删除父对象group的子对象网格模型mesh1
group.remove(mesh1)
// 一次删除场景中多个对象
scene.remove(light,group)
```

## .name

```js
// 网格模型命名
Mesh.name = "眼睛"
// mesh父对象对象命名
group.name = "头"
```

## 查找某个具体的模型

```js
// 遍历查找scene中复合条件的子对象，并返回id对应的对象
var idNode = scene.getObjectById ( 4 );
console.log(idNode);
// 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
var nameNode = scene.getObjectByName ( "左腿" );
nameNode.material.color.set(0xff0000);
```
