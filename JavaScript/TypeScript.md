# TypeScript

本质上是向 JavaScript 增加静态类型系统

它是 JavaScript 的超集，所有现有的 JavaScript 都可以不加改变就在其中使用

[官方文档](https://www.typescriptlang.org/zh/docs/)




## TS概念

首先TS的定位是静态类型语言，而不是类型检查器（对比flow）。从开发工具提供的能力看也不仅仅是类型检查，很直观的就是Intellisense over Compilation Error，当一段代码有问题（比如少写了字母）时，写完马上就会有红色波浪线提示，而不是等到编译的时候才告诉你哪一行有问题。因此使用TS提供的类型系统+静态分析检查+智能感知/提示，使大规模的应用代码质量更高，运行时bug更少，更方便维护。

TS不能被解析器直接执行

TS提供： 类型，支持es的新特性，添加es不具备的新特性，丰富的配置选项, 开发工具

## 环境

node typescript

tsc命令


## 基础类型声明

```ts
let a:number;

let b:string;

let c:boolean = true;
//let c = false 对变量声明赋值同时进行时，ts会对变量类型检测,赋值类型

function sun(a:number, b:number):number//函数返回类型{
    return 
}


```


## 字面量

也可以用字面量类型声明

```ts
let a:10; // a=10
```


## 多类型

链接多个 '|' 类型


```ts
let a: "male"|"female";
let a:  boolean|string;
```


## any

任意类型

```ts
// 如果不指定类型，默认any
let a;

//any可以赋值给任意类型的变量
let b:string;
b=a;
```

## unknown


unknown区别与any ， 不可以赋值给其他变量


## 类型断言

告诉解析器变量的实际类型

```ts
s = e as string
s = <string>e  
```

## void

表示空，以函数为例，表示没有返回值/或者undefined

```js
function fn(): void{
 
}
```

## never

永远不会返回结果

```js
function fn(): never{
 
}
```


## object



```ts
let a:object;
a={};


//{}表示object里面类型，实际数值必须和声明object完全一致
// a的类型是object，并且里面有name
let a:{
    name:string,
    // key后加?表示这个属性可有可无
    age?:number,
    // propName表示属性名 是概括
    [propName:string]:any

};

```

## 函数类型

```ts
// d类型为函数 
// 参数...
let d: (a:number,b:number)=>number;
```


## Array

```ts

// 字符串数组
let a: string[];
// number数组
let a: number[];
let a: Array<number>;
```

## 元组

固定长度的数组


```ts

let a: [string,string,...];

```


## enum

枚举

```ts

// 定义一个枚举类Gender
enum Gender{
    Male = 0,
    Female = 1,
}
let i:Gender;

i=Gender.Male;

i === Gender.Male 
```


## type 类型别名

声明一个别名 类型

自定义类型

```ts
type myType = 1|2|3

let a:myType
```

## type & interface的异同

在不确定使用type/interface时, 请优先考虑使用interface, 若interface无法满足需求时, 才考虑使用type.

1.都可以用来描述一个函数或对象

2.type interface可以互相继承。type继承任何用& ， interface继承任何用extends

```ts
interface Person {
  name: string
  age: number
  getName(): string
}
type Person1 = {
  name: string
  age: number
  getName(): string
}

// type继承type声明的接口
type Person2 = {
  firstName: string
  lastName: string
}
type User = Person2 & { age: number }

// interface继承type声明的接口
interface User1 extends Person2 {
  age: number
}

// type继承interface声明的接口
type User2 = User1 & { getFullName(): void }
```

3. 不同点:

```
type能够表示非对象类型，而interface只能表示对象类型。
interface可以继承其他类型，type不支持继承。
同名interface会自动合并，同名type则会报错。也就是说，TypeScript 不允许使用type多次定义同一个类型。
interface不能包含属性映射，type可以。
this关键字只能用于interface。
type 可以扩展原始数据类型，interface 不行。
```


## class 类


implements继承interface



```ts

class Person{

    // 定义属性。 实例属性  
    // 公共（public）可写入（writeable）的属性
    name:string  = 'aaa'

    //静态属性。不在实例上的属性，通过类直接访问
    static readonly age:number = 18

    // public 可以在任意位置访问修改属性
    public _b : number;

    // private 只能在当前类内部进行访问修改，继承也不能
    // 只能在类内部操作
    private _c : number;


    // 受保护的属性，只能在当前类 和 子类中使用
    protected _c : number;


    constructor(name:number,b:number){
        //this.name=name;

        // extends时添加super
        super();
    }

    // 加 static 属性类似以上
    fun(){

    }


    // 存取器 get set
    get c(){
        // 获取private _c的时候，只需要直接实例.c获取，会执行c方法
        return this._c;
    }

    set c(value:number){
        // 同理以上get
        this._c = value;
    }

}
```




## interface 接口

接口可用于：
1.对「对象的形状（Shape）」进行描述
2.对类的一部分行为进行抽象 。定义一个类结构，应该包含的属性方法。需要由类class去实现implements。

同时能当成类型声明使用type

接口可以重复声明

接口中所有属性都不能有实际值，只定义结构。方法都是抽象方法

一个接口可以同时继承多个 interface, 实现多个接口成员的合并

Interface 能够继承 Interface ,类，type。 

继承类 再创建子类的过程中满足接口的描述就会必然满足接口继承的类的描述



```js

//  1.对象
interface myInterface{
    a:number;
    b:number;
    //如果属性是可选的，就在属性名后面加一个问号
    x?: string;
    // 如果属性是只读的，需要加上readonly修饰符。
    readonly a: string;
    // 对象的属性索引
    [Key: string]: number;


}


// 2. 函数

// 写法一
interface A {
  f(x: boolean): string;
}

// 写法二
interface B {
  f: (x: boolean) => string;
}

// 写法三
interface C {
  f: { (x: boolean): string };
}


//  2.类 单接口
interface myInterface{
    a:number;
    fun():void;
}
class myclass implements myInterface{
    a:number;

    constructor(){
    }

    fun(){
    };
}


//  3.类 多接口
interface Email {
  domain: string;
  address: string;
}
interface Account{
  id: string;
  firstName: string;
  lastName: string;
  getUserFullName(firstName: string, lastName: string): string
}

// 多接口继承
interface UserInfo extends Account, Email {
  nickName: string;
}




// 4. Interface 也可以用来定义一个类的形状。
// 需要注意的是类 Interface 只会检查实例的属性，静态属性是需要额外定义一个 Interface
// Person.ts
// PersonConstructor => 用以检查静态属性或方法
interface PersonConstructor {
  new (name: string, age: number): void
  typename: string // 静态属性
  getType(): string // 静态方法
}

interface PersonInterface {
  log(msg: string): void
}

// 不可写成:  class Person implements PersonInterface, PersonInterface
const Person: PersonConstructor = class Person implements PersonInterface {
  name: string
  age: number
  static typename = 'Person type'
  static getType(): string {
    return this.typename
  }

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  log(msg: string): void {
    window.console.log(msg)
  }
}
export default Person

```




## 泛型


定义函数，类，接口时，遇到类型不明确可以用泛型



```js
//参数按照顺序
function fun<T,K,...>(a: T,b:K..): T {
    return a;
}

// 可以直接调用泛型函数,ts可以自动对类型推断
fun(10);
// 指定类型
fun<string,...>('aa')

class myclass<T>{
    name:T;

}
new myclass<string>();


interface myInter{}
function fun<T extends myInter>(a:T):number{
    //
}

```



## 编译配置

ts编译器的配置文件 tsconfig.json



