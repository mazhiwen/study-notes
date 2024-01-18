# Sprite 精灵模型

继承自Object3D

可以在三维场景中把精灵模型作为一个模型的标签，标签上可以显示一个写模型的信息

通过足够多的精灵模型对象，构建一个粒子系统，来模拟一个下雨、森林、或下雪的场景效果。

## Sprite

创建精灵模型对象Sprite和创建网格模型对象一样需要创建一个材质对象，不同的地方在于创建精灵模型对象不需要创建几何体对象Geometry，精灵模型对象本质上你可以理解为已经内部封装了一个平面矩形几何体PlaneGeometry，矩形精灵模型与矩形网格模型的区别在于精灵模型的矩形平面会始终平行于Canvas画布。

## SpriteMaterial

通过Sprite创建精灵模型不需要几何体，只需要给构造函数Sprite的参数设置为一个精灵材质SpriteMaterial即可。

精灵材质SpriteMaterial的属性除了和网格材质类似的属性和方法外，还有一些自己独特的方法和属性，

- .rotation

## 粒子模拟

基本思路就是通过足够多的精灵模型构成一个粒子系统，然后每一个雨滴按照在一定空间内随机分布，每个精灵模型都使用一个背景透明的雨滴rain.png作为纹理贴图。