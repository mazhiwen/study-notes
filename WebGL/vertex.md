# 顶点

每个顶点(x,y,z)

Geometry 和 BufferGeometry 的有些顶点相关的数据指示语法API是不同的。但原理一样。

## 坐标数据，颜色数据

通常几何体顶点位置坐标数据和几何体顶点颜色数据都是一一对应的，比如顶点1有一个顶点位置坐标数据，也有一个顶点颜色数据，顶点2同样也有一个顶点位置坐标数据，也有一个顶点颜色数据...

```js
BufferGeometry.attributes.position
BufferGeometry.attributes.color
```

## 法向量

定义顶点法向量数据，这时候除了环境光以外，点光源也会参与光照计算，三角形整个表面比较明亮，同时两个三角形表面法线不同，即使光线方向相同，明暗自然不同，在分界位置有棱角感。

```js
BufferGeometry.attributes.normal
```

## 顶点索引

通过顶点索引组织顶点数据，顶点索引数组indexes通过索引值指向顶点位置geometry.attributes.position、顶点法向量geometry.attributes.normal中顶面数组。

```js
// Uint16Array类型数组创建顶点索引数据
var indexes = new Uint16Array([
  // 0对应第1个顶点位置数据、第1个顶点法向量数据
  // 1对应第2个顶点位置数据、第2个顶点法向量数据
  // 索引值3个为一组，表示一个三角形的3个顶点
  0, 1, 2,
  0, 2, 3,
])
// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
```

## Vector3

Vector3是threejs的三维向量对象,可以通过Vector3对象表示一个顶点的xyz坐标，顶点的法线向量。

```js
var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
```

## Color

通过threejs顶点颜色对象Color可以定义几何体顶点颜色数据，然后顶点颜色数据构成的数组作为几何体Geometry顶点颜色属性geometry.colors的值。

```js
var color1 = new THREE.Color(0x00ff00); //顶点1颜色——绿色
```

注意设置几何体Geometry顶点颜色属性geometry.colors，对网格模型Mesh是无效的，对于点模型Points、线模型Line是有效果。

## .vertexColors

注意使用顶点颜色数据定义模型颜色的时候，要把材质的属性vertexColors设置为THREE.VertexColors,这样顶点的颜色数据才能取代材质颜色属性.color起作用。

```js
//材质对象
var material = new THREE.MeshLambertMaterial({
  // color: 0xffff00,
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  side: THREE.DoubleSide, //两面可见
});
```

## Face3

Face3对象定义Geometry的三角形面

几何体Geometry的三角面属性geometry.faces和缓冲类型几何体BufferGeometry顶点索引属性BufferGeometry.index类似都是顶点位置数据的索引值,用来组织网格模型三角形的绘制。

### 位置数据

Face3 参数是顶点数组的索引

```js
var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
//顶点坐标添加到geometry对象
geometry.vertices.push(p1, p2, p3,p4);
// Face3构造函数创建一个三角面
var face1 = new THREE.Face3(0, 1, 2);
//三角面每个顶点的法向量
var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
var n2 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点2的法向量
var n3 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点3的法向量
// 设置三角面Face1三个顶点的法向量
face1.vertexNormals.push(n1,n2,n3);

// 三角面2
var face2 = new THREE.Face3(0, 2, 3);
// 设置三角面法向量
face2.normal=new THREE.Vector3(0, -1, 0);
geometry.faces.push(face1,face2);

```

threejs提供了Face3对象构建三角形，通过Face3构建一个三角形，不要设置顶点位置坐标数据，只需要通过数组索引值从geometry.vertices数组中获得顶点位置坐标数据。

geometry.vertices数组索引0, 1, 2对应的顶点位置坐标数据表示三角形1的三个顶点坐标，索引0, 2, 3对应的顶点位置坐标数据表示三角形2的三个顶点坐标。

### 法线

设置三角形法线方向向量有两种方式，一种是直接定义三角形面的法线方向，另一个是定义三角形三个顶点的法线方向数据来表示三角形面法线方向。

```js
// 三角面2
var face2 = new THREE.Face3(0, 2, 3);
// 设置三角面法向量
face2.normal=new THREE.Vector3(0, -1, 0);
```

```js
// Face3构造函数创建一个三角面
var face1 = new THREE.Face3(0, 1, 2);
//三角面每个顶点的法向量
var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
var n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
var n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量
// 设置三角面Face3三个顶点的法向量
face1.vertexNormals.push(n1,n2,n3);
```

### 颜色

```js
// 方式1
// 三角形1颜色
face1.color = new THREE.Color(0xffff00);
// 设置三角面face1三个顶点的颜色
face1.color = new THREE.Color(0xff00ff);

// 方式2
face1.vertexColors = [
  new THREE.Color(0xffff00),
  new THREE.Color(0xff00ff),
  new THREE.Color(0x00ffff),
]
```
