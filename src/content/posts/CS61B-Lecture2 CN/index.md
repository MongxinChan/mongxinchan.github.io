---
title: CS61B Lecture 2- 类与实例化，调试入门
published: 2024-12-03
updated: 2024-12-04
description: '这一讲介绍了类与其实例化，以及调试入门，我在后文提及了一下为什么会有面向对象编程，以及类，方法，实例的区别。'
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
> 如果你想阅读英文版，请点击[这里](https://www.loners.site/posts/cs61b-lecture2/)。

# 引入

**Dog.java**
```java
package lec2_intro;
public class Dog {
    public static void makeNoise() {
        System.out.println("Bark!");
    }
}
```

**DogLauncher.java**
```java
package lec2_intro;
public class DogLauncher {
    public static void main(String[] args) {
        Dog.makeNoise();
    }
}
```

当我们运行 `DogLauncher.java` 时，它会调用 `Dog` 类并输出 "Bark!"。这很好，因为它允许我们使用不同的类将复杂的代码分解成更小的部分。

# 方法与类

- 每个方法（也称为函数）都与某个类相关联。
- 要运行一个类，我们必须定义一个 `main` 方法。
- 并非所有类都有 `main` 方法！

> [!TIP]
>
> 快捷键运行
>
> - 利用`control + shift + .` 快捷键运行

**创建实例**
在编写方法和类时，我们通常希望模拟现实世界的特征。例如，每只狗的叫声可能不同，每个学生对铃声的反应也可能不同。

**不太好的方法**
我们可以为每只狗创建一个单独的类，但这很快就会变得冗余。

**解决方案：实例变量**
真正的解决方案是创建一个实体（实例），它可以代表特定的特征。例如，狗的叫声可以取决于它的体重。

```java
package lec2_intro2;
public class Dog {
    public int weightInPounds;

    public void makeNoise() {
        if (weightInPounds < 10) {
            System.out.println("yipyipyip!");
        } else if (weightInPounds < 30) {
            System.out.println("bark!");
        } else {
            System.out.println("aroooooooo!");
        }
    }
}
```

**带有实例的 DogLauncher.java**

```java
package lec2_intro2;
public class DogLauncher {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.weightInPounds = 20;
        d.makeNoise();
    }
}
```

> [!TIP]
>
> 【**对象实例化**】
> 类不仅可以包含函数（方法），还可以包含数据。例如，我们可以为每个 `Dog` 添加一个 `size` 变量。
>
> 【**类实例化**】
> - 我们创建一个单一的 `Dog` 类，然后创建这个 `Dog` 的实例。
> - 这些实例也被称为“对象”。
> - 类提供了一个所有 `Dog` 对象都将遵循的蓝图。
> - 不能为 `Dog` 添加新的实例变量；它们都必须完全遵循蓝图。
>

```java
package lec2_intro2;
public class Dog {
    public int weightInPounds;

    // 实例变量。可以有任意多个这样的变量。

    public Dog(int w) {
        weightInPounds = w;
    } // 构造函数（类似于方法但不是方法）。决定如何实例化类。

    public void makeNoise() {
        if (weightInPounds < 10) {
            System.out.println("yipyipyip!");
        } else if (weightInPounds < 30) {
            System.out.println("bark!");
        } else {
            System.out.println("aroooooooo!");
        }
    }

    // 非静态方法，也称为实例方法。理念：如果该方法将由类的实例调用，那么它应该是非静态的。
}
```

# 静态(`static`)与非静态(`Non-Static`)方法

在同一个类中，我们可以同时拥有静态和非静态方法。

```java
package lec2_intro2;
public class Dog {
    public int weightInPounds;

    // 实例变量。可以有任意多个这样的变量。

    public Dog(int w) {
        weightInPounds = w;
    } // 构造函数（类似于方法但不是方法）。决定如何实例化类。

    public void makeNoise() {
        if (weightInPounds < 10) {
            System.out.println("yipyipyip!");
        } else if (weightInPounds < 30) {
            System.out.println("bark!");
        } else {
            System.out.println("aroooooooo!");
        }
    }

    // 非静态方法，也称为实例方法。理念：如果该方法将由类的实例调用，那么它应该是非静态的。

    public static Dog maxDoge(Dog d1, Dog d2) {
        if (d1.weightInPounds > d2.weightInPounds) {
            return d1;
        } else {
            return d2;
        }
    }
}
```

## 实例方法

```java
package lec2_intro2;
public class Dog {
    // ...（前面的代码）

    public Dog maxDog(Dog d2) {
        if (weightInPounds > d2.weightInPounds) {
            return this;
        } else {
            return d2;
        }
    }
}
```

### 带有静态和实例方法的 DogLauncher.java

```java
package lec2_intro2;
public class DogLauncher {
    public static void main(String[] args) {
        Dog chester = new Dog(17);
        Dog yusuf = new Dog(150);

        Dog larger = chester.maxDoge(yusuf);
        larger.makeNoise();
    }
}
```

>[!TIP]
>
>**静态变量**
>
>静态变量对整个类来说是通用的，而实例变量则特定于每个对象。

**交互式调试**
到目前为止（例如，在 CS61A 中），你可能通过添加打印语句来查找代码中的错误。今天，我们将使用 IntelliJ 的内置交互式调试工具来查找某些代码中的错误。调试更像是一门艺术，而不是科学。

## 示例：使用 IntelliJ 的调试器
```java
package lec2_intro2;
public class DogLauncher {
    public static void main(String[] args) {
        Dog chester = new Dog(17);
        Dog yusuf = new Dog(150);

        Dog larger = Dog.maxDoge(chester, yusuf);
        larger.makeNoise();
    }
}
```
>[!NOTE]
>
>**类属性与实例属性**
>- `static` 定义类属性。
>- 没有 `static`，则定义实例属性。

# 小结
类、实例和方法，这些概念对于新手来说往往容易混淆。实际上，它们的核心思想是通过代码对现实世界中的事物进行模拟和实现。

我们常说类具有抽象性，那么抽象究竟是什么意思呢？在政治学中，抽象是从具体的社会现象中提炼出普遍规律，例如权力、自由、正义等概念；而在哲学中，抽象更多涉及认识论和本体论的讨论，比如如何通过抽象理解世界的本质。

>[!NOTE]
>
>**抽象并不是脱离具体的空谈，而是建立在具体事物基础上的提炼。我们需要从具体的事物中抽象出共性，这正是类的属性、方法和实例的意义所在。**

以人类为例，一个独立的人可以看作是一个实例，他具有自己的属性（如姓名、年龄）和方法（如行走、思考）。

但显然，人类并不是孤立的个体，我们既有人类的共性，也有每个人的独特性，这种独特性在Java中称之为**多态性**(Polymorphism)。

类的抽象性正是通过这种方式帮助我们描述世界：它既能捕捉事物的共性，又能保留个体的独特性。例如，人类是哺乳动物、恒温动物、有语言能力的动物，而企鹅是鸟类和恒温动物，但企鹅没有能飞的羽翼。我们可以说人类和企鹅同时**继承**了恒温动物的特性，保持恒温，同样的，只是因为一些习性，这个体温各不相同。这就是所谓的**继承**(Inheritance)，这种抽象模型让我们能够将事物关联起来，同时保留它们的差异。

此外，类的**封装性**也是一个重要特性。就像使用空调遥控器时，我们只需按下按钮，空调就会打开，而无需了解其内部工作原理。这种封装性通过隐藏复杂性，让使用者只需关注外界的输入和输出，从而简化了交互过程。

最后，所谓实例化，就是将一个类转化为具体的对象。这个对象不仅继承了类的共性，还具有自己的独特性。例如，张三和李四都是人类的实例，他们听到打铃时会下意识地跑向自己的教室，但他们的名字和行为细节却各不相同。

通过这些概念，我们能够更清晰地描述和操作现实世界中的复杂关系，同时让代码更具组织性和可维护性。