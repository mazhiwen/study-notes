# 纹理贴图

格式：基本图片，立方体纹理, hdr等二进制图，块类的纹理文件

- 凹凸贴图

bumpMap 表面深浅

- 法向贴图

normalMap 表面深浅

- 移位贴图

displacementMap 真正改变模型的形状

- 环境光遮挡贴图

aoMap

静止物体的光照阴影

- 光照贴图

lightMap: 产生假阴影. 只能用于静态场景。

- 金属光泽贴图 和 粗糙度贴图

金属光泽贴图: metalnessMap

粗糙度贴图: roughnessMap

- Alpha贴图

制定表面部分为透明,纯黑色透明，纯白色不透明

alphaMap

- 自发光贴图

控制模型表面实现自发光效果

只影响自身，不会变成光源

自发光: emissiveMap emissive

- 高光贴图

需要使用 MeshPhongMaterial 材质

specularMap

- 环境贴图

cpu真实计算光线反射消耗很大

创建一个对象所处环境纹理来伪装镜面反射。

- cubeMap天空盒纹理

天空盒纹理，设置为场景背景

可以资源网站下载:全景图片, 球形等距圆柱投影图

- 自定义uv映射

...

## TextureLoader 纹理加载器

- CubeTextureLoader

立方体纹理加载器(天空盒)

- DataTextureLoader

hdr 等二进制文件加载器

下面几个loader好像都和hdr有关

```
- EXRLoader
- LogLuvLoader
- RGBELoader： hdr文件
- RGBMLoader
- TGALoader
```

- CompressedTextureLoader

基于块的纹理加载器

```
dds： 微软Direct3d纹理
pvr
```

基于块的纹理加载器 (dds, pvr, ...)的抽象类。
