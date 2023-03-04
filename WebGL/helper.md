# 辅助

## 坐标轴

红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.

```js
scene.add(new THREE.AxesHelper(100));
```

## control

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const controls = new OrbitControls(camera, renderer.domElement);
```
