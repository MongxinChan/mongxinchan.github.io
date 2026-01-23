---
title: CS61B - Java语法及调试
published: 2025-05-06
updated: 2025-05-08
description: 'Java 是一种静态类型、面向对象的编程语言。理解其基本语法是学习 Java 的第一步。'
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

**Introduction：**

Java 是一种静态类型、面向对象的编程语言。理解其基本语法是学习 Java 的第一步。

# 数据类型（基本类型和引用类型）

在 Java 中，所有变量在使用前必须声明，并且必须具有特定的数据类型。数据类型决定了变量可以存储什么样的数据以及可以对这些数据执行哪些操作。Java 的数据类型分为两大类：

1. 基本类型 (Primitive Types):

    Java 有 8 种基本数据类型，它们直接存储值（见Lecture4）：

    - **整型:**
        - `byte`: 8 位，用于存储小整数。
        - `short`: 16 位，用于存储短整数。
        - `int`: 32 位，最常用的整数类型（例如 `int x = 0;` ）。
        - `long`: 64 位，用于存储大整数。
    - **浮点型:**
        - `float`: 32 位，单精度浮点数。
        - `double`: 64 位，双精度浮点数，用于表示小数（例如 `double y;` ）。
    - **字符型:**
        - `char`: 16 位，Unicode 字符，用于存储单个字符。
    - **布尔型:**
        - `boolean`: 表示 `true` 或 `false`。

    基本类型的变量直接在内存中持有其值。

2. 引用类型 (Reference Types):

    除了 8 种基本类型外，其他所有类型都是引用类型。这包括类（Classes）、接口（Interfaces）、数组（Arrays）和枚举（Enums）。

    - 引用类型的变量不直接存储对象本身，而是存储对象的内存地址（或一个指向对象的引用）。可以将其想象为一个指向实际对象数据的“指针”或“箭头”。
    - 当你使用 `new` 关键字创建一个对象时（例如 `new Walrus(1000, 8.3);` ），Java 会在内存中为该对象分配空间，并返回该对象的地址，这个地址就存储在引用变量中。
    - 如果一个引用变量没有指向任何对象，它可以被赋值为 `null`。
    - 常见的引用类型有 `String`、数组以及所有自定义的类。

## 1.1 控制流（if-else、switch-case、for、while）

控制流语句用于决定程序执行的顺序。

- **`if-else` 语句:** 用于基于条件执行不同的代码块。

    ```java
    // 示例 (larger 函数)
    public static int larger(int x, int y) {
        if (x > y) {
            return x;
        } else {
            return y;
        }
    }
    ```

- **`while` 循环:** 当给定条件为 `true` 时，重复执行代码块。

    ```java
    // 示例 (HelloNumbers)
    int x = 0;
    while (x < 10) {
        System.out.println(x);
        x = x + 1;
    }
    ```

- **`for` 循环:** 提供了一种更结构化的方式来重复执行代码块，通常用于已知迭代次数的情况。

    ```java
    // 基本 for 循环示例
    for (int i = 0; i < 5; i++) {
        System.out.println("迭代次数: " + i);
    }
    ```

- **`switch-case` 语句:** 允许基于变量的值从多个代码块中选择一个来执行。

    ```java
    // switch-case 示例
    int day = 3;
    String dayString;
    switch (day) {
        case 1:  dayString = "星期一"; break;
        case 2:  dayString = "星期二"; break;
        case 3:  dayString = "星期三"; break;
        // ... 其他 case
        default: dayString = "未知日期"; break;
    }
    System.out.println(dayString); // 输出: 星期三
    ```

## 1.2 数组和字符串

- **数组 (Arrays):**

    - 数组是一种引用类型，用于存储固定大小的、相同类型元素的集合。
    - 数组的长度在创建时确定，之后不能改变。
    - 通过索引访问数组元素，索引从 0 开始。
    - `main` 方法的参数 `String[] args` 就是一个字符串数组。

    ```java
    // 数组声明和初始化示例
    int[] numbers = new int[5]; // 声明一个包含5个整数的数组，默认值为0
    numbers[0] = 10;
    String[] names = {"Alice", "Bob", "Charlie"}; // 声明并初始化字符串数组
    ```

- **字符串 (Strings):**

    - 在 Java 中，字符串是 `String` 类的对象，它是一个引用类型。
    - 字符串是不可变的（Immutable），一旦创建，其内容不能被修改。对字符串的修改操作实际上会创建一个新的 `String` 对象。
    - 可以使用字符串字面量（用双引号括起来的字符序列）来创建字符串，例如 `"hello world"`。
    - `String` 类提供了许多用于操作字符串的方法（如拼接、查找、替换等）。

    ```java
    String greeting = "Hello";
    String name = "World";
    String message = greeting + ", " + name + "!"; // 字符串拼接
    System.out.println(message); // 输出: Hello, World!
    ```

## 1.3 包和导入

- **包 (Packages):**
    - 包用于组织相关的类和接口，提供命名空间管理，避免命名冲突。
    - 一个类的完全限定名包括其包名和类名（例如 `java.util.ArrayList`）。
    - 在文件顶部使用 `package` 语句声明该文件中的类所属的包，例如 `package lec2_intro;`。
- **导入 (Import Statements):**
    - 如果需要使用不同包中的类，可以使用 `import` 语句将其导入到当前文件中，这样就可以直接使用类名而不需要写完整的包名。
    - 例如，要使用 `java.util.ArrayList` 类，可以在文件顶部添加 `import java.util.ArrayList;`。
    - 如果两个类在同一个包中，则不需要 `import` 语句就可以互相访问。

```java
// 假设在另一个包 com.example.utils 中有一个 Utility 类
// import com.example.utils.Utility; // 导入 Utility 类

public class MainApp {
    public static void main(String[] args) {
        // Utility.doSomething(); // 如果导入了就可以这样使用
        System.out.println("包和导入示例");
    }
}
```

#  调试技巧 (Debugging Techniques)

调试是查找并修复代码中错误（Bug）的过程。有效的调试技巧对于编写健壮的程序至关重要。

## 2.1 常见错误类型 (Common Error Types)

1. **语法错误 (Syntax Errors):** 代码不符合 Java 语言的语法规则，导致编译器无法理解。例如，缺少分号、括号不匹配、关键字拼写错误等。这类错误通常在编译阶段就会被编译器指出。
2. **逻辑错误 (Logical Errors):** 代码语法正确，可以编译和运行，但执行结果不符合预期。这是因为程序的逻辑设计有缺陷。例如，算法错误、条件判断错误、循环控制错误等。调试的主要目标就是找出并修复逻辑错误。
3. **运行时错误 (Runtime Errors):** 错误在程序运行时发生，通常会导致程序异常终止。例如，空指针异常 (`NullPointerException`)、数组越界 (`ArrayIndexOutOfBoundsException`)、类型转换异常 (`ClassCastException`)等。

## 2.2 调试工具 (Debugging Tools)

1. **集成开发环境 (IDE) 调试器:** 现代 IDE（如 IntelliJ IDEA）内置了强大的交互式调试工具。
    - **断点 (Breakpoints):** 在代码的特定行设置断点，当程序执行到该行时会暂停。你可以检查此时变量的值、调用栈等信息，帮助理解程序的执行状态。在 IntelliJ 中，单击行号旁边即可设置/取消断点。
    - **单步执行 (Stepping):**
        - **Step Over:** 执行当前行，如果当前行是方法调用，则执行完整个方法后停在下一行。
        - **Step Into:** 如果当前行是方法调用，则进入该方法内部的第一行暂停。
        - **Step Out:** 执行完当前方法的剩余部分，然后停在调用该方法处的下一行。
    - **变量查看 (Variable Inspection):** 在程序暂停时，可以查看当前作用域内所有变量的值。
    - **表达式求值 (Expression Evaluation):** 可以输入并计算任意表达式的值。
2. **单元测试框架 (Unit Testing Frameworks):** 如 JUnit，虽然主要用于测试，但也是一种调试工具。通过编写针对特定代码单元（方法或类）的测试用例，可以快速定位问题所在。

## 2.3 调试策略 (Debugging Strategies)

1. **理解错误信息:** 仔细阅读编译器或运行时抛出的错误信息和堆栈跟踪 (Stack Trace)，它们通常能提供错误发生的位置和原因的线索。
2. **复现问题:** 确保能够稳定地重现错误，这是调试的前提。
3. **逐步排查 (Step-by-step / Divide and Conquer):**
    - 使用断点和单步执行，跟踪程序的执行流程，观察变量值的变化，找到第一个出现非预期状态的地方。
    - 对于复杂问题，可以将问题范围缩小，例如注释掉部分代码，或者对输入数据进行简化，判断问题的根源在哪部分逻辑。
4. **日志打印 (Logging / Print Statements):** 在代码的关键位置插入打印语句（如 `System.out.println()`），输出变量值或执行路径信息。虽然简单，但对于追踪程序流程和某些难以使用调试器复现的问题（如并发问题）很有用。这是早期常用的方法。
5. **假设验证:** 根据观察到的现象提出关于错误原因的假设，然后设计实验（修改代码或输入）来验证或推翻这个假设。

## 2.4 测试方法 (Testing Methods)

测试是验证代码是否按预期工作、确保软件质量的关键环节。在实际开发中，程序员自己编写测试是常态。

### 2.4.1 单元测试框架（JUnit 的使用）(Unit Testing Frameworks - Using JUnit)

- **单元测试 (Unit Testing):** 针对软件中最小的可测试单元（通常是方法或类）进行检查和验证。
- **JUnit:** 是 Java 中广泛使用的单元测试框架。它提供了一套注解和断言方法，使得编写和运行测试更加规范和便捷。
- **基本用法:**
    - 创建一个单独的测试类（通常命名为 `TestXxx` 或 `XxxTest`）。
    - 在测试方法前加上 `@Test` 注解。测试方法通常是 `public void` 且无参数。
    - 在测试方法内部：
        1. 准备测试数据（输入）。
        2. 调用被测试的方法，获取实际输出。
        3. 使用断言 (Assertions) 方法（如 JUnit 5 的 `Assertions.assertEquals()`, AssertJ/Truth 的 `assertThat(...).isEqualTo(...)` 等）比较实际输出和预期输出。
    - IDE（如 IntelliJ）通常会提供图形界面来运行测试并显示结果（成功是绿色勾号，失败是红色叉号）。

```java
import org.junit.jupiter.api.Test; // JUnit 5
import static org.junit.jupiter.api.Assertions.*; // JUnit 5 Assertions
// 或者使用 AssertJ/Truth (如 PDF Lecture 6 示例)
// import static com.google.common.truth.Truth.assertThat;

public class SortTest { // 对应要测试的 Sort 类

    // 测试一个简单的排序场景
    @Test
    public void testSimpleSort() {
        String[] input = {"c", "a", "b"};
        String[] expected = {"a", "b", "c"};
        // Sort.sort(input); // 调用被测试的排序方法 (假设存在)
        // 使用 JUnit 5 断言
        // assertArrayEquals(expected, input, "数组排序结果不正确");

        // 如果使用 AssertJ/Truth (模拟 PDF 风格)
        // assertThat(input).isEqualTo(expected);
    }

    // 测试空数组
    @Test
    public void testEmptySort() {
        String[] input = {};
        String[] expected = {};
        // Sort.sort(input);
        // assertArrayEquals(expected, input);
    }

    // 测试已排序数组
    @Test
    public void testAlreadySorted() {
        String[] input = {"a", "b", "c"};
        String[] expected = {"a", "b", "c"};
        // Sort.sort(input);
        // assertArrayEquals(expected, input);
    }
}
```

## 2.5 测试用例设计（边界值测试、等价类划分）(Test Case Design - Boundary Values, Equivalence Partitioning)

设计有效的测试用例是测试的关键。目标是用最少的测试用例覆盖尽可能多的潜在错误场景。

- **等价类划分 (Equivalence Partitioning):** 将输入数据划分为若干个等价类，假设同一等价类中的数据在揭示错误方面具有相同的效果。只需从每个等价类中选取一个代表性的数据作为测试用例即可。
    - 例如，对于一个接收正整数的方法，可以将输入划分为：有效正整数、零、负整数、非整数等。
- **边界值分析 (Boundary Value Analysis):** 错误常常发生在输入或输出范围的边界上。因此要特别关注这些边界值及其相邻值。
    - 例如，对于处理数组的方法，要测试空数组、只有一个元素的数组、达到最大容量的数组等边界情况。
    - 对于数值范围，测试最小值、最大值、略大于最小值、略小于最大值等。
- **常见测试场景:**
    - **正常情况:** 测试典型的、有效的输入。
    - **边界情况:** 如上所述。
    - **异常情况:** 测试无效的输入、可能导致错误或异常的输入（如 null、非法参数）。
    - **特殊值:** 如 0, -1, null, 空字符串, 重复元素等。

测试覆盖率 (Test Coverage)

- 测试覆盖率是衡量测试完整性的一个指标，表示被测试代码在多大程度上被测试用例执行过。
- **常见的覆盖率类型:**
    - **行覆盖率 (Line Coverage):** 代码中有多少行被执行过。
    - **分支覆盖率 (Branch Coverage):** 条件语句（如 `if`, `while`）的每个分支（true/false）是否都被执行过。
    - **方法覆盖率 (Method Coverage):** 有多少个方法被调用过。
- 高覆盖率**不**保证代码没有 Bug，但低覆盖率通常意味着测试不充分，有较多未经测试的代码路径。
- 目标是达到合理的覆盖率（具体标准因项目而异），并结合有效的测试用例设计。

# 面向对象基础

面向对象编程（Object-Oriented Programming, OOP）是一种强大的编程范式，它将数据和操作数据的方法捆绑在一起，形成“对象”。Java 是一种深度贯彻面向对象思想的语言。

## 3.1 类和对象 (Classes and Objects)

- **类 (Class):** 类是创建对象的蓝图或模板。它定义了一类对象共有的属性（实例变量）和行为（方法）。在 Java 中，几乎所有的代码都必须存在于类之中。类使用 `public class ClassName { ... }` 来定义。
- **对象 (Object):** 对象是类的实例（Instance）。每个对象都拥有类定义的属性（有自己的状态）和方法。使用 `new` 关键字可以根据类创建对象（实例化），例如 `Dog d = new Dog();`。
- **实例变量 (Instance Variables):** 定义在类中，但在任何方法之外的变量。每个对象都拥有自己的一套实例变量副本，用于存储对象的状态。例如，`Dog` 类可以有 `weightInPounds` 实例变量。
- **方法 (Methods):** 定义在类中的函数，用于表示对象的行为或操作对象的数据。方法可以访问和修改对象的实例变量。

```java
// 示例：定义一个简单的 Car 类
public class Car {
    // 实例变量
    public String model;
    public int wheels;
    private double gas; // 使用 private 封装

    // 构造函数 (稍后详述)
    public Car(String m) {
        this.model = m;
        this.wheels = 4;
        this.gas = 10.0; // 初始油量
    }

    // 实例方法
    public void drive() {
        if (this.wheels < 4) {
            System.out.println(this.model + " 轮子不够，不能开！");
            return;
        }
        if (this.gas <= 0) {
             System.out.println(this.model + " 没油了！");
             return;
        }
        this.gas -= 1.0; // 假设开动耗油
        System.out.println(this.model + " Vroom Vroom!");
    }

    public int getNumWheels() {
        return this.wheels;
    }

     public double gasLeft() {
         return this.gas;
     }

     public void addGas(double amount) {
         this.gas += amount;
     }

    // 模拟事故的方法
    public void driveIntoDitch(int wheelsLost) {
        this.wheels -= wheelsLost;
    }

    // main 方法用于测试
    public static void main(String[] args) {
        Car c1 = new Car("Porsche 911");
        Car c2 = new Car("Toyota Camry");

        c1.drive(); // 输出: Porsche 911 Vroom Vroom!
        c1.driveIntoDitch(2);
        c1.drive(); // 输出: Porsche 911 轮子不够，不能开！
        System.out.println("Camry 的轮子数量: " + c2.getNumWheels()); // 输出: Camry 的轮子数量: 4
        System.out.println("911 剩余油量: " + c1.gasLeft()); // 输出: 911 剩余油量: 9.0
    }
}
```

## 3.2 构造函数和析构函数 (Constructors and Destructors)

- **构造函数 (Constructor):** 是一种特殊的方法，用于初始化新创建的对象。它的名称必须与类名完全相同，并且没有返回类型。当你使用 `new` 关键字创建对象时，构造函数会被自动调用。一个类可以有多个构造函数（方法重载）。如果类没有显式定义构造函数，Java 会提供一个默认的无参构造函数。

    ```java
    public class Dog {
        public int weightInPounds;
    
        // 构造函数
        public Dog(int w) {
            weightInPounds = w; // 初始化实例变量
        }
        // ... 其他方法
    }
    // 使用构造函数创建对象
    Dog d = new Dog(20); // 调用上面的构造函数
    ```

- **析构函数 (Destructor):** Java 没有像 C++ 那样的显式析构函数。Java 依赖于**垃圾收集器 (Garbage Collector)** 自动管理内存。当一个对象不再被任何引用指向时，垃圾收集器会在未来的某个时间点回收该对象所占用的内存。程序员通常不需要手动管理内存的释放。

## 3.3 方法重载和重写 (Method Overloading and Overriding)

- **方法重载 (Overloading):** 指在同一个类中，可以有多个同名的方法，但它们的参数列表必须不同（参数个数、类型或顺序不同）。编译器根据调用时提供的参数来决定执行哪个方法。这与返回类型无关。

    ```java
    public class Calculator {
        public int add(int a, int b) {
            return a + b;
        }
    
        public double add(double a, double b) { // 重载 add 方法
            return a + b;
        }
    }
    ```

- **方法重写 (Overriding):** 指子类提供了一个与其父类（或实现的接口）中某个方法具有**相同签名**（相同名称、相同参数列表、相同返回类型或协变返回类型）的具体实现。这用于实现多态。通常建议使用 `@Override` 注解来明确表示重写，这有助于编译器检查错误（例如拼写错误）。

    ```java
    public interface Animal {
        void makeNoise(); // 接口方法
    }
    
    public class Dog implements Animal {
        @Override // 明确表示重写
        public void makeNoise() {
            System.out.println("Bark!");
        }
    }
    
    public class Pig implements Animal {
        @Override
        public void makeNoise() {
            System.out.println("Oink!");
        }
    }
    ```

## 3.4 接口和抽象类 (Interfaces and Abstract Classes)

- **接口 (Interface):** 接口定义了一组方法签名（契约），但通常不提供方法的具体实现（Java 8 之后允许 `default` 和 `static` 方法带有实现）。一个类可以通过 `implements` 关键字来实现一个或多个接口，并必须提供接口中所有（非默认）方法的具体实现。接口用于定义“是什么”（What / capability），强制实现类具有某些行为。接口支持多重继承（一个类可以实现多个接口）。

    ```java
    // 定义 List61B 接口
    public interface List61B<Item> {
        void addFirst(Item x);
        void addLast(Item y);
        Item get(int i);
        int size();
        Item removeLast();
        // Java 8+ 允许默认实现
        default public void print() {
            for (int i = 0; i < size(); i += 1) {
                System.out.print(get(i) + " ");
            }
            System.out.println();
        }
    }
    
    // AList 类实现 List61B 接口
    public class AList<Item> implements List61B<Item> {
        // ... AList 的具体实现 ...
        @Override
        public void addFirst(Item x) { /* 实现代码 */ }
        @Override
        public void addLast(Item y) { /* 实现代码 */ }
        // ... 实现其他方法 ...
    }
    ```

- **抽象类 (Abstract Class):** 抽象类使用 `abstract` 关键字声明，它可以包含抽象方法（只有签名，没有实现）和具体方法（有实现）。抽象类不能被实例化，必须被子类继承。子类需要实现父类中所有的抽象方法，除非子类自己也是抽象类。抽象类常用于表示“是一个”（Is-a）的关系，并提供一些通用的实现给子类共享。一个类只能继承一个抽象类（单继承）。（PDF 中未深入讨论抽象类，但接口是其重要补充）。

## 3.5 包装类和自动装箱/拆箱 (Wrapper Classes and Autoboxing/Unboxing)

- **包装类 (Wrapper Classes):** Java 为每种基本数据类型（`int`, `double`, `boolean` 等）提供了对应的包装类（`Integer`, `Double`, `Boolean` 等）。这些包装类是对象，使得基本类型可以参与到面向对象的操作中，例如作为泛型参数或存储在集合中。
- **自动装箱 (Autoboxing):** Java 编译器自动将基本类型转换为对应的包装类对象。例如，`Integer i = 10;` 实际上编译器会处理成 `Integer i = Integer.valueOf(10);`。
- **自动拆箱 (Unboxing):** Java 编译器自动将包装类对象转换为对应的基本类型。例如，`int val = i;` 实际上编译器会处理成 `int val = i.intValue();`。

```java
import java.util.ArrayList;
import java.util.List;

public class WrapperDemo {
    public static void main(String[] args) {
        // 自动装箱：基本类型 int -> 包装类 Integer
        Integer autoboxedInt = 100;

        // 自动拆箱：包装类 Integer -> 基本类型 int
        int unboxedInt = autoboxedInt;

        System.out.println("Autoboxed: " + autoboxedInt); // 输出: Autoboxed: 100
        System.out.println("Unboxed: " + unboxedInt);   // 输出: Unboxed: 100

        // 泛型必须使用包装类
        List<Integer> list = new ArrayList<>();
        list.add(1); // 自动装箱: list.add(Integer.valueOf(1));
        list.add(2); // 自动装箱

        int firstElement = list.get(0); // 自动拆箱: list.get(0).intValue();
        System.out.println("First element from list: " + firstElement); // 输出: First element from list: 1
    }
}
```

# 静态方法与动态方法

Java 中的方法根据是否与特定对象实例相关联，分为静态方法和动态方法（也称实例方法）。

## 4.1 静态变量和静态方法的使用场景 (Use Cases for Static Variables and Methods)

- **静态变量 (Static Variables):**

    - 使用 `static` 关键字声明。
    - 属于类本身，而不是类的任何特定对象（实例）。
    - 类的所有对象共享同一个静态变量副本。
    - 内存中只有一份拷贝。
    - 通常用于表示类级别的常量（结合 `final`）或计数器等。
    - 可以通过类名直接访问（`ClassName.staticVariable`），也可以通过对象访问（但不推荐）。
    - 示例: `public static String binomen = "Canis familiaris";` 这个犬科的学名对于所有的 `Dog` 对象都是一样的。

- **静态方法 (Static Methods):**

    - 使用 `static` 关键字声明。

    - 属于类本身，不依赖于任何对象实例即可调用。

    - 通过类名直接调用（`ClassName.staticMethod()`）。

    - **不能**直接访问类的非静态（实例）变量或调用非静态方法，因为静态方法执行时不关联任何特定对象（没有 `this` 引用）。

    - **可以**访问类的静态变量和调用其他静态方法。

    - 常用于工具类方法（如 `Math.max()`）或工厂方法（用于创建对象）。

    - `main` 方法必须是静态的，因为 JVM 需要在创建任何对象之前就能调用它来启动程序。

    - 示例:

        ```java
        public class Dog {
            public int weightInPounds; // 实例变量
            public static String binomen = "Canis familiaris"; // 静态变量
        
            public Dog(int w) { this.weightInPounds = w; }
        
            // 实例方法 (动态方法) - 需要对象来调用
            public void makeNoise() {
                if (weightInPounds < 10) { /* ... */ }
                // 可以访问实例变量 weightInPounds
                // 可以隐式或显式使用 this
            }
        
            // 静态方法 - 通过类名调用 Dog.maxDog(...)
            public static Dog maxDog(Dog d1, Dog d2) {
                // 不能访问 this.weightInPounds
                // 可以访问 d1.weightInPounds 和 d2.weightInPounds
                if (d1.weightInPounds > d2.weightInPounds) {
                    return d1;
                }
                return d2;
            }
        }
        ```

## 4.2 动态方法调用的原理（多态）(Principle of Dynamic Method Dispatch - Polymorphism)

动态方法（实例方法）的调用与对象的**实际类型**（动态类型）在运行时相关联，这是实现多态性的关键。

- **静态类型 (Static Type):** 变量在**编译时**声明的类型。这个类型永远不会改变。编译器使用静态类型来检查方法调用是否合法（即，该类型或其父类型是否声明了该方法）。

- **动态类型 (Dynamic Type):** 变量在**运行时**实际引用的对象的类型。它是在对象实例化时（使用 `new`）确定的，并且可以改变（如果变量被重新赋值指向不同类型的对象）。

- **动态方法选择 (Dynamic Method Selection):** 当调用一个实例方法时（例如 `someList.addLast("elk");`），Java 虚拟机 (JVM) 在**运行时**查看对象的**动态类型**，并调用该动态类型中对应的方法实现。如果子类重写了父类的方法，那么即使变量的静态类型是父类，实际执行的也是子类中重写后的方法。

    ```java
    List61B<String> someList; // 静态类型是 List61B<String>
    
    someList = new SLList<String>(); // 动态类型现在是 SLList<String>
    someList.addLast("elk"); // 调用 SLList 的 addLast 实现
    
    someList = new AList<String>(); // 动态类型现在是 AList<String>
    someList.addLast("bear"); // 调用 AList 的 addLast 实现
    
    // 假设 SLList 重写了 print 方法
    someList = new SLList<String>();
    someList.print(); // 即使静态类型是 List61B, 也会调用 SLList 的 print 实现
    
    // 编译时检查 vs 运行时选择
    SLList<Integer> sl = new VengefulSLList<Integer>(); // 静态类型 SLList, 动态类型 VengefulSLList
    // sl.printLostItems(); // 编译错误! 因为静态类型 SLList 没有 printLostItems 方法
    // 需要类型转换 (Casting) 才能调用
    // ((VengefulSLList<Integer>) sl).printLostItems(); // 运行时调用 VengefulSLList 的方法
    ```

- **多态 (Polymorphism):** 意味着“多种形态”。在 OOP 中，它允许我们使用父类（或接口）类型的引用来指向子类对象，并在运行时根据对象的实际类型调用相应的方法。这使得代码更灵活、可扩展。

## 4.3 Comparable 接口的实现 (Implementing the Comparable Interface)

为了让对象能够进行比较（例如排序或在搜索树中使用），Java 提供了 `Comparable<T>` 接口。

- `Comparable<T>` 接口定义了一个方法：`int compareTo(T other)`。

- 一个类实现 `Comparable<T>` 接口意味着该类的对象可以与类型为 `T` 的其他对象进行比较。通常 `T` 就是该类本身。

- `compareTo(T other)` 方法的实现逻辑：

    - 如果当前对象 (`this`) 小于 `other` 对象，返回负整数。
    - 如果当前对象 (`this`) 等于 `other` 对象，返回零。
    - 如果当前对象 (`this`) 大于 `other` 对象，返回正整数。

- 实现 `Comparable` 接口后，就可以使用依赖于比较的方法，如 `Collections.sort()` 或将对象放入 `TreeSet` / `TreeMap`。

- 示例：让 `Dog` 类可按体重比较。

    ```java
    public class Dog implements Comparable<Dog> { // 实现 Comparable 接口
        public String name;
        public int weightInPounds;
    
        public Dog(String n, int w) {
            this.name = n;
            this.weightInPounds = w;
        }
    
        // 实现 compareTo 方法，按体重比较
        @Override
        public int compareTo(Dog otherDog) {
            // if (this.weightInPounds < otherDog.weightInPounds) {
            //     return -1;
            // } else if (this.weightInPounds == otherDog.weightInPounds) {
            //     return 0;
            // } else {
            //     return 1;
            // }
            // 更简洁的写法:
            return this.weightInPounds - otherDog.weightInPounds;
        }
    
        // ... 其他方法 ...
    
        // 可以在需要比较的地方使用
        public static Comparable max(Comparable[] items) {
             if (items == null || items.length == 0) return null;
             int maxDex = 0;
             for (int i = 0; i < items.length; i += 1) {
                 // 使用 compareTo 进行比较
                 if (items[i].compareTo(items[maxDex]) > 0) {
                     maxDex = i;
                 }
             }
             return items[maxDex];
         }
    
        public static void main(String[] args) {
             Dog[] dogs = {new Dog("Elyse", 3), new Dog("Sture", 9), new Dog("Benjamin", 15)};
             Dog maxDog = (Dog) max(dogs); // 调用 max 方法
             System.out.println("Max dog by weight: " + maxDog.name); // 输出: Max dog by weight: Benjamin
         }
    }
    ```

- **Comparator 接口:** 如果想根据不同的标准比较对象（例如，按狗的名字而不是体重），或者无法修改类的源代码使其实现 `Comparable`，可以使用 `Comparator<T>` 接口。`Comparator` 是一个独立的比较器类，需要实现 `int compare(T o1, T o2)` 方法。

# 迭代器

迭代器（Iterator）提供了一种统一的方式来顺序访问集合（如 List, Set）中的元素，而无需暴露集合的内部表示。

## 5.1 迭代器的实现（Iterator 接口）(Implementing Iterators - Iterator Interface)

- Java 的 `java.util.Iterator<E>` 接口定义了迭代器的基本操作：
    - `boolean hasNext()`: 检查序列中是否还有下一个元素。
    - `E next()`: 返回序列中的下一个元素，并将迭代器的位置向前移动一位。如果 `hasNext()` 返回 `false` 时调用 `next()`，通常会抛出 `NoSuchElementException`。
    - `void remove()`: (可选操作) 从集合中移除 `next()` 方法最后返回的那个元素。并非所有迭代器都支持此操作。
- 要让一个集合类支持迭代（特别是支持增强型 for 循环），该类需要实现 `java.lang.Iterable<E>` 接口。
- `Iterable<E>` 接口只有一个方法：`Iterator<E> iterator()`。这个方法需要返回一个实现了 `Iterator<E>` 接口的对象实例。
- 通常，迭代器实现为一个内部类（或匿名内部类），因为它可以方便地访问外部集合类的数据。

## 5.2 自定义迭代器 (Custom Iterators)

我们可以为自己的集合类创建自定义的迭代器。

```java
import java.util.Iterator;
import java.util.NoSuchElementException;

// 假设我们有一个 ArraySet 类
public class ArraySet<T> implements Iterable<T> { // 实现 Iterable 接口
    private T[] items;
    private int size;

    public ArraySet() {
        items = (T[]) new Object[100]; // 简化处理，固定大小
        size = 0;
    }

    public void add(T x) {
        if (x == null) {
            throw new IllegalArgumentException("Cannot add null to ArraySet.");
        }
        // 简化：不检查重复
        if (contains(x)) { return; } // 避免重复
        items[size] = x;
        size += 1;
        // 实际应用中需要考虑数组扩容
    }

     public boolean contains(T x) {
        for (int i = 0; i < size; i++) {
            // 注意：比较对象内容用 equals, 而不是 ==
            if (items[i].equals(x)) {
                return true;
            }
        }
        return false;
    }

    // 实现 Iterable 接口的方法，返回一个 Iterator 实例
    @Override
    public Iterator<T> iterator() {
        return new ArraySetIterator();
    }

    // 定义一个内部类来实现 Iterator 接口
    private class ArraySetIterator implements Iterator<T> {
        private int currentPosition;

        public ArraySetIterator() {
            currentPosition = 0;
        }

        @Override
        public boolean hasNext() {
            // 检查当前位置是否小于集合的大小
            return currentPosition < size;
        }

        @Override
        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            // 获取当前位置的元素
            T returnItem = items[currentPosition];
            // 移动到下一个位置
            currentPosition += 1;
            return returnItem;
        }

        // remove() 方法通常比较复杂，这里选择不支持
        @Override
        public void remove() {
            throw new UnsupportedOperationException("remove() is not supported by ArraySetIterator.");
        }
    }

    // toString 方法
    @Override
    public String toString() {
        StringBuilder returnString = new StringBuilder("{");
        for (int i = 0; i < size; i++) {
            returnString.append(items[i].toString());
            if (i < size - 1) {
                 returnString.append(", ");
            }
        }
        returnString.append("}");
        return returnString.toString();
    }

     // equals 方法
    @Override
    public boolean equals(Object other) {
        // 1. 检查是否是同一个对象引用
        if (this == other) return true;
        // 2. 检查 other 是否为 null
        if (other == null) return false;
        // 3. 检查 other 的运行时类型是否是 ArraySet
        if (this.getClass() != other.getClass()) return false;
        // 4. 类型转换
        ArraySet<?> o = (ArraySet<?>) other; // 使用通配符 ?
        // 5. 检查大小是否相等
        if (this.size != o.size) return false;
        // 6. 检查所有元素是否都包含在对方集合中 (集合不考虑顺序)
        for (int i = 0; i < this.size; i++) {
            if (!o.contains(this.items[i])) {
                return false;
            }
        }
        return true;
    }


    public static void main(String[] args) {
        ArraySet<String> s = new ArraySet<>();
        s.add("oakland");
        s.add("Toronto");
        s.add("Minneapolis");
        s.add("oakland"); // 重复添加无效
        s.add("Taipei");

        // 使用自定义的迭代器 (隐式通过增强 for 循环)
        System.out.println("Iterating using enhanced for loop:");
        for (String city : s) { // 这里会自动调用 iterator() 方法获取迭代器
            System.out.println(city);
        }

        // 显式使用迭代器
        System.out.println("\nIterating using explicit iterator:");
        Iterator<String> seer = s.iterator();
        while (seer.hasNext()) {
            String city = seer.next();
            System.out.println(city);
        }

        System.out.println("\nSet contents: " + s); // 调用 toString

        ArraySet<String> s2 = new ArraySet<>();
        s2.add("Toronto");
        s2.add("Taipei");
        s2.add("oakland");
        s2.add("Minneapolis");

        System.out.println("s equals s2? " + s.equals(s2)); // 调用 equals, 输出: true
    }
}
```

## 5.3 迭代器与集合的关系 (Relationship between Iterators and Collections)

- 迭代器模式将**遍历**集合的责任从集合本身分离出来，交给了迭代器对象。
- 这使得集合类的实现可以更专注于数据存储和管理，而迭代器则专注于遍历逻辑。
- 通过实现 `Iterable` 接口，集合类声明了它“能够”被迭代。
- 通过 `iterator()` 方法返回具体的 `Iterator` 对象，该对象知道如何在该特定集合上进行迭代。
- Java 的**增强型 for 循环**（for-each loop）是基于 `Iterable` 和 `Iterator` 接口的语法糖。当你写 `for (Element e : collection)` 时，编译器会自动转换成使用 `collection.iterator()` 获取迭代器并调用 `hasNext()` 和 `next()` 的代码。这使得遍历集合的代码更加简洁易读。

