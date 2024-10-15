# class

<https://es6.ruanyifeng.com/#docs/class>

## 语法

```js

class User {

  //私有属性
  x=1;

  constructor(x, y) {
    // this指向实例
    this.x = x;
    this.y = y;
  }


  getFullName() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

let user = new User( 'John', 'Doe' );
console.log(user.getFullName());
```

## 继承

方法重写: 如果在子类中添加了和父类一样的方法，子类会覆盖父类


super表示父类

```js

class parent{
  fun(){

  }
}

class aaa extends parent{


  constructor(){
    // 如果子类中写了构造函数，必须super
    super(); 
  }


  funa(){
    super.fun();
  }
}
```

## 抽象类

abstract 与其他类区别不大，只能被继承，不能创建实例

abstract抽象方法，子类必须对抽象方法重写

```js
abstract class aa{
  abstract fun():void;
}
```


## Decorator

<https://juejin.cn/post/6844903640897945613>

Decorator是一个JavaScript函数（推荐的纯函数），用于修改类属性/方法或类本身。

Decorator( target, property, descriptor )

property是属于目标对象的属性/方法的名称（与User.prototype相同），descriptor是该属性的property descriptor

当您在类属性，方法或类本身的顶部添加@decoratorFunction语法时，decoratorFunction由一些参数来调用，我们可以使用它们修改类或类的属性。

本质原理是修改对象的修饰符,如：

```js
Object.defineProperty( User.prototype, 'getFullName', {
    writable: false
} );
```

Decorator使用方法：

如：在 getFullName 方法的 顶部 放置 @readonly 语法
