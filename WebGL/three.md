# Three.js

[Three.js 之 12 Particles 粒子效果](https://juejin.cn/post/7113540626347458591/#heading-12)

[一文带你悟道 Threejs 3D模型开发](https://juejin.cn/post/7170868138068672548)

[Three.js 进阶之旅：模型光源结合生成明暗变化的创意页面-光与影之诗 💡](https://juejin.cn/post/7148969678642102286#heading-27)

[从零开始初尝Three.js【大量案例、简单入手】](https://juejin.cn/post/6844904177345232903)

[Three.js教程 api](http://www.webgl3d.cn/Three.js/?_blank)

[Three.js git hub](https://github.com/mrdoob/three.js/?_blank)

[Three.js官网](https://threejs.org/?_blank)

[Three.js中文文档](http://www.yanhuangxueyuan.com/threejs/docs/index.html?_blank)

[three.js](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene)

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

## 相机camera

Threejs 提供了两类相机: 透视相机和正交相机

```
透视相机：
fov: 表示相机的角度范围，类似于人的视角。
aspect: 表示渲染窗口的长宽比
near/far: near/far 分别代表摄像机的近剪切面和远剪切面，相机只能渲染出 near 和 far 之间的场景
```

## 轨道控制器

## 阴影

1. 设置模型 castShadow receiveShadow.
2. 设置光源的阴影属性

## 模型

- Mesh

网格模型对象

- Points

点模型

## sprite

## 光

DirectionalLight: 直射光

AmbientLight: 环境光

HemisphereLight: 半球光

## CSS2DRender

CSS2DObject

## AxesHelper

坐标轴辅助线

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
