# 动画变形

变形：多组顶点数据，从一个状态变化到另一个状态

动画：几何体的顶点的位置坐标发生变化，从一个状态过渡到另一个状态自然就产生了变形动画。

requestAnimationFrame+render或者gsap库控制动效

实际开发中如果需要制作一个复杂三维模型的帧动画，比如一个人走路、跑步等动作，一般情况是美术通过3dmax、blender等软件编辑好，不需要程序员用代码实现。

模型文件 animations 属性存储了模型的动画，我们需要按照 Three 的模式来启动动画帧。

## 变形

```js
const geometry = new THREE.BoxGeometry(50, 50, 50);
const box1 = new THREE.BoxGeometry(100, 5, 100);

geometry.morphAttributes.position = [
  box1.attributes.position,
];

mesh.morphTargetInfluences[1] = Math.abs(Math.sin(t));
```

## KeyframeTrack关键帧

位置、颜色等属性随着时间变化

```js
var times = [0, 10]; //关键帧时间数组，离散的时间点序列
var values = [0, 0, 0, 150, 0, 0]; //与时间点对应的值组成的数组
// 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
var posTrack = new THREE.KeyframeTrack('Box.position', times, values);
//... 其他track定义
```

## AnimationClip剪辑

多个关键帧构成一个剪辑clip对象

```js
// duration决定了默认的播放时间，一般取所有帧动画的最大时间
// duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
var duration = 20;
// 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
var clip = new THREE.AnimationClip("default", duration, [posTrack, colorKF, scaleTrack]);
```

## AnimationAction操作

设置播放方式、开始播放、暂停播放.

动画效果通常由多个动作组成，该组件负责将每个动作进行动画剪辑，每个动画剪辑对应一个动作，该组件来控制动作的开启与暂停等控制功能。

```js
/**
 * 播放编辑好的关键帧数据
 */
// group作为混合器的参数，可以播放group中所有子对象的帧动画
var mixer = new THREE.AnimationMixer(group);
// 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
var AnimationAction = mixer.clipAction(clip);
//通过操作Action设置播放方式
AnimationAction.timeScale = 20;//默认1，可以调节播放速度
// AnimationAction.loop = THREE.LoopOnce; //不循环播放
AnimationAction.play();//开始播放
```

## AnimationMixer 混合器

一个对象及其子对象的动画播放器

Three 场景中的动画对象对需要使用混合器，混合器控制模型的移动，因此后续通过更新混合器来实现动画帧的切换效果。

```js
AnimationMixer( rootObject : Object3D )
//rootObject - 混合器播放的动画所属的对象
```

播放关键帧动画的时候，注意在渲染函数render()中执行mixer.update(渲染间隔时间)告诉帧动画系统Threejs两次渲染的时间间隔，获得时间间隔可以通过Threejs提供的一个时钟类Clock实现。

```js
// 创建一个时钟对象Clock
var clock = new THREE.Clock();
// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧

  //clock.getDelta()方法获得两帧的时间间隔
  // 更新混合器相关的时间
  mixer.update(clock.getDelta());
}
render();

```

## 加载模型动画

tick 方法: 动画剪辑更新 。AnimationAction 只是启动了动画，但动画真正开始播放需要更新渲染循环中的混合器。AnimationMixer 提供了 update 方法，允许根据时间参数来进行更新，通常使用帧——渲染循环更新时进行更新。

```js
// 通过ObjectLoader加载模型文件model.json
var loader = new THREE.ObjectLoader();
var mixer = null; //声明一个混合器变量
// 加载文件返回一个对象obj
loader.load("model.json", function(obj) {
  obj.scale.set(15, 15, 15);//缩放加载的模型
  scene.add(obj);
  // obj作为混合器的参数，可以播放obj包含的帧动画数据
  mixer = new THREE.AnimationMixer(obj);
  // obj.animations[0]：获得剪辑clip对象
  // // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
  var AnimationAction = mixer.clipAction(obj.animations[0]);
  AnimationAction.play();
});
```

```js
// 创建一个时钟对象Clock
var clock = new THREE.Clock();
// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧

  if(mixer!==null){
    //clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    mixer.update(clock.getDelta());
  }
}
render();

```
