# Three.js

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

## 控制动效

requestAnimationFrame+render

或者

gsap库

## 模型动画

模型文件 animations 属性存储了模型的动画，我们需要按照 Three 的模式来启动动画帧。

- AnimationMixer: 混合器

Three 场景中的动画对象对需要使用混合器，混合器控制模型的移动，因此后续通过更新混合器来实现动画帧的切换效果。

- AnimationAction: 动画的控制模块。

动画效果通常由多个动作组成，该组件负责将每个动作进行动画剪辑，每个动画剪辑对应一个动作，该组件来控制动作的开启与暂停等控制功能。

- tick 方法: 动画剪辑更新

AnimationAction 只是启动了动画，但动画真正开始播放需要更新渲染循环中的混合器。AnimationMixer 提供了 update 方法，允许根据时间参数来进行更新，通常使用帧——渲染循环更新时进行更新。

```js
// 在 setupModel 中实现上述逻辑
function setupModel(data) {
  const model = data.scene.children[0];
  // 获取到动画
  const clip = data.animations[0];
  // 声明混合器
  const mixer = new AnimationMixer(model);
  // 将动画按照动作进行动画剪辑
  const action = mixer.clipAction(clip);
  action.play();
  // 更新混合器
  model.tick = (delta) => mixer.update(delta);
  return model;
}
```

```js
// 鸟类模型的总数组
birds = [];

// 获取模型后，放置到 birds 中
const { parrot, flamingo, stork } = await loadBirds();
birds.push(parrot, flamingo, stork);

// 修改渲染循环逻辑，每一帧更新混合器
// 帧时间参数通过 Three 提供的 Clock 来获取
const clock = new Clock();
const render = () => {
  renderer.render(scene, camera);
  // 获取时间参数
  const delta = clock.getDelta();
  // 每一帧更新时更新混合器
  birds.forEach((bird) => {
    bird.tick(delta);
  });
  controls && controls.update();
  requestAnimationFrame(render);
};
```

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

render
透明 ，深度
时区，长方体交集，优化
shader
动画
