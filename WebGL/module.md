# 物体

## Object3D 基类

- .position

表示对象局部位置的Vector3。默认值为(0, 0, 0)。

- .castShadow

.castShadow属性值是布尔值，默认false，用来设置一个模型对象是否在光照下产生投影效果。

- .receiveShadow

.receiveShadow属性值是布尔值，默认false，用来设置一个模型对象是否在光照下接受其它模型的投影效果。具体查看threejs文档Object3D

- .rotation : Euler

物体的局部旋转，以弧度来表示。（请参阅Euler angles-欧拉角）

- .scale : Vector3

物体的局部缩放。默认值是Vector3( 1, 1, 1 )。

- .visible : Boolean

可见性。这个值为true时，物体将被渲染。默认值为true。

- add()

## Points

一个用于显示点的类

对于点模型Points而言，几何体的每个顶点对应位置都会渲染出来一个方形的点区域，该区域可以设置大小。

## Line

线

## Mesh

网格模型，面
