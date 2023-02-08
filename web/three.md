# Three.js

[从零开始初尝Three.js【大量案例、简单入手】](https://juejin.cn/post/6844904177345232903)

[Three.js教程 api](http://www.webgl3d.cn/Three.js/?_blank)

[Three.js git hub](https://github.com/mrdoob/three.js/?_blank)

[Three.js官网](https://threejs.org/?_blank)

[Three.js中文文档](http://www.yanhuangxueyuan.com/threejs/docs/index.html?_blank)

[three.js](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene)

## 加载模型

GLTF OBJ

## 阴影

1. 设置模型 castShadow receiveShadow.
2. 设置光源的阴影属性

## 纹理贴图

格式：基本图片，立方体纹理, hdr等二进制图，块类的纹理文件

### 凹凸贴图

bumpMap 表面深浅

### 法向贴图

normalMap 表面深浅

### 移位贴图

displacementMap 真正改变模型的形状

### 环境光遮挡贴图

aoMap

静止物体的光照阴影

### 光照贴图

lightMap: 产生假阴影. 只能用于静态场景。

### 金属光泽贴图 和 粗糙度贴图

金属光泽贴图: metalnessMap

粗糙度贴图: roughnessMap

### Alpha贴图

制定表面部分为透明,纯黑色透明，纯白色不透明

alphaMap

### 自发光贴图

控制模型表面实现自发光效果

只影响自身，不会变成光源

自发光: emissiveMap emissive

### 高光贴图

需要使用 MeshPhongMaterial 材质

specularMap

### 环境贴图

cpu真实计算光线反射消耗很大

创建一个对象所处环境纹理来伪装镜面反射。

### cubeMap天空盒纹理

天空盒纹理，设置为场景背景

可以资源网站下载:全景图片, 球形等距圆柱投影图

## 纹理的其他用法

### 自定义uv映射

...

## TextureLoader 纹理加载器

### CubeTextureLoader

立方体纹理加载器(天空盒)

### DataTextureLoader

hdr 等二进制文件加载器

下面几个loader好像都和hdr有关

```
- EXRLoader
- LogLuvLoader
- RGBELoader： hdr文件
- RGBMLoader
- TGALoader
```

### CompressedTextureLoader

基于块的纹理加载器

```
dds： 微软Direct3d纹理
pvr
```

基于块的纹理加载器 (dds, pvr, ...)的抽象类。

## 材质

## sprite

## CSS2DRender

CSS2DObject

## 例子

星空： <https://codepen.io/nikita_ska/pen/bqNdBj>
