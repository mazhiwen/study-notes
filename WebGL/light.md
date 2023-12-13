# 光

## Light 基类

继承Object3D

- .castShadow

如果属性设置为 true， 光源将投射动态阴影. 警告: 这需要很多计算资源，需要调整以使阴影看起来正确. 更多细节，查看DirectionalLightShadow. 默认值false.

- .shadow

平行光DirectionalLight的.shadow属性值是平行光阴影对象DirectionalLightShadow，聚光源SpotLight的.shadow属性值是聚光源阴影对象SpotLightShadow。关于DirectionalLightShadow和SpotLightShadow两个类的具体介绍可以参考Three.js文档Lights / Shadows分类，

- .color

光源颜色属性

- intensity

强度系数属性.

## DirectionalLight 平行光

计算平行光照射方向的时候，会通过自身位置属性.position和.target表示的物体的位置属性.position计算出来。

```js
// 平行光
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50);
// 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
directionalLight.target = mesh2;
```

平行光如果不设置.position和.target属性，光线默认从上往下照射，也就是可以认为(0,1,0)和(0,0,0)两个坐标确定的光线方向。

## PointLight 点光源

和环境光不同，环境光不需要设置光源位置，而点光源需要设置位置属性.position，光源位置不同，物体表面被照亮的面不同，远近不同因为衰减明暗程度不同。

## AmbientLight: 环境光

环境光是没有特定方向的光源，主要是均匀整体改变Threejs物体表面的明暗效果，这一点和具有方向的光源不同，比如点光源可以让物体表面不同区域明暗程度不同。

## SpotLight 聚光源

聚光源可以认为是一个沿着特定方会逐渐发散的光源，照射范围在三维空间中构成一个圆锥体。通过属性.angle可以设置聚光源发散角度，聚光源照射方向设置和平行光光源一样是通过位置.position和目标.target两个属性来实现。

```js
// 聚光光源
var spotLight = new THREE.SpotLight(0xffffff);
// 设置聚光光源位置
spotLight.position.set(200, 200, 200);
// 聚光灯光源指向网格模型mesh2
spotLight.target = mesh2;
// 设置聚光光源发散角度
spotLight.angle = Math.PI / 6
```

## HemisphereLight: 半球光

## 阴影

```js
planeMesh.receiveShadow = true;
//
// 设置用于计算阴影的光源对象
directionalLight.castShadow = true;
// 设置计算阴影的区域，最好刚好紧密包围在对象周围
// 计算阴影的区域过大：模糊  过小：看不到或显示不完整
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 300;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -100;
// 设置mapSize属性可以使阴影更清晰，不那么模糊
// directionalLight.shadow.mapSize.set(1024,1024)

```

## LightShadow 阴影对象基类

平行光阴影对象DirectionalLightShadow和聚光源阴影对象SpotLightShadow两个类的基类是LightShadow

- camera

观察光源的相机对象. 从光的角度来看，以相机对象的观察位置和方向来判断，其他物体背后的物体将处于阴影中。

- mapSize

定义阴影纹理贴图宽高尺寸的一个二维向量Vector2.

- map
