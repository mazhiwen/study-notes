# 材质

## 数组材质

数组材质就是多个材质对象构成一个数组作为模型对象的材质。

```js
// 设置材质数组
var materialArr = [material_2, material_1, material_1, material_1, material_1, material_1];

// 设置数组材质对象作为网格模型材质参数
var mesh = new THREE.Mesh(geometry, materialArr);
```

## Material

材质的抽象基类。

- .transparent : Boolean

定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。
设置为true时，通过设置材质的opacity属性来控制材质透明的程度。
默认值为false。

- .alphaTest

设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。

- .depthTest

是否在渲染此材质时启用深度测试。默认为 true。

- .depthWrite

渲染此材质是否对深度缓冲区有任何影响。默认为true。

在绘制2D叠加时，将多个事物分层在一起而不创建z-index时，禁用深度写入会很有用。

- .blending

在使用此材质显示对象时要使用何种混合。

- .side : Integer

定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide和THREE.DoubleSide。

- .needsUpdate

指定需要重新编译材质。

## PointsMaterial 点材质

点材质

它不会创建几何体而是创建非常多的点 Points。

- .alphaMap : Texture

alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。 默认值为null。

- .size : Number

设置点的大小。默认值为1.0。

点材质PointsMaterial的.size属性可以每个顶点渲染的方形区域尺寸像素大小。

## LineBasicMaterial 线基础材质

一种用于绘制线框样式几何体的材质。

通常使用Line等线模型才会用到线材质。

## LineDashedMaterial 虚线材质

```js
var material = new THREE.LineDashedMaterial({
  color: 0x0000ff,
  dashSize: 10,//显示线段的大小。默认为3。
  gapSize: 5,//间隙的大小。默认为1
});
```

## MeshBasicMaterial 网格基础材质

基础网格材质

不受带有方向光源影响 没有棱角感。

## MeshLambertMaterial 网格Lambert材质

漫反射。有了光照计算，物体表面分界的位置才会产生棱角感。

## MeshPhongMaterial 网格Phong材质

漫反射

高亮表面（镜面反射）

```js
var material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  specular:0x444444,//高光部分的颜色
  shininess:20,//高光部分的亮度，默认30
});
```

## MeshStandardMaterial PBR物理

PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果

## MeshPhysicalMaterial PBR材质

## MeshDepthMaterial 网格深度材质

## MeshNormalMaterial 网格法向量材质

## SpriteMaterial 精灵Sprite材质

## RawShaderMaterial自定义着色器材质

## ShaderMaterial自定义着色器材质
