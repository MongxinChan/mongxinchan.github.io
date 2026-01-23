---
title: CS61B Lecture 1 - 课程介绍
published: 2024-12-02
updated: 2024-12-03
description: 'CS61B Lecture 1 CN，主要讲的是如何使用Java的基础语法，以及CS61B课程的介绍。'
image: ''
tags: [Java, CS61B]
category: "CS-Basics"
lang: zh_CN
---
> [!TIP]
>
> 欢迎来到我的 CS61B 课程笔记！
> 在这份说明中，我将分享与[CS61B](https://sp24.datastructur.es/) `CS61B: Data Structures` 相关的笔记和资源，该课程由 Justin Yokota 和 Peyrin Kao 讲授。
>
> 我会发布我在课程期间完成的讲座笔记、作业和其他材料。我希望这些笔记能对正在修这门课的其他人有所帮助。如果你有任何问题或反馈，请随时联系我。感谢你的关注。
> 如果你想阅读英文版，请点击[这里](https://www.loners.site/posts/cs61b-lecture1/)。

# CS61B课程笔记

可以直接跳过对未来的展望，这一部分主要是对UCB的学生的考核，当然你也可以参考一下UCB对学生的要求~

## 课程介绍

CS61B课程主要关注以下内容：

- **编写高效的代码**
    - 良好的算法
    - 良好的数据结构
- **高效地编写代码**
    - 设计、构建、测试和调试大型程序
    - 使用编程工具
        - git、IntelliJ、JUnit和各种命令行工具
    - Java（不是课程的重点）

课程假设学生具备以下编程基础：
- **面向对象编程、递归、列表和树**

## CS61B的其他精彩之处：

- **软件工程面试中最受欢迎的主题**
    - 示例：哈希表、二叉搜索树、快速排序、图、Dijkstra算法
- **一些非常酷的数学**
    - 示例：
        - 渐近分析
        - 数组扩容
        - 自平衡2-3树与自平衡红黑树的等距性
        - 图论
        - P=NP
- **完成后：** **有信心可以构建任何软件**

---

## 问题

- **你希望/期望从这门课中学到什么？你为什么选这门课？**
    - 工作
    - 我终于可以让我的代码高效运行了
    - 我想要得A
    - 从零开始编码
    - 更好地掌握数据结构和算法

- **你是谁？**
    - 大一？大二？大三？大四？研究生？以上都不是？
    - 计算机科学专业？打算成为计算机科学专业？其他？
    - 修过CS61A？有Java经验吗？

> [!NOTE]
> 
> 当你离开这门课时，我希望每个人都能为了乐趣而编写程序，因为他们有一些需要解决的问题，或者他们只是想浪费一个周末做点什么。
> --Peryin 

---

## 课程组成部分

- **讲座**为你提供介绍和基础。
- **你将通过以下方式学习大部分课程内容：**
    - 编程（实验、作业、项目、讨论课）
    - 解决有趣的问题（学习指南、作业3、作业4、旧考试题、讨论课）

> **一般来说，你会通过实践学到很多。编程不是仅靠理论就能学会的。** 你需要真正去实践。因此，你会通过作业、实验和项目获得大量用Java编程的经验。**讨论课不会直接进行编程，但你会讨论很多关于如何有效编码的内容。** 整个学期你将解决很多有趣的问题。

---

## 评估

- **这门课有四种类型的分数：**
    - **低努力，每个人都应该得到：** 每周调查、课程评估
        - 中位数分数为100%
    - **高努力，每个人都应该得到：** 作业、项目、实验
        - 中位数分数为100%
    - **高努力，不是每个人都得到：** 考试
        - 平均分数为65%
        - 如果你在期中考试中表现不佳（或两次），期末考试分数可以替代期中考试分数
    - **进度分数：** 参加讨论课、实验课并跟上讲座进度
        - 跟上课程进度可获得少量额外学分
        - 不会将你的分数提高到超过75%（B-）
            - 示例：你有740分并获得20个进度分数，你将得到750分
    - **B到B+的门槛：** 考试65%，其他部分95%

---

## 课程阶段

- **第一阶段（第1-4周）：Java和数据结构入门**
    - 所有编码工作都是个人完成
    - 进度非常快
    - 作业0（Java入门）将在周五到期（还有两天！）
- **第二阶段（第5-10周）：数据结构**
    - 所有编码工作都是个人完成
    - 进度适中
- **第三阶段（第12-14周）：算法**
    - 编码工作完全用于最终项目，由两人一组完成
    - 进度较慢

---

# Java入门

```python
print("hello world");
```

**Java是一种非常注重面向对象编程的语言。**  
它非常注重你编写的代码都在一个类中。让我们来创建一个类。我将使用 *魔术词* `public class` 来定义一个类。

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello world"); // print不包含"\n"
    }
}
```

---

## Java与面向对象编程

**关于Hello World的反思：**
- 在Java中，所有代码都必须是类的一部分
- 类使用 `public class CLASSNAME` 定义
- 我们使用 `{ }` 来划分事物的开始和结束
- 我们必须用分号结束一行
- 我们想要运行的代码必须在 `public static void main(String[] args)` 中
    - 我们稍后会学习这意味着什么

**Java是一种具有严格要求的面向对象语言：**
- 每个Java文件必须包含一个类声明
- **所有代码** 都在一个类中，即使是辅助函数、全局常量等
- 要运行Java程序，你通常需要使用 `public static void main(String[] args)` 定义一个main方法

---

## Java与Python：静态类型

**Python:**
```python
x = 0
while x < 10:
    print(x)
    x = x + 1
x = "horse"
print(x)
```

**Java:**
```java
public class HelloNumbers {
    public static void main(String[] args) {
        int x = 0;
        while (x < 10) {
            System.out.println(x);
            x = x + 1;
        }
        x = "horse"; // 这将导致编译时错误
        System.out.println(x);
    }
}
```

**关于Hello Numbers的反思：**
- 在Java中使用变量之前，必须先声明
- Java变量必须有一个特定的类型
- Java变量的类型不能改变
- 类型在代码运行之前就会被验证！

---

## Java与静态类型

- **Java是静态类型的！**
    - 所有变量、参数和方法都必须有一个声明的类型
    - 该类型不能改变
    - 表达式也有类型，例如 `larger(5, 1) + 3` 的类型为 `int`
    - 编译器会在程序运行之前检查程序中的所有类型是否兼容！
        - 例如，`String x = larger(5, 10) + 3` 将无法编译
        - 这与Python不同，Python在执行期间进行类型检查

---

## 在Java中编写函数

**Python:**
```python
def larger(x, y):
    if x > y:
        return x
    else:
        return y

print(larger(-5, 10))
```

**Java:**
```java
public class LargeDemo {
    public static int larger(int x, int y) {
        if (x > y) {
            return x;
        } else {
            return y;
        }
    }

    public static void main(String[] args) {
        System.out.println(larger(5, 4));
    }
}
```

**关于Larger的反思：**
- 在Java中，函数必须作为类的一部分声明。作为类一部分的函数称为“方法”
- 要在Java中定义一个函数，我们使用 `public static`。我们稍后会看到定义函数的其他方法
- 函数的所有参数都必须有一个声明的类型，函数的返回值也必须有一个声明的类型。Java中的函数只返回一个值！

---

# 面向对象编程回顾

- **一种组织程序的模型**
    - **模块化：** 定义每个部分而不必担心其他部分，它们都能一起工作
    - **数据抽象：** 你可以与对象交互而不必知道它是如何实现的
- **对象**
    - 对象将信息和相关行为捆绑在一起
    - 每个对象都有自己的本地状态
    - 几个对象可能都是某个共同类型的实例
- **类**
    - 类作为其所有实例的模板
    - 每个对象都是某个类的实例

---

## Python、Java和C++中的类

**Python:**
```python
class Car:
    def __init__(self, m):
        self.model = m
        self.wheels = 4

    def drive(self):
        if self.wheels < 4:
            print(self.model + " no go vroom")
            return
        print(self.model + " goes vroom")

    def getNumWheels(self):
        return self.wheels

    def driveIntoDitch(self, wheelsLost):
        self.wheels = self.wheels - wheelsLost

c1 = Car("Civic Type R")
c2 = Car("Porsche 911")
c1.drive()
c1.driveIntoDitch(2)
c1.drive()

print(c2.getNumWheels())
```

**Java:**
```java
public class Car {
    public String model;
    public int wheels;

    public Car(String m) {
        this.model = m;
        this.wheels = 4;
    }

    public void drive() {
        if (this.wheels < 4) {
            System.out.println(this.model + " no go vroom");
            return;
        }
        System.out.println(this.model + " go vroom");
    }

    public int getNumWheels() {
        return this.wheels;
    }

    public void driveIntoDitch(int wheelsLost) {
        this.wheels = this.wheels - wheelsLost;
    }

    public static void main(String[] args) {
        Car c1 = new Car("Porsche 911");
        Car c2 = new Car("Toyota Camry");

        c1.drive();
        c1.driveIntoDitch(2);
        c1.drive();

        System.out.println(c2.getNumWheels());
    }
}
```

**C++:**
```cpp
#include <iostream>
using namespace std;

class Car {
public:
    string model;
    int wheels;

    Car(string m) {
        this->model = m;
        this->wheels = 4;
    }

    void drive() {
        if (this->wheels < 4) {
            cout << this->model << " no vroom." << endl;
            return;
        }
        cout << this->model << " vroom." << endl;
    }

    int getNumWheels() {
        return this->wheels;
    }

    void driveIntoDitch(int wheelsLost) {
        this->wheels = this->wheels - wheelsLost;
    }
};

int main() {
    Car* c1 = new Car("Toyota Camry");
    Car* c2 = new Car("Porsche 911");

    c1->drive();
    c1->driveIntoDitch(2);
    c1->drive();

    c2->drive();
    cout << c2->getNumWheels() << endl;

    delete c1;
    delete c2; // 避免内存泄漏

    return 0;
}
```

---

# 面向对象编程回顾

- **一种组织程序的模型**
    - **模块化：** 定义每个部分而不必担心其他部分，它们都能一起工作
    - **数据抽象：** 你可以与对象交互而不必知道它是如何实现的
- **对象**
    - 对象将信息和相关行为捆绑在一起
    - 每个对象都有自己的本地状态

# 写在最后
作为一名中国学生，当我接触到CS61B的课程内容时，不禁感慨万千。这样的课程，才是计算机专业学生真正应该学习的内容。相比之下，国内许多课程却过于专注于语法细节和机械化的应试训练，缺乏对计算机科学本质的深入探索。这让我时常思考：为什么大学教育总是被批评为与社会生产脱节？其实，问题的根源在于教学内容的停滞不前。

在国内，课程内容的陈旧并非偶然。一方面，改变课程大纲意味着教师需要重新设计教学方案，这无疑增加了备课的难度和工作量；

另一方面，学生也可能因为内容难度的提升而面临更高的挂科风险。因此，许多学校和教师选择维持现状，继续沿用那些陈旧的知识体系。这种“路径依赖”导致了多年来大学课程内容的固化，甚至与时代需求渐行渐远。

这也是我选择深入学习公开课的原因之一。通过接触像CS61B这样注重理论与实践结合的课程，我希望能够弥补国内教育的不足，真正理解计算机科学的核心思想和实际应用。这种学习不仅是对个人能力的提升，更是对教育现状的一种反思和回应。