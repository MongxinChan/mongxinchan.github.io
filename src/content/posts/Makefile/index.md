---
title: Makefile
published: 2024-11-22
updated: 2024-11-22
description: 'Makefile带来的好处就是——“自动化编译”，一旦写好，只需要一个Make命令，整个工程完全自动编译，极大的提高了软件开发的效率。make是一个命令工具，是一个解释makefile中指令的命令工具，一般来说，大多数的IDE都有这个命令，比如：Delphi的make，Visual C++的nmake，Linux下GNU的make。可见，Makefile都成为了一种在工程方面的编译方法。'
image: './img.png'
category: "System-Dev"
tags: [Makefile, BuildTools, Linux]
draft: false 
lang: zh_CN
---
# 前言

Makefile带来的好处就是——“自动化编译”，一旦写好，只需要一个Make命令，整个工程完全自动编译，极大的提高了软件开发的效率。make是一个命令工具，是一个解释makefile中指令的命令工具，一般来说，大多数的IDE都有这个命令，比如：Delphi的make，Visual C++的nmake，Linux下GNU的make。可见，Makefile都成为了一种在工程方面的编译方法。

>[!TIP]
>本课程笔记源自[Makefile](https://www.bilibili.com/video/BV188411L7d2),以及[CMake](https://www.bilibili.com/video/BV1bg411p7oS/?)

Makefile涉及到cpp的多文件同时编译与运行，我们在编译一下代码的时候会涉及到：

`main.cpp`

```cpp
#include <iostream>
#include "functions.h"
using namespace std;
 
int main()
{
    printhello();
    cout << "This is main:" << endl;
    cout << "The factorial of 5 is: " << factorial(5) << endl;
    return 0;
}
```

`factorial.cpp`

```cpp
#include "functions.h"
 
int factorial(int n)
{
    if(n == 1)
            return 1;
    else
            return n * factorial(n-1);
}
```

`printhello.cpp`

```cpp
#include <iostream>
#include "functions.h"
 
using namespace std;
 
void printhello()
{
    int i;
    cout << "Hello world" << endl;
}
```

`function.h`

```cpp
#ifndef _FUNCTIONS_H_
#define _FUNCTIONS_H_
void printhello();
int factorial(int n);
#endif
```

# 法一(不使用makefile)：

进入learn_makefile生成可执行程序文件`main`

```bash
cd learn_makefile
g++ main.cpp factorial.cpp printhello.cpp -o main
./main
```

逐个**编译**：
```bash
g++ main.cpp -c
g++ factorial.cpp -c
g++ helloprint.cpp -c
```

再进行**链接**：

```bash
g++ *.o -o main
```

我们再用`g++`来运行

```bash
./main
```

---

一般我们用

```
rm *.o
rm main
```

删除`.o`文件和`main`

# 法二(创建Makefile文件):

## verison1

```makefile
# VERSION 1
# hello为生成的可执行文件，依赖于后面的三个.cpp文件
# g++前面加一个TAB的空格
hello: main.cpp printhello.cpp factorial.cpp
	g++ -o hello main.cpp printhello.cpp factorial.cpp
```

```makefile
cd learn_makefile
make
./hellop
```

缺点:文件多时，编译时间长

## version2

`Makefile`文件有：

```makefile
# VERSION 2
CXX = g++
TARGET = hello
OBJ = main.o printhello.o factorial.o
# make时执行g++ 先找TARGET，TARGET不存在找OBJ，OBJ不存在，编译三个.cpp文件生成.o文件
# 然后再编译OBJ文件，生成可执行文件hello
$(TARGET): $(OBJ)
	$(CXX) -o $(TARGET) $(OBJ)
# main.o这样来的，编译main.cpp生成
main.o: main.cpp
	$(CXX) -c main.cpp
printhello.o: printhello.cpp
	$(CXX) -c printhello.cpp
factorial.o: factorial.cpp
	$(CXX) -c factorial.cpp
```

## version3

```makefile
# VERSION 3
CXX = g++
TARGET = hello
OBJ = main.o printhello.o factorial.o
 
# 编译选项，显示所有的warning
CXXLAGS = -c -Wall
 
# $@表示的就是冒号前面的TARGET，$^表示的是冒号后OBJ的全部.o依赖文件
$(TARGET): $(OBJ)
	$(CXX) -o $@ $^
 
# $<表示指向%.cpp依赖的第一个，但是这里依赖只有一个
# $@表示指向%.o
%.o: %.cpp
	$(CXX) $(CXXLAGS) $< -o $@
 
# 为了防止文件夹中存在一个文件叫clean
.PHONY: clean
 
# -f表示强制删除，此处表示删除所有的.o文件和TARGET文件
clean:
	rm -f *.o $(TARGET)
```

## version4

```makefile
# VERSION 4
CXX = g++
TARGET = hello
# 所有当前目录的.cpp文件都放在SRC里面
SRC = $(wildcard *.cpp)
# 把SRC里面的.cpp文件替换为.o文件
OBJ = $(patsubst %.cpp, %.o,$(SRC))
 
CXXLAGS = -c -Wall
 
$(TARGET): $(OBJ)
	$(CXX) -o $@ $^
 
%.o: %.cpp
	$(CXX) $(CXXLAGS) $< -o $@
 
.PHONY: clean
clean:
	rm -f *.o $(TARGET)
```

# 小结

写项目的时候我们如果采用`Makefile`方法，我们的脚本仅仅需要写一次，而用gcc命令的话，我们每次都需要重新写一遍。