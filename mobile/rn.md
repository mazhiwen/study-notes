
<https://juejin.cn/post/6844904009778593800>

# React Native

React Native是怎么组成的，在RN中的每个组件，比如：Text、Button、Image等都有一个相对应的原生组件。所以和很多新接触RN开发者想的不一样，RN并没有编译成原生代码，它做了个JS组件和原生组件的映射。

## bridge原理

```
    json数据      json数据
js  <-->  bridge  <-->  native
```

UIManager：在Native侧，是在iOS/Android里主要运行的线程。只有它有权限可以修改客户端UI。
JS Thread：运行打包好的main.bundle.js文件，这个文件包含了RN的所有业务逻辑、行为和组件。
Shadow Node/Tree：在Native层的一个组件树，可以帮助监听App内的UI变化，有点像ReactJS里的虚拟Dom和Dom之间的关系。
Yoga：用来计算layout。是Facebook写的一个C引擎，用来把基于Flexbox的布局转换到Native的布局系统。

## 优化：Fabric
