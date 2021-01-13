# class

<https://es6.ruanyifeng.com/#docs/class>

## 语法

```js
function readonly( target, property, descriptor ) {
    descriptor.writable = false;
    return descriptor;
}


class User {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  @readonly
  getFullName() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

let user = new User( 'John', 'Doe' );
console.log(user.getFullName());
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
