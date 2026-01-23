---
title: CMake：自动化构建的利器
published: 2024-11-23
updated: 2024-11-23
description: '`Makefile`跟系统的编译有很重要的相关，在不同的系统上`Makefile`编译出来的文件是不相同的，这时候对于我们跨平台解决问题有一个致命问题，好在我们有`CMake`来解决这一难题。'
image: './img.png'
tags: [BuildTools, Cpp, Linux] 
category: "System-Dev"
draft: false 
lang: zh_CN
---


# 前言

在现代软件开发中，构建系统是不可或缺的一部分。CMake 作为一种跨平台的自动化构建系统生成器，极大地简化了项目的编译和构建过程。与 Makefile 类似，CMake 通过编写配置文件（CMakeLists.txt）来定义项目的构建规则，但它的优势在于更高的可移植性和更强大的功能。CMake 可以生成多种构建系统，如 Makefile、Visual Studio 解决方案等，从而满足不同开发环境的需求。

>[!TIP]
>本课程笔记源自 [CMake 官方文档](https://cmake.org/documentation/) 和 [CMake 教程](https://www.bilibili.com/video/BV1bg411p7oS/?)

CMake 涉及到 C++ 的多文件编译与运行，以下是一个简单的示例项目结构：

```
project/
├── CMakeLists.txt
├── main.cpp
├── factorial.cpp
├── printhello.cpp
└── functions.h
```

其中代码内容如下：

`main.cpp`

```cpp
#include <iostream>
#include "functions.h"
using namespace std;

int main() {
    printhello();
    cout << "This is main:" << endl;
    cout << "The factorial of 5 is: " << factorial(5) << endl;
    return 0;
}
```

`factorial.cpp`

```cpp
#include "functions.h"

int factorial(int n) {
    if (n == 1)
        return 1;
    else
        return n * factorial(n - 1);
}
```

`printhello.cpp`

```cpp
#include <iostream>
#include "functions.h"

using namespace std;

void printhello() {
    cout << "Hello world" << endl;
}
```

`functions.h`

```cpp
#ifndef _FUNCTIONS_H_
#define _FUNCTIONS_H_

void printhello();
int factorial(int n);

#endif
```

# 法一（不使用 CMake）：

直接使用 `g++` 编译项目：

```bash
cd project
g++ main.cpp factorial.cpp printhello.cpp -o main
./main
```

或者手动编译每个源文件并链接：

```bash
g++ main.cpp -c
g++ factorial.cpp -c
g++ printhello.cpp -c
g++ *.o -o main
./main
```

---

# 法二（使用 CMake）：

## version1

创建一个简单的 `CMakeLists.txt` 文件：

```cmake
# VERSION 1
# 设置 CMake 的最低版本要求
cmake_minimum_required(VERSION 3.0)

# 设置项目名称
project(MyProject)

# 添加可执行文件
add_executable(hello main.cpp printhello.cpp factorial.cpp)
```

运行 CMake：

```bash
cd project
mkdir build
cd build
cmake ..
make
./hello
```

## version2

更灵活的 `CMakeLists.txt` 文件：

```cmake
# VERSION 2
cmake_minimum_required(VERSION 3.0)
project(MyProject)

# 设置 C++ 编译器选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -std=c++11")

# 添加源文件
set(SOURCE_FILES main.cpp printhello.cpp factorial.cpp)

# 添加可执行文件
add_executable(hello ${SOURCE_FILES})
```

运行步骤与 version1 相同。

## version3

使用变量和更复杂的构建规则：

```cmake
# VERSION 3
cmake_minimum_required(VERSION 3.0)
project(MyProject)

# 设置 C++ 编译器选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -std=c++11")

# 添加源文件
set(SOURCE_FILES main.cpp printhello.cpp factorial.cpp)

# 添加可执行文件
add_executable(hello ${SOURCE_FILES})

# 添加自定义目标
add_custom_target(run_hello COMMAND ./hello)
```

运行步骤：

```bash
cd project
mkdir build
cd build
cmake ..
make run_hello
```

## version4

使用 `target_include_directories` 和 `target_link_libraries`：

```cmake
# VERSION 4
cmake_minimum_required(VERSION 3.0)
project(MyProject)

# 设置 C++ 编译器选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -std=c++11")

# 添加源文件
set(SOURCE_FILES main.cpp printhello.cpp factorial.cpp)

# 添加可执行文件
add_executable(hello ${SOURCE_FILES})

# 添加头文件目录
target_include_directories(hello PRIVATE ${CMAKE_SOURCE_DIR})

# 添加链接库（如果有）
# target_link_libraries(hello <library_name>)
```

运行步骤与前面版本相同。

# 小结

CMake 提供了一种高效且灵活的方式来管理项目的构建过程。与手动编写 Makefile 或直接使用编译器命令相比，CMake 的优势在于：

1. **跨平台支持**：CMake 可以生成适用于不同操作系统的构建文件。
2. **易于维护**：通过 `CMakeLists.txt` 文件，可以清晰地定义项目的构建规则。
3. **强大的功能**：支持复杂的项目结构、依赖管理和自定义目标。

在实际项目中，使用 CMake 可以显著提高开发效率，减少重复劳动，并确保构建过程的一致性。

