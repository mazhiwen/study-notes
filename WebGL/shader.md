# shader着色器

[THREE shader实现高性能的动画（一）— 重复贴图箭头动画](https://juejin.cn/post/6844904014845313038)

[Three.js粒子特效，shader渲染初探](https://juejin.cn/post/6844903615438553096#heading-19)

## 概念

GPU流水线上一些可以高度编程的阶段，是GPU上运行的代码。

将所有粒子的状态全部维护在js代码中进行计算，属于CPU渲染。

将粒子的状态信息维护在shader(着色器)代码中进行计算，属于GPU渲染。

当我们只需简单改变各个粒子的位置时，使用CPU渲染性能ok也易于理解，倘若同时对所有粒子进行多状态的变化，使用GPU渲染会更加流畅。

常用的着色器分为顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）。

## 顶点着色器

每个顶点都调用一次的程序，在这之中能够访问到顶点的位置、颜色、法向量等信息，对他们进行适当的计算能实现特定的渲染效果，也可以将这些值传递到片元着色器中。

```html
<!-- 顶点着色器-->
<script type="x-shader/x-vertex" id="vertexshader">
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
</script>
```

vertex shader中必须指定gl_Position的值，因为顶点着色器的最重要的任务就是计算出顶点的在屏幕上的真实位置，没有计算该值就相当于该顶点着色器无效了。

`变换后的坐标 = 视口矩阵 * 投影矩阵 * 视图矩阵 * 模型矩阵 * 模型点坐标向量`

projectionMatrix：投影矩阵

modelViewMatrix： 由于矩阵乘法比较耗时，而视图矩阵和模型矩阵又通常不变，所以根据矩阵结合律，可以先将它们的乘积 先计算并缓存下来，这便是modelViewMatrix，

而模型点坐标从原本的三维向量（position）被扩展到了四维向量（vec4(position, 1.0)），是因为其他的矩阵其实是4*4的，不将点坐标扩展到四维便无法相乘；

## 片元着色器

每个片元都调用一次的程序，在这之中，可以访问到片元在二维屏幕上的坐标、深度信息、颜色等信息。通过改变这些值，可以实现特定的渲染效果。

```html
<script type="x-shader/x-fragment" id="fragmentshader">
    uniform vec3 color;
    void main() {
        gl_FragColor = vec4(color, 1.0);
    }
</script>
```

片元着色器的终极任务就是计算顶点颜色，所以在该段程序里必须给出gl_FragColor的值，

它同位置坐标一样，也是一个四维向量，前三维可以理解为rbg的色值，只不过范围在（0.0，1.0），第四维代表颜色透明度。

一般顶点的初始颜色可由CPU通过uniform传入，再经过自己一顿花里胡哨的计算之后给到gl_FragColor。

## 变量

shader程序是一种类C语言，void main(){}是程序的入口，在这之前需声明需使用到的传递来的变量，例如uniform vec3 color;，分别代表变量传递类型 变量类型 变量名；

- 变量传递类型

有三种

- attribute

用来接受CPU传递过来的顶点数据，一般用来接收从js代码中传递来的顶点坐标，法线，纹理坐标，顶点颜色等信息，attribute 只能在顶点着色器中被声明与使用。

ShaderMaterial对应的geomotry添加的attribute，可以传到着色器

- uniform

可以在顶点着色器和片元着色器中共享使用，且声明方式相同，一般用来声明变换矩阵，材质，光照参数和颜色等信息。

THREE.ShaderMaterial 传递对象中的uniform属性，可以传到着色器

- varying

它是vertex和fragment shader之间做数据传递用的。一般vertex shader修改varying变量的值，然后fragment shader使用该varying变量的值。因此varying变量在vertex和fragment shader二者之间的声明必须是一致的。

- 变量类型

变量类型有以下几种：

```
void：和C语言的void一样，无类型。
bool：布尔类型。
int：有符号整数。
float 浮点数。
vec2, vec3, vec4： 2，3，4维向量，也可以理解为2，3，4长度的数组。
bvec2, bvec3, bvec4：2，3，4维的布尔值的向量。
ivec2, ivec3, ivec4： 2，3，4维的int值的向量。
mat2, mat3, mat4： 2x2, 3x3, 4x4的浮点数矩阵。
sampler2D：纹理。
samplerCube：Cube纹理。
```

由于是类C语言，不像js那样会对变量类型进行自动隐式转换，所以变量在使用前需严格声明，而且在数字运算时，相同类型的数字才能进行加减乘除，例如1 + 1.0会报错。

- 变量精度

用它们在变量类型前做修饰（例如varying highp float my_number）

```
highp：16bit，浮点数范围(-2^62, 2^62)，整数范围(-2^16, 2^16)
mediump：10bit，浮点数范围(-2^14, 2^14)，整数范围(-2^10, 2^10)
lowp：8bit，浮点数范围(-2, 2)，整数范围(-2^8, 2^8)
```

如果想设置所有的float都是高精度的，可以在Shader顶部声明precision highp float;，这样就不需要为每一个变量声明精度了。

## shader内置变量

gl_Position：用于vertex shader, 写顶点位置；被图元收集、裁剪等固定操作功能所使用；其内部声明是：highp vec4 gl_Position;

gl_PointSize：用于vertex shader, 写光栅化后的点大小，像素个数；其内部声明是：mediump float gl_Position;

gl_FragColor：用于Fragment shader，写fragment color；被后续的固定管线使用；mediump vec4 gl_FragColor;

gl_FragData：用于Fragment shader，是个数组，写gl_FragData[n] 为data n；被后续的固定管线使用；mediump vec4 gl_FragData[gl_MaxDrawBuffers];

gl_FragColor和gl_FragData是互斥的，不会同时写入；

gl_FragCoord: 用于Fragment shader，只读，Fragment相对于窗口的坐标位置 x,y,z,1/w; 这个是固定管线图元差值后产生的；z 是深度值；mediump vec4 gl_FragCoord;

gl_FrontFacing: 用于判断 fragment是否属于 front-facing primitive，只读；bool gl_FrontFacing;

gl_PointCoord：仅用于 point primitive， mediump vec2 gl_PointCoord;

## shader内置函数

## 粒子效果
