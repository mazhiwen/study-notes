# 几何体

- BufferGeometry

自定义几何体

Threejs 中几何体的基类是 BufferGeometry，而 BufferGeometry 是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销。

BufferAttribute( array : TypedArray, itemSize : Integer, normalized : Boolean )：这个类用于存储与BufferGeometry相关联的 attribute。数据被存储为任意长度的矢量（通过itemSize进行定义），下列函数如无特别说明， 函数参数中的index会自动乘以矢量长度进行计算。itemSize个数据组成一个点

- BoxGeometry

- SphereGeometry

- CylinderGeometry

- OctahedronGeometry

- DodecahedronGeometry

- DodecahedronGeometry
