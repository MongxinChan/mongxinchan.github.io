---
title: CS61B Lecture 3- 引用类型、递归与链表：从基础到实践
published: 2024-12-05
updated: 2024-12-06
description: '主要讲了引用类型'
image: ''
tags: [DataStructures, Java, CS61B]
category: "CS-Basics"
lang: zh_CN
---
> [!TIP]
>
> 欢迎来到我的 CS61B 课程笔记！
> 在这份说明中，我将分享与[CS61B](https://sp24.datastructur.es/) `CS61B: Data Structures` 相关的笔记和资源，该课程由 Justin Yokota 和 Peyrin Kao 讲授。
>
> 我会发布我在课程期间完成的讲座笔记、作业和其他材料。我希望这些笔记能对正在修这门课的其他人有所帮助。如果你有任何问题或反馈，请随时联系我。感谢你的关注。
> 如果你想阅读英文版，请点击[这里](https://www.loners.site/posts/cs61b-lecture3/)。

**问题引入**

![](./pic/Question.png)

上面两个代码中，是否b的修改会影响到a的数值？而x的修改是否会影响到y的数值？

答案是：b的修改**会**影响到a的数值，而x的修改**不会**影响到

[Java可视化工具](https://cscircles.cemc.uwaterloo.ca/java_visualize)

在Java编程中，引用类型、递归和链表是三个非常重要的概念。它们不仅构成了Java语言的核心特性，还在实际开发中有着广泛的应用。本文将通过解析一份关于这些主题的讲座笔记，深入探讨它们的原理和实践方法，同时提供相应的代码示例。

# 引用类型与内存模型

在Java中，除了8种基本数据类型（`byte`、`short`、`int`、`long`、`float`、`double`、`boolean`、`char`）之外，其他类型都属于引用类型。引用类型在内存中的存储方式与基本数据类型有所不同。基本数据类型直接存储值，而引用类型则存储对象的内存地址。

## 1.1 比特(Bits)

在计算机中，所有信息都用做二进制来存储，自然而然，我们的数据类型也是用二进制来存储的，有如下的表示：

如`int`类型的`72`可以被存储为`010010000`，浮点数`205.75`被存储为`01000011 01001101 11000000 000000000`，`char`类型的`H`被存储为`01001000`，这与72是相同的，关键字`True`被存储为`00000001`。

## 1.2 变量声明与内存分配

当我们声明一个变量时，Java会在内存中分配一个固定大小的空间来存储该变量的值。例如，声明一个`int`类型的变量会分配32位的空间，而声明一个`double`类型的变量则会分配64位的空间。对于引用类型，Java会分配一个64位的空间来存储对象的地址。

```java
int x; // 分配32位空间
double y; // 分配64位空间
x=-1431195969;
y=567213.112;
```

其二进制存储为：

` x|10101010101100011010111010111111`

`y|0100000100100001010011110101101000111001010110000001000001100010`

## 1.3 引用类型与“=”操作符

![](./pic/Walrus.png)

引用类型变量的赋值操作遵循**“黄金法则”**（Golden Rule of Equals）：`y = x`会将`x`中的所有位复制到`y`中。在视觉上，我们可以将这个过程理解为复制一个指向对象实例的箭头。例如，当我们执行`b = a`时，`b`会指向与`a`相同的对象实例。

```java
public class Walrus {
    public int weight;
    public double tuskSize;

    public Walrus(int w, double ts) {
        weight = w;
        tuskSize = ts;
    }

    @Override
    public String toString() {
        return String.format("Weight: %d, tuskSize: %.1f", weight, tuskSize);
    }
}

public class Main {
    public static void main(String[] args) {
        Walrus a = new Walrus(1000, 8.3);
        Walrus b;
        b = a; // b 和 a 指向同一个对象
        b.weight = 5; // 修改 b 的 weight，a 的 weight 也会变
        System.out.println(a); // 输出：Weight: 5, tuskSize: 8.3
        System.out.println(b); // 输出：Weight: 5, tuskSize: 8.3
    }
}
```

## 1.4 对象实例化与内存地址

当我们使用`new`关键字创建一个对象时，Java会为该对象的每个实例变量分配一个内存空间，并用默认值填充这些空间。然后，构造函数会用实际的值填充这些空间。`new`关键字返回的是新创建对象的内存地址。

```java
Walrus a = new Walrus(1000, 8.3); // 创建对象并分配内存
```

> [!TIP]
>
> **创建一个对象的本质就是创建了一个指向新内存空间的位置。**

# 递归与链表

递归是一种强大的编程技术，它允许函数调用自身。在Java中，递归常用于处理链表等数据结构。**链表是一种线性数据结构，由一系列节点组成，每个节点包含一个值和一个指向下一个节点的指针。**

## 2.1 链表的实现

在Java中，链表可以通过定义一个包含值和指针的类来实现。例如，我们可以定义一个`IntList`类，其中包含一个`int`类型的`first`变量和一个`IntList`类型的`rest`变量。通过递归地创建`IntList`对象，我们可以构建一个链表。

```java
public class IntList {
    public int first;
    public IntList rest;

    public IntList(int f, IntList r) {
        first = f;
        rest = r;
    }

    public static void main(String[] args) {
        IntList L = new IntList(15, null);
        L = new IntList(10, L);
        L = new IntList(5, L);
    }
}
```

## 2.2 递归方法

递归方法是处理链表的常用方式。例如，我们可以定义一个`size`方法来计算链表的长度。该方法通过递归地调用自身来计算链表的长度。如果当前节点的`rest`为`null`，则返回1；否则，返回1加上递归调用`rest.size()`的结果。

```java
public int size() {
    if (rest == null) {
        return 1;
    }
    return 1 + rest.size();
}
```

## 2.3 非递归方法

除了递归方法，我们还可以使用迭代方法来处理链表。例如，我们可以定义一个`iterativeSize`方法来计算链表的长度。该方法通过一个循环来遍历链表，并计算链表的长度。

```java
public int iterativeSize() {
    int totalSize = 0;
    IntList p = this;
    while (p != null) {
        totalSize += 1;
        p = p.rest;
    }
    return totalSize;
}
```

# 实践案例

为了更好地理解链表和递归的应用，我们可以尝试实现一些链表操作方法。例如，我们可以实现一个`incrList`方法，该方法返回一个与输入链表`L`相同的链表，但所有值都增加了`x`。我们还可以实现一个`dincrList`方法，该方法同样返回一个与输入链表`L`相同的链表，但所有值都增加了`x`，且不允许使用`new`关键字来节省内存。

## 3.1 增加链表中所有值（允许使用`new`）

```java
public static IntList incrList(IntList L, int x) {
    if (L == null) {
        return null;
    }
    return new IntList(L.first + x, incrList(L.rest, x));
}
```

## 3.2 增加链表中所有值（不允许使用`new`）

```java
public static IntList dincrList(IntList L, int x) {
    IntList p = L;
    while (p != null) {
        p.first += x;
        p = p.rest;
    }
    return L;
}
```

## 3.3 获取链表中的第`i`个元素

```java
public int get(int i) {
    if (i == 0) {
        return first;
    }
    return rest.get(i - 1);
}
```

# 总结

通过本文的介绍，我们深入了解了Java中的引用类型、递归和链表的概念及其应用。引用类型是Java中非常重要的概念，它允许我们通过引用访问和操作对象。递归和链表则是处理复杂数据结构的常用技术。通过实践案例，我们进一步掌握了这些概念的应用方法。希望本文能够帮助读者更好地理解和应用这些Java编程中的核心概念。