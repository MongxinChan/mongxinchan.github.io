---
title: "[C++]指针与引用" 
published: 2024-11-16 
updated: 2025-05-07  
description: '为了兼容C语言并提供更简洁、更安全的内存操作方式，C++引入了引用的概念。本篇将介绍C++中的指针与引用，以及它们的一些常见用法和区别。' 
image: '' 
category: "System-Dev"
tags: [Cpp]
draft: false 
lang: zh_CN
---



**前言**

在C语言中，指针的使用非常灵活，但也可能因为其复杂性（例如，函数参数和类型声明中过多的星号 `*`）而降低代码的可读性。为了兼容C语言并提供更简洁、更安全的内存操作方式，C++引入了引用的概念。本篇将介绍C++中的指针与引用，以及它们的一些常见用法和区别。

# 指针

**什么是指针？指针是一个变量，它存储的是另一个变量的内存地址。** 指针是一种用于进行内存寻址的操作，它使得我们能够方便地读取和写入特定内存位置的数据。实际上，我们编写的程序执行的许多操作，其核心都是对内存的读取和写入。而指针所关联的“类型”，则是我们为了方便理解和编译器进行类型检查而设定的一种约定，它告诉我们从该地址开始应该解释多少字节（例如，一个`int`通常占用4个字节），以及如何解释这些字节（例如，解释为一个整数、一个浮点数等）。

```cpp
// 示例来源: The Cherno
#include<iostream>

int main(){
    void* ptr = 0; // 创建一个空指针变量。void* 是一种通用指针类型，可以指向任何类型的数据。
    // ptr = nullptr; // C++11及以后版本推荐使用 nullptr
    // std::cin.get();
    return 0;
}
```

通常情况下，内存地址 `0` (或在C++11之前用 `NULL` 表示，C++11及之后推荐用 `nullptr`) 被视为一个无效地址，表示指针不指向任何有效的内存对象。指针可以合法地处于这种“空”或“无效”状态。然而，尝试通过空指针读取或写入数据是未定义行为，通常会导致程序运行时错误（如段错误）。

在C++11中引入了 `nullptr` 关键字，用以取代旧式的 `NULL` (通常是 `0` 或 `(void*)0`)。

> 请避免将 `NULL` 或零 (`0`) 用作 null 指针常量；**`nullptr`** 不仅不易被误用，并且在大多数情况下效果更好。
>
> 例如，给定 func(std::pair<const char *, double>)，那么调用func(std::make_pair(NULL, 3.14)) 会导致编译器错误。 宏 NULL 将扩展到 0，以便调用std::make_pair(0, 3.14)将返回 std::pair<int, double>，此结果不可转换为 func 的 std::pair<const char *, double> 参数类型。
>
> 调用 func(std::make_pair(nullptr, 3.14)) 将会成功编译，因为 std::make_pair(nullptr, 3.14) 返回 std::pair<std::nullptr_t, double>，此结果可转换为 std::pair<const char *, double>。
>
> ——摘自 [nullptr, the pointer literal (since C++11) - cppreference.com](https://en.cppreference.com/w/cpp/language/nullptr)

## 指针的类型与地址值

指针变量存储的是一个地址值，这个地址值本身的大小（通常是4字节或8字节，取决于系统架构）与指针指向的数据类型无关。

```cpp
#include<iostream>

int main(){
    int var = 23;
    void* generic_ptr = &var; // void* 可以存储任何类型对象的地址
    int* int_ptr = &var;      // int* 存储int类型对象的地址

    // 打印地址值（通常以十六进制显示）
    std::cout << "Address stored in generic_ptr: " << generic_ptr << std::endl;
    std::cout << "Address stored in int_ptr: " << int_ptr << std::endl;
    std::cout << "Address of var: " << &var << std::endl;

    return 0;
}
```

如下示例中，即使我们将 `int` 类型变量的地址强制转换为 `double*` 类型指针，该指针存储的地址值仍然是 `var` 的原始地址。

```cpp
#include<iostream>

int main(){
    int var = 23;
    // 将int*强制转换为double*。注意：通过这种方式解引用ptr来访问数据是未定义行为，
    // 因为var实际是int类型，而我们试图按double类型解释它。
    // 这里仅为说明指针存储的地址值不受类型转换影响。
    double* ptr = reinterpret_cast<double*>(&var);

    std::cout << "Address of var: " << &var << std::endl;
    std::cout << "Address stored in ptr (after cast): " << ptr << std::endl;
    return 0;
}
```

我们会发现，无论指针被声明为什么类型（例如 `int*` 或 `double*`），它所存储的变量 `var` 的内存地址值本身是相同的。这进一步证明了指针的类型主要是为了辅助程序员和编译器理解如何解释该地址处的数据（即解引用时读取多少字节以及如何解释这些字节），而不是改变地址本身。

> C++提供了比C语言更安全的强制类型转换方式，如 `static_cast`, `dynamic_cast`, `reinterpret_cast`, `const_cast`。对于不相关的指针类型之间的转换，通常使用 `reinterpret_cast`，但需谨慎，因为它可能导致未定义行为。

当我们对一个指针进行**解引用**操作（使用 `*`）时，指针的类型就变得至关重要了。它告诉编译器应该从该内存地址开始读取多少字节（例如，`int` 通常是4字节，`double` 通常是8字节），并如何将这些字节解释为一个有意义的数值。

我们也可以使用指针动态分配内存，例如使用 `new` 关键字分配一块指定大小的字符数组（缓冲区）：

```cpp
#include<iostream>
#include<cstring> // For memset

int main(){
    // 动态分配一个包含8个char的数组
    char* buffer = new char[8];
    // 将缓冲区所有字节初始化为0
    // 注意：sizeof(buffer) 会得到指针本身的大小（如4或8字节），而不是数组的大小。
    // 这里应明确使用分配时的大小。
    memset(buffer, 0, 8);

    // ptr_to_buffer 是一个指向指针的指针（二级指针）
    char** ptr_to_buffer = &buffer;
    std::cout << "Buffer allocated at: " << (void*)buffer << std::endl; // 打印buffer地址
    std::cout << "ptr_to_buffer points to: " << ptr_to_buffer << " which stores: " << *ptr_to_buffer << std::endl;


    delete[] buffer; // 释放动态分配的数组内存，防止内存泄漏
    buffer = nullptr; // 良好实践：将悬垂指针设为nullptr
    return 0;
}
```

# 引用

引用（Reference）可以看作是C++对指针概念的一种扩展和简化。虽然它们的写法和使用方式有所不同，但在很多情况下，引用在底层通常是通过指针来实现的，因此常被称作一种“语法糖”——它让代码更简洁易读，同时提供了类似指针的功能，但带有更严格的约束。

```cpp
#include<iostream>

int main(){
    int a = 5;
    int& ref = a; // 'ref' 是变量 'a' 的一个引用（别名）。引用在声明时必须初始化。

    ref = 2;      // 修改 'ref' 的值，实际上就是修改 'a' 的值。
    std::cout << "a: " << a << std::endl;     // 输出 a: 2
    std::cout << "ref: " << ref << std::endl; // 输出 ref: 2

    // 打印a和ref的地址，会发现它们是相同的
    std::cout << "Address of a: " << &a << std::endl;
    std::cout << "Address of ref: " << &ref << std::endl; // &ref 取的是a的地址

    return 0;
}
```

一个常见的理解是：引用就是变量的一个“别名”。一旦声明了一个引用并将其初始化为某个变量的别名后，这个引用就和原变量指向同一块内存区域。对引用的任何操作，实际上都是对原变量的操作。

声明引用时，它本身通常不占用新的独立内存空间（相对于它所引用的变量而言），编译器会处理这种关联。

## 2.1 引用不可重定向

引用在初始化后，就不能再“转向”去引用另一个不同的变量。这与指针不同，指针可以在其生命周期内指向不同的内存地址。

就像你有好几个好朋友，但是你能把好朋友A的别名冠给好朋友B吗？这本身算是一种不礼貌的行为，我们的`Cpp`是一位**绅士**，拒绝这种情况的发生。

```cpp
#include<iostream>

int main(){
    int a = 5;
    int b = 8;

    int& ref = a; // 'ref' 初始化为 'a' 的引用。
    std::cout << "a = " << a << ", ref = " << ref << std::endl;

    // int& ref = b; // 编译错误！引用不能被重新声明或重定向到另一个变量。

    ref = b;       // 这不是重定向！这是赋值操作。
                   // 'ref' 仍然是 'a' 的别名，所以这条语句等同于 a = b;
                   // 'a' 的值现在变成了 8。
    std::cout << "After 'ref = b;':" << std::endl;
    std::cout << "a = " << a << std::endl;     // 输出 a = 8
    std::cout << "b = " << b << std::endl;     // 输出 b = 8
    std::cout << "ref = " << ref << std::endl; // 输出 ref = 8 (因为ref是a的别名)

    return 0;
}
```

引用一旦被初始化绑定到一个对象，它就会一直引用该对象，不能再被重新绑定到另一个对象。这种特性类似于一个常量指针（`Type* const pointerName`），即指针本身存储的地址不能改变。

然而，除非引用本身是常量引用（`const Type&`），否则我们仍然可以通过引用来修改它所引用的对象的值。

## 2.2 值传递 (Pass-by-value) 与引用传递 (Pass-by-reference)

在函数调用时，参数传递的方式对函数能否修改外部变量至关重要。

**值传递 (Pass-by-value):**

```cpp
#include<iostream>

// val 是通过值传递的，函数内部的val是外部实参的一个副本
void IncrementByValue(int val){
    val++; // 修改的是副本，不影响外部变量
    std::cout << "Inside IncrementByValue, val = " << val << std::endl;
}

// 辅助打印函数 (避免与 std::log 冲突)
void LogValue(int val){
    std::cout << "Value: " << val << std::endl;
}

int main(){
    int a = 5;
    IncrementByValue(a);
    LogValue(a); // 输出 Value: 5，a的值未改变
    return 0;
}
```

我们会发现打印出来的数值仍然是`5`，并没有增加。这是因为在 `IncrementByValue` 函数中，参数 `val` 是通过“值传递”（Pass-by-value）的方式传入的。

这意味着函数内部的 `val` 是原始变量 `a` 的一个副本（copy）。对这个副本的修改，并不会影响到函数外部的原始变量 `a`。当我们需要在函数内部修改外部变量的值时，值传递就显得不够用了。

这时，我们就需要采用“引用传递”（Pass-by-reference）或通过指针传递地址的方式。

**通过指针传递 (Pass-by-pointer):**

```cpp
#include<iostream>

// val_ptr 是一个指向int的指针
void IncrementByPointer(int* val_ptr){
    if (val_ptr) { // 检查指针是否有效
        (*val_ptr)++; // 解引用指针，修改指针指向的原始数据
    }
}

void LogValue(int val){
    std::cout << "Value: " << val << std::endl;
}

int main(){
    int a = 5;
    IncrementByPointer(&a); // 传递a的地址
    LogValue(a); // 输出 Value: 6，a的值已改变
    return 0;
}
```

**通过引用传递 (Pass-by-reference):**

```cpp
#include<iostream>

// val_ref 是一个int的引用
void IncrementByReference(int& val_ref){
    val_ref++; // 直接修改val_ref，就是修改它引用的原始数据
}

void LogValue(int val){
    std::cout << "Value: " << val << std::endl;
}

int main(){
    int a = 5;
    IncrementByReference(a); // 传递a本身，函数接收的是a的引用
    LogValue(a); // 输出 Value: 6，a的值已改变
    return 0;
}
```

通过引用传递，代码看起来比指针传递更简洁，因为不需要显式的解引用（`*`）和取地址（`&`）操作（在调用处）。编译器在编译后生成的代码通常与指针版本非常相似。

# 指针与引用的主要差异

指针和引用虽然在很多场景下可以达到相似的目的（间接访问和修改数据），但它们之间存在一些关键差异：

1. **初始化**:
    - **引用**：在声明时**必须**被初始化，并且一旦初始化后，就不能再引用其他对象。
    - **指针**：在声明时可以不初始化（但这通常是不安全的，可能导致野指针），也可以在后续指向其他对象（或 `nullptr`）。
2. **空值 (Nullability)**:
    - **引用**：必须引用一个有效的对象，不存在“空引用”的概念（尽管可以通过某些技巧产生悬垂引用，但这属于错误用法，应极力避免）。
    - **指针**：可以被赋值为 `nullptr`，表示它不指向任何有效的对象。因此，在使用指针前通常需要检查其是否为 `nullptr`。
3. **操作方式**:
    - **引用**：像普通变量一样直接使用，编译器会自动处理其作为别名的特性（隐式解引用）。
    - **指针**：访问指针指向的数据需要显式解引用（使用 `*` 操作符）。获取对象的地址需要使用 `&` 操作符。
4. **内存占用**:
    - **引用**：通常被认为是其所引用对象的一个别名，一般不占用额外的内存空间（编译器可能会进行优化）。
    - **指针**：指针变量本身需要占用内存来存储地址值（例如，32位系统上占4字节，64位系统上占8字节）。
5. **算术运算**:
    - **引用**：不能对引用本身进行算术运算。对引用进行的算术运算实际上是作用于其引用的对象上。
    - **指针**：可以对指针进行算术运算（如 `ptr++` 使指针指向内存中下一个相同类型的元素，`ptr + n` 等）。

**示例对比：**

如果通过指针操作：

```cpp
#include<iostream>

// 函数接收一个int指针
void LogViaPointer(int* val_ptr){
    if (val_ptr) { // 必须检查指针是否为nullptr
        std::cout << "Value via pointer: " << *val_ptr << std::endl; //显式解引用
    } else {
        std::cout << "Pointer is null." << std::endl;
    }
}

int main(){
    int value = 3;
    int* ptr = &value; // 指针ptr存储value的地址

    LogViaPointer(ptr);    // 传递指针
    LogViaPointer(&value); // 传递value的地址
    LogViaPointer(nullptr); // 可以传递nullptr

    int* uninitialized_ptr; // 未初始化的指针 (危险)
    // LogViaPointer(uninitialized_ptr); // 行为未定义

    ptr = nullptr; // 指针可以被重新赋值为nullptr
    LogViaPointer(ptr);
    return 0;
}
```

如果通过引用操作：

```cpp
#include<iostream>

// 函数接收一个int引用
void LogViaReference(int& val_ref){
    // 不需要检查空值，因为引用必须绑定到有效对象
    // (除非是悬垂引用，那是编程错误)
    std::cout << "Value via reference: " << val_ref << std::endl; // 直接使用，隐式解引用
}

int main(){
    int value = 3;
    // int& ref; // 编译错误！引用必须在声明时初始化。

    int& ref_to_value = value; // 引用ref_to_value是value的别名
    LogViaReference(ref_to_value);
    LogViaReference(value); // 直接传递变量，函数自动接收其引用

    // int& null_ref = nullptr; // 编译错误！引用不能初始化为nullptr。

    return 0;
}
```

*(注：原文中关于 `void log(*val){}` 和 `void log(&val){}` 的函数声明方式有误，正确的函数参数声明应为 `void FuncName(int* val_ptr){}` 用于指针，以及 `void FuncName(int& val_ref){}` 用于引用。以上示例已修正。)*

# 写在后面

通过对比可以发现，C++ 在C语言的基础上提供了更为丰富和安全的特性。引用作为C++的一个重要补充，使得某些场景下的代码（尤其是函数参数传递和操作符重载）更加简洁和直观。

同时，C++依然保留了C语言指针的强大功能，并对其进行了扩展（如智能指针等）。

理解指针和引用的差异与适用场景，是掌握C++内存管理和高效编程的关键一步。这些概念也是后续学习C++类、对象以及更高级特性（如多态、RAII等）的重要基础。