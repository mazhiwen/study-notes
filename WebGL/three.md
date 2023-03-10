# Three.js

[使用 Threejs 和 D3 可视化全球新冠疫情](https://juejin.cn/post/6955717062979715079)

[北京到上海，Three.js 旅行轨迹的可视化](https://juejin.cn/post/7041580850261000222)

[three.js实现球体地球2018年全球gdp前十国家标记](https://juejin.cn/post/6844903928916606983)

[【钢铁侠劲舞团】通过钢铁侠的案例来深入 3D 模型使用](https://juejin.cn/post/7171803353310035999)

[Three.js 之 12 Particles 粒子效果](https://juejin.cn/post/7113540626347458591/#heading-12)

[一文带你悟道 Threejs 3D模型开发](https://juejin.cn/post/7170868138068672548)

[Three.js 进阶之旅：模型光源结合生成明暗变化的创意页面-光与影之诗 💡](https://juejin.cn/post/7148969678642102286#heading-27)

[从零开始初尝Three.js【大量案例、简单入手】](https://juejin.cn/post/6844904177345232903)

[Three.js教程 api](http://www.webgl3d.cn/Three.js/?_blank)

[Three.js git hub](https://github.com/mrdoob/three.js/?_blank)

[Three.js官网](https://threejs.org/?_blank)

[Three.js中文文档](http://www.yanhuangxueyuan.com/threejs/docs/index.html?_blank)

## 3D模型

加载类型：GLTF OBJ

建模软件:

模型网站：

```
[sketchfab](https://www.sketchfab.com/)
[cgmodel](https://www.cgmodel.com/)
[free3D](https://free3d.com/)
等等
```

模型中有两个重要的概念: 几何体和材质

## 场景scene

scene也继承自 Object3D 类，也有其方法等。

可以在scene中添加自己创建的scene。

## Object3D

上面讲到 Object3D 时 Three 中大多数对象的基类，基类作为基石一般的存在，最好不要在代码中反复出现，因此 Three 官方提出了 Group 的概念，来增加层级结构之间的清晰性及逻辑性，Group 本质上与 Object3D 是完全相同的，因此更推荐使用 Group 对象来创建新的场景(局部空间)。

## 属性缓冲区对象BufferAttribute

Threejs提供的接口BufferAttribute目的是为了创建各种各样顶点数据，比如顶点颜色数据，顶点位置数据，然后作为几何体BufferGeometry的顶点位置坐标属性BufferGeometry.attributes.position、顶点颜色属性BufferGeometry.attributes.color的值。

缓冲类型几何体BufferGeometry除了顶点位置、顶点颜色属性之外还有其他顶点属性，后面课程都会讲解到。关于BufferGeometry更多属性和方法可以查看文档BufferGeometry。

颜色值是 rgb，范围从0-1

## 阴影

1. 设置模型 castShadow receiveShadow.
2. 设置光源的阴影属性

## CSS2DRender

CSS2DObject

## 旋转 缩放 平移

```js
// 几何体xyz三个方向都放大2倍
geometry.scale(2, 2, 2);
// 几何体沿着x轴平移50
geometry.translate(50, 0, 0);
// 几何体绕着x轴旋转45度
geometry.rotateX(Math.PI / 4);
// 居中：偏移的几何体居中
geometry.center();
```

- .scale()

- .translate()

- .rotateX()

BufferGeometry和几何体Geometry 一样, 本质上都是改变结合体顶点位置坐标数据

注意网格模型Mesh进行缩放旋转平移变换和几何体Geometry可以实现相同的渲染效果，但是网格模型Mesh进行这些变换不会影响几何体的顶点位置坐标，网格模型缩放旋转平移变换改变的是模型的本地矩阵、世界矩阵。

## 地球

[three.js实现球体地球2018年全球gdp前十国家标记](https://juejin.cn/post/6844903928916606983)

墨卡托转换直接使用了 d3 的内置函数

```js
// 经纬度转成球体坐标
  function convertLatLngToSphereCoords(latitude, longitude, radius) {
    const phi = (latitude * Math.PI) / 180;
    const theta = ((longitude - 180) * Math.PI) / 180;
    const x = -(radius + -1) * Math.cos(phi) * Math.cos(theta);
    const y = (radius + -1) * Math.sin(phi);
    const z = (radius + -1) * Math.cos(phi) * Math.sin(theta);
    return {
      x,
      y,
      z,
    };
  }
```

## 例子

星空： <https://codepen.io/nikita_ska/pen/bqNdBj>

===

材质
纹理贴图
粒子效果
shader
动画变形  
优化性能，

cda=》模型数据，不模型，
着色器 纹理
canvas，svg
