# APP开发框架

<https://www.cnblogs.com/windfic/p/10443342.html>

<https://ask.dcloud.net.cn/article/36083>

<https://juejin.cn/post/6844904009778593800>

## 1. 原生Native

这意味着你想去使用原生语言开发App，比如ios的Swift或Android的Kotlin。肯定会获得最好的性能，并且可以充分利用设备硬件和原生API。但是，这需要学习两种不同的编程语言，维护两套代码，并且可能有双倍的bug，甚至需要有两个不同的开发团队。

## 2. Hybrid

如果你是web开发者或者拥有一个已经熟悉JS、HTML、CSS和某些前端库的Web团队，你可以选择这种方案，并使用Cordova/Ionic 通过一些步骤使你的网页变成移动App。这样我们只需要学习一个技术栈，但是，在性能，硬件和API的使用上会有限制。

使用Cordova的App是放在webView里的。这更像是一个在App里的浏览器。用web的概念说，这更像一个web app里的iFrame。

<https://blog.csdn.net/valada/article/details/81639658>

混合应用是指同时使用前端技术与原生技术开发的 App。通常由前端负责大部分界面开发和业务逻辑，原生负责封装原生功能供前端调用，二者以 WebView 作为媒介建立通信，从而既拥有 Web 开发的速度优势，又能拥有强大的原生能力。

从前端开发者的角度，混合应用可以简单地理解为让前端页面跑在一个特殊的浏览器环境里，这个环境除了常规 Web API之外，还额外提供了很多可以直接调用手机原生能力的 API。

从原生开发者的角度，混合应用其实就是一个原生开发的 App 外壳，这个外壳将原生功能封装成很多 API 并注入到 WebView 里，然后将前端页面打包进 App，App 启动时用 WebView 加载前端页面，剩下的就全交给前端了。

## 3. 类原生（其实也算是一种Hybrid）

React Native就属于这类，理论上开发者只需要懂得Web开发知识就可以了。但是学习曲线会比Hybrid要高一些。开发者需要学习怎么使用React Native的库。在某些场景下，可能还需要使用XCode或Android Studio打开项目。但是写的代码可以适用于iOS和Android两个平台，开发上的限制也会比Hybrid要小一些。性能表现会更像原生开发，而且可以更容易地使用一些原生的API。
