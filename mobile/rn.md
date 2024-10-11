
<https://juejin.cn/post/6844904009778593800>

# React Native

React Native是怎么组成的，在RN中的每个组件，比如：Text、Button、Image等都有一个相对应的原生组件。所以和很多新接触RN开发者想的不一样，RN并没有编译成原生代码，它做了个JS组件和原生组件的映射。


中文官网: reactnative.cn


## bridge原理

```
    json数据      json数据
js  <-->  bridge  <-->  native
```

UIManager：在Native侧，是在iOS/Android里主要运行的线程。只有它有权限可以修改客户端UI。
JS Thread：运行打包好的main.bundle.js文件，这个文件包含了RN的所有业务逻辑、行为和组件。
Shadow Node/Tree：在Native层的一个组件树，可以帮助监听App内的UI变化，有点像ReactJS里的虚拟Dom和Dom之间的关系。
Yoga：用来计算layout。是Facebook写的一个C引擎，用来把基于Flexbox的布局转换到Native的布局系统。

## ReactNative / weex /  Flutter

这3个都是混合开发。

ReactNative：react。涉及底层的时候，需要原生解决。

weex: vue

Flutter: Dart

## 开发环境

js环境 ：node yarn react-native-cli

android环境：javaJDK, AndroidStudio, AndroidSDK，配置环境变量

ios环境：需要mac系统,watchman , xcode, cocoapods

## 创建项目

react-native 命令创建

开发工具: 可以用vscode编码，配合插件

## 调试

1. 模拟器

打开浏览器debug代码



2. 真机

usb调试模式

## 基本语法

react jsx


## stylesheet

1. RN与css的区别

RN没继承性,样式名小驼峰，尺寸没单位,有特殊样式名

2. 声明

```js
< style={{}}>

< style={[{},{}]}>


import { StyleSheet } from 'react-native'

const styles = StyleSheet.create
```


## Flexbox




容器，item，主轴(纵)，交叉轴（横）

主轴交叉轴与web相反

主轴方向: flexDirection: column row 

项目在主轴上的对齐方向: justifyContent

项目在交叉轴上的对齐方向: alignItems

项目在主轴上的尺寸比例: flex


## Dimensions

获取屏幕尺寸

import { Dimensions } from 'react-native'

Dimensions.get('window').width

## 组件和API

原生组件：android ios内部组件

核心组件：最常用的，对原生组件的封装。View,Image,Text....
 
第三方组件: AsyncStorage(持久化存储数据)



## 路由导航