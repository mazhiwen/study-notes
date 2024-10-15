# TypeScript

本质上是向 JavaScript 增加静态类型系统

它是 JavaScript 的超集，所有现有的 JavaScript 都可以不加改变就在其中使用

[官方文档](https://www.typescriptlang.org/zh/docs/)

[Vue Class Component](https://class-component.vuejs.org/guide/class-component.html#computed-properties)

<https://juejin.cn/post/7294449571857219593?searchId=2024011917322365347780D0807752DF2D>

<https://juejin.cn/post/6844904013289226254>

<https://juejin.cn/post/6917523407886106631>

[1.2W字 | 了不起的 TypeScript 入门教程](https://juejin.cn/post/6844904182843965453)

[2021年与TypeScript愉快玩耍](https://juejin.cn/post/6917830695301677069#heading-15)

[从 JavaScript 到 TypeScript 6 - Vue 引入 TypeScript](https://tasaid.com/blog/20171011233132.html)

[Typescript在Vue中的实践](https://juejin.cn/post/6877373779471761416#heading-4)

[TypeScript + 大型项目实战](https://juejin.cn/post/6844903641829081095#heading-13)

<https://www.cnblogs.com/eedc/p/12166326.html>

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


## 类型别名

声明一个别名 类型

自定义类型

```ts
type myType = 1|2|3

let a:myType
```

## 类

```ts

class Person{

    // 定义属性。 实例属性  
    name:string  = 'aaa'
    //静态属性。不在实例上的属性，通过类直接访问
    static readonly age:number = 18

    // public 可以在任意位置访问修改属性
    public _b : number;

    // 只能在当前类内部进行访问修改，继承也不能
    // 只能在类内部操作
    private _c : number;


    // 受保护的属性，只能在当前类 和 子类中使用
    protected _c : number;


    constructor(name:number,b:number){
        //this.name=name;
    }

    // 加static属性类似以上
    fun(){

    }

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




## 接口


interface 用来定义一个类结构，应该包含的属性方法

同时能当成类型声明使用type

接口可以重复声明

接口中所有属性都不能有实际值，只定义结构。方法都是抽象方法

```js
interface myInterface{
    a:number;
    b:number;
}



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
```


## 泛型


定义函数或者类时，遇到类型不明确可以用泛型



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



