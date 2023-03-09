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

## 顶点纹理坐标UV

纹理坐标:一张纹理贴图图像的坐标，选择一张图片，比如以图片左下角为坐标原点，右上角为坐标(1.0,1.0)，图片上所有位置纵横坐标都介于0.0~1.0之间

纹理UV坐标和顶点位置坐标是一一对应关系

几何体有两组UV坐标，第一组组用于.map、.normalMap、.specularMap等贴图的映射，第二组用于阴影贴图.lightMap的映射，
  
## map

颜色贴图

网格模型会获得颜色贴图的颜色值RGB。

## bumpMap

凹凸贴图

表面深浅

## normalMap

法向贴图

表面深浅

## envMap

环境贴图

## specularMap

高光贴图

需要使用 MeshPhongMaterial 材质

## lightMap

光照贴图

产生假阴影. 只能用于静态场景。

## metalnessMap

金属光泽贴图

## roughnessMap

粗糙度贴图

## emissiveMap

自发光贴图

控制模型表面实现自发光效果

只影响自身，不会变成光源

自发光:  emissive

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

## 自定义uv映射

...

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
