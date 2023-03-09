# 几何体

## Geometry

基类

- .vertices

顶点

- .colors

颜色

- .faces

三角形

## BufferGeometry

自定义几何体

Threejs 中几何体的基类是 BufferGeometry，而 BufferGeometry 是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销。

- BufferAttribute

( array : TypedArray, itemSize : Integer, normalized : Boolean )：

顶点索引，位置，颜色，法向量

这个类用于存储与BufferGeometry相关联的 attribute。数据被存储为任意长度的矢量（通过itemSize进行定义），下列函数如无特别说明， 函数参数中的index会自动乘以矢量长度进行计算。itemSize个数据组成一个点

- .attributes

顶点位置，颜色，法向量，纹理贴图UV坐标，光照贴图lightMapUV2坐标

通过 hashmap 存储该几何体相关的属性，hashmap 的 id 是当前 attribute 的名称，值是相应的 buffer。 你可以通过 .setAttribute 和 .getAttribute 添加和访问与当前几何体有关的 attribute。

```js

const geometry = new THREE.BufferGeometry();
geometry.attributes.position = new THREE.BufferAttribute(
  new Float32Array([
    0, 0, 0, // 顶点1坐标
    50, 0, 0, // 顶点2坐标
    0, 100, 0, // 顶点3坐标
    0, 0, 10, // 顶点4坐标
    0, 0, 100, // 顶点5坐标
    50, 0, 10, // 顶点6坐标
  ]),
  3,
);
```

## BoxGeometry

立方体

## SphereGeometry

球体

## CylinderGeometry

## OctahedronGeometry

## DodecahedronGeometry

## DodecahedronGeometry
