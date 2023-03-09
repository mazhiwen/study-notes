# 材质

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

## MeshBasicMaterial

基础网格材质，不受光照影响的材质

## MeshLambertMaterial

Lambert网格材质，与光照有反应，漫反射

## MeshPhongMaterial

高光Phong材质,与光照有反应

## MeshStandardMaterial

PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果

## PointsMaterial

点材质

它不会创建几何体而是创建非常多的点 Points。

- .alphaMap : Texture

alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。 默认值为null。

- .size : Number

设置点的大小。默认值为1.0。

## LineBasicMaterial

基础线条材质

一种用于绘制线框样式几何体的材质。
