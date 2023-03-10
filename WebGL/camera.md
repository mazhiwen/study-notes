# 相机camera

## 正交相机OrthographicCamera

```js
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
```

OrthographicCamera( left, right, top, bottom, near, far )

```
left 渲染空间的左边界
right 渲染空间的右边界
top 渲染空间的上边界
bottom 渲染空间的下边界
near near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 默认值0.1
far far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小小，会有部分场景看不到。 默认值1000
```

三维场景中坐标值不在三维空间中(摄像头)的网格模型不会被渲染出来，会被剪裁掉

构造函数OrthographicCamera的参数( left,right,top,bottom,near,far)本质上是对WebGL投影矩阵的封装，宽度width、高度height越大，三维模型顶点的位置坐标就会越大，超出可视区域的网格模型就会被剪裁掉， 不会再显示在屏幕上，大家还可以看到参数left与right、参数top与bottom互为相反数，这样做的目的是lookAt指向的对象能够显示在canvas画布的中间位置。

## 透视相机PerspectiveCamera

fov: 表示相机的角度范围，类似于人的视角。
aspect: 表示渲染窗口的长宽比
near/far: near/far 分别代表摄像机的近剪切面和远剪切面，相机只能渲染出 near 和 far 之间的场景

```js
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
/**透视投影相机对象*/
var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
```

PerspectiveCamera( fov, aspect, near, far )

```
fov fov表示视场，所谓视场就是能够看到的角度范围，人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度 45

aspect aspect表示渲染窗口的长宽比，如果一个网页上只有一个全屏的canvas画布且画布上只有一个窗口，那么aspect的值就是网页窗口客户区的宽高比 window.innerWidth/window.innerHeight

near near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 0.1

far far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小，会有部分场景看不到 1000
```

## 窗口变化自适应渲染
