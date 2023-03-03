# 动画变形

变形：多组顶点数据，从一个状态变化到另一个状态

动画：几何体的顶点的位置坐标发生变化，从一个状态过渡到另一个状态自然就产生了变形动画。

## 变形

```js
const geometry = new THREE.BoxGeometry(50, 50, 50);
const box1 = new THREE.BoxGeometry(100, 5, 100);

geometry.morphAttributes.position = [
  box1.attributes.position,
];

mesh.morphTargetInfluences[1] = Math.abs(Math.sin(t));
```

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
