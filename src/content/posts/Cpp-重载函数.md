---
title: 重载函数
published: 2024-11-21
updated: 2024-11-22
description: '`Cpp` 的重载函数是依据于 `Argument-dependent lookup`（也称作 ADL），也就是说，即使有相同的函数名，但是我们也依据参数列表的不同来调用，这涉及到编译原理。我们知道，利用 `.cpp` 文件可以编译成 `.obj` 文件，再通过链接器链接变成 `.exe` 文件，而 `Cpp` 的重载特性就是从编译器下手的。'
image: ''
tags: [ComputerScience,ProgramDesign,Cpp ]
category: "ComputerScience"
draft: false 
lang: zh_CN
---

# 前言

我们为什么要重载？搞清楚这个问题我们要回顾到 `C` 中，`C99` 中有一个 `<math.h>` 头文件，里面定义了不同的四舍五入方法：

| 数据类型    | 函数名称 | 参数            |
| ----------- | -------- | --------------- |
| double      | round    | (double x)      |
| float       | roundf   | (float x)       |
| long double | roundl   | (long double x) |

我们发现不同的数据类型有不同的函数名，而其效果都是达到一个四舍五入的效果，但是，这种函数名加重了我们的记忆负担，不利于我们去记忆。

`Cpp` 提供了一个函数重载的功能，这个功能可以方便我们记忆函数。

以 `C++11` 的 `<cmath>` 为例：

| 数据类型    | 函数名称 | 参数            |
| ----------- | -------- | --------------- |
| double      | round    | (double x)      |
| float       | round    | (float x)       |
| long double | round    | (long double x) |

# 重载函数如何实现？

`Cpp` 的重载函数是依据于 `Argument-dependent lookup`（也称作 ADL），也就是说，即使有相同的函数名，但是我们也依据参数列表的不同来调用，这涉及到编译原理。我们知道，利用 `.cpp` 文件可以编译成 `.obj` 文件，再通过链接器链接变成 `.exe` 文件，而 `Cpp` 的重载特性就是从编译器下手的。

我们可以自定义多个 `max()` 函数，通过打印来确定我们采用的是哪一个函数：

```cpp
#include <iostream>
using namespace std;

int max(int x, int y) {
    cout << "max(int,int) is called" << endl;
    return x > y ? x : y;
}

float max(float x, float y) {
    cout << "max(float,float) is called" << endl;
    return x > y ? x : y;
}

double max(double x, double y) {
    cout << "max(double,double) is called" << endl;
    return x > y ? x : y;
}

int main() {
    cout << max(3, 5) << endl;       // 调用 int 版本
    cout << max(3.5f, 5.2f) << endl; // 调用 float 版本
    cout << max(3.5, 5.2) << endl;   // 调用 double 版本
    return 0;
}
```

# 防止歧义

在使用重载函数时，需要注意防止歧义。如果编译器无法根据参数类型唯一确定调用的函数版本，就会导致编译错误。例如：

```cpp
void print(int x) {
    cout << "print(int)" << endl;
}

void print(double x) {
    cout << "print(double)" << endl;
}

int main() {
    print(5);    // 明确调用 print(int)
    print(5.0);  // 明确调用 print(double)
    print(5.0f); // 错误！无法确定是调用 print(int) 还是 print(double)
    return 0;
}
```

为了避免歧义，需要确保重载函数的参数类型之间有足够的区分度，或者通过显式类型转换来明确指定调用的版本。

# 重载的规则

1. **参数数量不同**：可以通过参数数量的不同来重载函数。例如：
   ```cpp
   void print() { cout << "No arguments" << endl; }
   void print(int x) { cout << "One int argument" << endl; }
   void print(int x, int y) { cout << "Two int arguments" << endl; }
   ```

2. **参数类型不同**：可以通过参数类型的不同来重载函数。例如：
   ```cpp
   void print(int x) { cout << "print(int)" << endl; }
   void print(double x) { cout << "print(double)" << endl; }
   ```

3. **参数类型顺序不同**：可以通过参数类型的顺序不同来重载函数。例如：
   ```cpp
   void print(int x, double y) { cout << "print(int, double)" << endl; }
   void print(double x, int y) { cout << "print(double, int)" << endl; }
   ```

4. **引用类型不同**：可以通过引用类型的不同来重载函数。例如：
   ```cpp
   void print(int &x) { cout << "print(int &)" << endl; }
   void print(const int &x) { cout << "print(const int &)" << endl; }
   ```

# 重载的限制

1. **返回值类型不能用于重载**：不能仅通过返回值类型的不同来重载函数。例如：
   ```cpp
   int add(int x, int y) { return x + y; }
   double add(int x, int y) { return x + y; } // 错误！无法通过返回值类型重载
   ```

2. **参数默认值不能用于重载**：不能仅通过参数默认值的不同来重载函数。例如：
   ```cpp
   void print(int x = 0) { cout << "print(int)" << endl; }
   void print(int x = 0, int y = 0) { cout << "print(int, int)" << endl; } // 错误！无法通过默认值重载
   ```

# 构造函数重载

构造函数也可以重载，通过不同的参数列表来实现对象的初始化。例如：

```cpp
class Point {
public:
    Point() : x(0), y(0) { cout << "Default constructor" << endl; }
    Point(int x, int y) : x(x), y(y) { cout << "Constructor with two ints" << endl; }
    Point(double x, double y) : x(x), y(y) { cout << "Constructor with two doubles" << endl; }

private:
    int x, y;
};

int main() {
    Point p1;                 // 调用默认构造函数
    Point p2(3, 4);           // 调用 int 版本构造函数
    Point p3(3.5, 4.2);       // 调用 double 版本构造函数
    return 0;
}
```

# 重载与模板

模板函数也可以参与重载。模板函数的实例化是根据模板参数的类型来确定的，因此模板函数可以与普通函数或模板函数重载。例如：

```cpp
#include <iostream>
using namespace std;

template <typename T>
void print(T x) {
    cout << "Template print(T)" << endl;
}

void print(int x) {
    cout << "Non-template print(int)" << endl;
}

int main() {
    print(5);    // 调用非模板版本
    print(5.0);  // 调用模板版本
    return 0;
}
```

# 总结

函数重载是 C++ 提供的一种强大的功能，它允许我们使用相同的函数名来实现不同的功能。通过参数数量、参数类型、参数顺序等的不同，可以实现函数的重载。在使用重载函数时，需要注意避免歧义，并遵循重载的规则。合理使用重载可以提高代码的可读性和可维护性。
