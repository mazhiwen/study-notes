# 纹理贴图

图片宽高最好是2的次方

## Texture

格式：基本图片，立方体纹理, hdr等二进制图，块类的纹理文件

赋值给Material生效

```js
// 纹理贴图映射到一个矩形平面上
var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
var textureLoader = new THREE.TextureLoader();
// 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
textureLoader.load('Earth.png', function(texture) {
  var material = new THREE.MeshLambertMaterial({
    // color: 0x0000ff,
    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//设置颜色贴图属性值
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中

  //纹理贴图加载成功后，调用渲染函数执行渲染操作
  // render();
})
```

- .needsUpdate

## 顶点纹理坐标UV

纹理坐标:一张纹理贴图图像的坐标，选择一张图片，比如以图片左下角为坐标原点，右上角为坐标(1.0,1.0)，图片上所有位置纵横坐标都介于0.0~1.0之间

纹理UV坐标和顶点位置坐标是一一对应关系

几何体有两组UV坐标，第一组组用于.map、.normalMap、.specularMap等贴图的映射，第二组用于阴影贴图.lightMap的映射，

## 纹理贴图阵列映射

```js
// 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(4, 2);
```

## 纹理偏移

```js
// 不设置重复  偏移范围-1~1
texture.offset = new THREE.Vector2(0.3, 0.1)
```

## 纹理旋转

```js
// 设置纹理旋转角度
texture.rotation = Math.PI/4;
// 设置纹理的旋转中心，默认(0,0)
texture.center.set(0.5,0.5);
```

## 纹理动画

纹理动画比较简单，必须要在渲染函数中render()一直执行texture.offset.x -= 0.06动态改变纹理对象Texture的偏移属性.offset就可以。

## Canvas作为纹理贴图

CanvasTexture

```js
// canvas画布对象作为CanvasTexture的参数重建一个纹理对象
// canvas画布可以理解为一张图片
var texture = new THREE.CanvasTexture(canvas);
//打印纹理对象的image属性
// console.log(texture.image);
//矩形平面
var material = new THREE.MeshPhongMaterial({
  map: texture, // 设置纹理贴图
});
```

## 视频作为纹理贴图

VideoTexture

```js
// 创建video对象
let video = document.createElement('video');
video.src = "1086x716.mp4"; // 设置视频地址
video.autoplay = "autoplay"; //要设置播放
// video对象作为VideoTexture参数创建纹理对象
var texture = new THREE.VideoTexture(video)
var material = new THREE.MeshPhongMaterial({
  map: texture, // 设置纹理贴图
}); //材质对象Material
```

## map颜色贴图

网格模型会获得颜色贴图的颜色值RGB。

## bumpMap凹凸贴图

凹凸贴图和法线贴图功能相似，只是没有法线贴图表达的几何体表面信息更丰富。凹凸贴图是用图片像素的灰度值表示几何表面的高低深度，如果模型定义了法线贴图，就没有必要在使用凹凸贴图。

## normalMap法向贴图

把不需要真实3D的作为贴图展示看起来像3D，复杂的三维模型3D美术可以通过减面操作把精模简化为简模，然后把精模表面的复杂几何信息映射到法线贴图.normalMap上。

比如地球纹理，设置发现贴图可以看起来表面深浅凹凸，不设置就平

## envMap环境贴图

目的是为了渲染该立方体而不是立方体周围环境，为了更方便所以没必要创建立方体周边环境所有物体的网格模型，可以通过图片来表达立方体周边的环境。

比如 CubeTexture

高光网格材质MeshPhongMaterial和物理PBR材质MeshStandardMaterial通常会使用环境贴图.envMap来实现更好的渲染效果。

## specularMap高光贴图

需要使用 MeshPhongMaterial 材质

高光网格材质MeshPhongMaterial具有高光属性.specular,如果一个网格模型Mesh都是相同的材质并且表面粗糙度相同,或者说网格模型外表面所有不同区域的镜面反射能力相同，可以直接设置材质的高光属性.specular。

如果一个网格模型表示一个人，那么人的不同部位高光程度是不同的，不可能直接通过.specular属性来描述，在这种情况通过高光贴图.specularMap的RGB值来描述不同区域镜面反射的能力，.specularMap和颜色贴图.Map一样和通过UV坐标映射到模型表面。高光贴图.specularMap不同区域像素值不同，表示网格模型不同区域的高光值不同。

## lightMap光照贴图

产生假阴影. 只能用于静态场景。

实际模型的阴影是通过实时计算得到的，而光照贴图·lightMap是3D美术渲染好提供给程序员。这两种方式相比较通过贴图的方式更为节约资源，提高渲染性功能。

## metalnessMap金属光泽贴图

## roughnessMap粗糙度贴图

## emissiveMap自发光贴图

控制模型表面实现自发光效果

只影响自身，不会变成光源

自发光:  emissive

## DataTexture数据纹理

用数据作为纹理贴图

```js
var texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
var material = new THREE.MeshPhongMaterial({
  map: texture, // 设置纹理贴图
}); //材质对象Material
```

## 移位贴图

displacementMap 真正改变模型的形状

## 环境光遮挡贴图

aoMap

静止物体的光照阴影

## Alpha贴图

制定表面部分为透明,纯黑色透明，纯白色不透明

alphaMap

## 环境贴图

cpu真实计算光线反射消耗很大

创建一个对象所处环境纹理来伪装镜面反射。

## cubeMap天空盒纹理

天空盒纹理，设置为场景背景

可以资源网站下载:全景图片, 球形等距圆柱投影图

***

## TextureLoader

纹理加载器

异步加载

加载后调用render方法，或者一直循环渲染

## CubeTextureLoader

立方体纹理加载器(天空盒)

## DataTextureLoader

hdr 等二进制文件加载器

下面几个loader好像都和hdr有关

```
- EXRLoader
- LogLuvLoader
- RGBELoader： hdr文件
- RGBMLoader
- TGALoader
```

## CompressedTextureLoader

基于块的纹理加载器

```
dds： 微软Direct3d纹理
pvr
```

基于块的纹理加载器 (dds, pvr, ...)的抽象类。
