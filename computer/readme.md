# 计算机知识

## 进程线程

<http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html>

单次1进程，1进程有多线程.

## 堆(heap)和栈(stack)

<https://blog.csdn.net/yingms/article/details/53188974>

stack:
由系统自动分配。 例如，声明在函数中一个局部变量 int b; 系统自动在栈中为b开辟空间
heap:
需要程序员自己申请，并指明大小，在c中malloc函数

### js中的堆和栈

<https://www.cnblogs.com/heioray/p/9487093.html>
<https://blog.csdn.net/GUANTINA/article/details/81533605>

在js引擎中对变量的存储主要有两种位置，堆内存和栈内存。

和java中对内存的处理类似，栈内存主要用于存储各种基本类型的变量，包括Boolean、Number、String、Undefined、Null，**以及对象变量的指针，这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等。

而堆内存主要负责像对象Object这种变量类型的存储，如下图

在计算机领域中，堆栈是两种数据结构，它们只能在一端(称为栈顶(top))对数据项进行插入和删除。  
堆：队列优先,先进先出；由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。  
栈：先进后出；动态分配的空间 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链 表。  
