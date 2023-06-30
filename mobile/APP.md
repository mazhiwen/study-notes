# APP开发框架

[主流的APP开发方式](https://zhuanlan.zhihu.com/p/465407615)

[2023移动端技术探索](https://juejin.cn/post/7239267216805429303)

<https://www.cnblogs.com/windfic/p/10443342.html>

<https://ask.dcloud.net.cn/article/36083>

<https://juejin.cn/post/6844904009778593800>

## 1.Native App

使用原生语言开发的应用；
性能和体验都是最好，但开发和发布成本最高；
常用的开发技术：Swift，OC， Java；

这意味着你想去使用原生语言开发App，比如ios的Swift或Android的Kotlin。肯定会获得最好的性能，并且可以充分利用设备硬件和原生API。但是，这需要学习两种不同的编程语言，维护两套代码，并且可能有双倍的bug，甚至需要有两个不同的开发团队。

## 2.Flutter APP

由Google开发并开源的一套UI框架，使用dart语言；逻辑和界面使用Flutter Engine；
Flutter使用Engine来绘制Widget（Flutter的显示单元）,即Widget渲染界面，Dart代码都是通过AOT（Ahead Of Time）编译为平台的原生代码，所以Flutter可以直接与平台通信，不需要JS引擎的桥接。
Widget是不可变的，仅支持一帧，并且在每一帧上不会直接更新，要更新而必须使用Widget的状态。无状态和有状态widget的核心特性是相同的，每一帧他们都会重新构建，有一个State对象，它可以跨帧存储状态数据并恢复它。
渲染方式：Widget渲染界面
性能：Flutter APP是除了Native APP以外性能最好的；
热更新：不支持；

## 3.1:React Native App

RN是Facebook开发并开源的一款UI框架，以解决Hybrid存在的缺陷与不足；
原理：JS写逻辑且运行在JS引擎中，底层自动把JS代码解析成对应平台（ios、安卓）的原生API，调用Native的API绘制原生UI，即原生渲染界面，这是与Hybird App最大的不同，因此性能好于Hybrid App。
渲染方式：原生渲染；
JS引擎为：ios为JSCore，andorid为v8，最新版rn开始在andorid上搞自己的js引擎Hermes
界面：由JSX语言写界面
布局：Flexbox；
基于的开发技术：ReactJS
热更新：支持；
思想：learn once, write anywhere; 注：不敢说write once，因为RN要针对ios和安卓各写一套代码；

## 3.2:Weex App

与React Native App类似，由阿里开发并开源一款UI框架;
原理：跟RN类似；
渲染方式：原生渲染
跟RN最大不同：Weex写一套代码即可运行在IOS和安卓中，RN要写两套代码，IOS一套，安卓一套；
JS引擎为：ios为JSCore，andorid为v8
界面：由Vue编写界面；
布局：Flexbox；
基于的开发技术：VueJS;
热更新：支持；
思想：write once, run anywhere;
注：

微信小程序类似于RN/Weex开发方式，也分为逻辑层和视图层；
微信小程序的页面属于混合渲染，什么是混合渲染？看后文总结；

## 4.Uni-App

DCloud公司开发的一款基于vue.js的跨端的框架；
渲染方式：混合渲染、weex原生渲染、webview渲染。小程序和app-vue页面属于混合渲染，app-nvue页面全部是weex原生渲染。H5全部为webview渲染；
uni-app里的App端原生插件，这类插件使用IOS或者Android原生语言编写，封装成插件，供其他开发者使用js来调用；
原生插件分为原生组件component和原生模块module；
原生组件component只能在App-nvue页面中使用；
uni-app插件市场的大部分原生插件大部分属于原生模块module；
uni-app开发app性能足够好，用官方原话说是：点击跳转原文
当然，uni-app的app引擎并没有吊炸天。App平台，所有跨平台工具都还比不过原生，这是客观事实。只是，如果uni-app不能满足你的需求，你没有必要去用其他跨平台工具，直接上原生吧。
笔者认为使用uni-app开发最大的好处就是省成本和不错的生态：
成本，包括学习成本、开发成本，时间成本，招人成本等；
生态，包括开发者数量，社区活跃度，文档是否齐全等；

## 5.1 Hybrid App

混合模式移动应用，介于WebApp、Native App两者之间的App开发技术；
原理：JS写逻辑且可以通过JSBridge调用Native的API，用HTML+CSS编写界面，并由webview渲染界面；
渲染方式：webview渲染；
JSBridge统一封装了IOS和Android的API，因此Hybrid App具有跨平台效果；
JS逻辑的执行由webview内置的JS引擎决定，调用Native API是通过JSBridge来实现；
开发和发布成本介于Native App 和 WebApp之间。
热更新：支持
常用开发技术：PhoneGap、ApiCloud、MUI、Wex5、AppCan等；

## 5.2 Web App

移动端的网站，常被称为H5应用，即运行在移动端浏览器的网站应用，一般泛指SPA模式开发的网站，与MPA对应，代表：微信公众号里的H5应用(微信公众号的H5又可以调用Native API，也可以认为是Hybrid App）；
开发和发布成本最低，但性能最差；
常用的开发技术：VueJS、ReactJS等；

## 总结

目前主流的3大渲染引擎有：`webview < React Native/weex < Flutter` ,复杂程度依次降低、渲染性能依次上升

混合渲染： 主体为webview渲染，部分元素为原生渲染，比如导航栏、tabbar、video、map使用了原生控件。例如：微信小程序，uniapp发布的app-vue页面都属于混合渲染；

rn和weex使用原生渲染，性能高于webview，但是同为原生渲染，rn和weex怎么会慢于flutter呢？其实并不是原生渲染慢，而是js和原生通信慢。rn和weex分为js引擎和原生渲染层两个运行环境，当js引擎联网获取数据后，通知原生视图层更新界面时，有一个跨环境的通信折损。同样，但用户在屏幕上操作原生视图层时，要给js引擎发送通知，也会产生通信折损。这个通信折损，普遍存在于所有逻辑和视图分离的框架中，各家小程序因为也使用这个架构，所以也存在这个问题。因为flutter只有一个dart引擎，所有没有来回通信参数的性能问题，所以性能比rn和weex跟高；这个通信的折损特别表现在跟手势的js响应操作绘制帧动画，或者说js连续操作界面元素方面。场景如：界面可拖动的浮动球、可拖动的滑块等。为了解决通信的折损，RN搞了lottie的动画库，weex搞了BindingX，微信小程序搞了wxs，百度小程序搞了Filter，阿里小程序搞了SJS，uniapp若使用weex渲染时使用BindingX，使用app-vue时使用renderjs或wxs，renderjs和wxs是一种运行在视图层的js，不和逻辑层通信。

## WebView是什么


