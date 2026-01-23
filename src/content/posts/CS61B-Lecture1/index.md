---
title: CS61B Lecture 1
published: 2024-12-01
updated: 2024-12-02
description: 'Welcome to my CS61B lecture notes!'
image: ''
tags: [Java, CS61B]
category: "CS-Basics"
lang: en
---
>[!TIP]
>
>Welcome to my CS61B lecture notes!
>In this notice, I will be sharing my notes and resources related to [the course](https://sp24.datastructur.es/) `CS61B: Data Structures` taught by Justin Yokota and Peyrin Kao . 
>I will be posting my lecture notes, assignments, and other materials that I have completed during the course. I hope that these notes will be helpful to others who are taking the course. If you have any questions or feedback, please feel free to contact me. Thank you for your attention.
>
>If you wanna read the Chinese Edition,[Click Here](https://www.loners.site/posts/cs61b-lecture1-cn/)

>[!NOTE]
>
> The lecture shows the different between Java and Python(CS61A).
> I will try my best to translate it.
> And at the same time, the `PPT`,`lab-file` also use the English,I will write **the English notes but not all.**
>


# What is CS61B about?

- **Writing code that runs efficiently**
    - Good algorithms
    - Good data structures
- **Writing code efficiently**
    - Designing, building, testing, and debugging large programs
    - Use of programming tools
        - git, IntelliJ, JUnit, and various command line tools
    - Java (not the focus of the course)

**Assumes a solid foundation in programming fundamentals, including:**
- **Object-oriented programming, recursion, lists, and trees**

## Other Great Features of CS61B:

- **The most popular topics for job interview questions in software engineering**
    - Examples: Hash tables, binary search trees, quick sort, graphs, Dijkstra's algorithm
- **Some really cool math**
    - Examples:
        - Asymptotic analysis
        - Resizing arrays
        - The isometry between self-balancing 2-3 trees and self-balancing red-black trees
        - Graph theory
        - P=NP
- **Once you're done: The confident sense that you can build any software**

---

## Question for You

- **What do you hope/expect to learn from this class? Why are you taking it?**
    - Job
    - I want to be able to run my code efficiently (finally)
    - I want an A
    - Coding from scratch
    - Greater grasp of data structures and algorithms

- **Who are you?**
    - Freshman? Sophomore? Junior? Senior? Grad student? None of the above?
    - CS Major? Intending to be a CS Major? Something else?
    - CS 61A? Java experience

> [!NOTE]
> 
> By the time you leave this class, I want everyone to be able to write a program just for fun, because they have some problems they need to solve or they just want to, I donot konw, waste a weekend doing something.
---

## Course Components

- **Lectures** provide you with an introduction and a foundation.
- **You'll learn most of what you learn in the class by:**
    - Programming (labs, homeworks, projects, discussion sections)
    - Solving interesting problems (study guides, HW3, HW4, old exam problems, discussion sections)

> **Generally speaking, you'll learn a lot through doing. Programming is not something you can learn just from theory.** You have to actually practice it. So you'll be getting a lot of experience with programming Java through your homeworks, labs, and projects. **Discussion won't do direct programming, but you'll be discussing a lot about how to code effectively.** You'll get to solve a lot of interesting problems throughout the semester.

---

## Evaluation

- **Four types of points in this class:**
    - **Low effort, everyone should get them:** Weekly Surveys, Course Evaluations
        - Median score is 100%
    - **High effort, everyone should get them:** HW, Project, Lab
        - Median score is 100%
    - **High effort, not everyone gets them:** Exams
        - Mean score is 65%
        - Final exam score can replace midterms if you have a bad midterm (or two)
    - **Pacing points:** Attending Discussion, Lab, and keeping up with Lecture
        - Small amount of extra credit for keeping up with class
        - Will not increase your score beyond 75% (B-)
            - Example: You have 740 points and earn 20 pacing points, you get 750 points
    - **B to B+ threshold:** 65% on exams, 95% on everything else

---

## Class Phases

- **Phase 1 (Weeks 1-4): Intro to Java and Data Structures**
    - All coding work is solo
    - Moves VERY fast
    - HW0 (intro to Java) due Friday (in two days!)
- **Phase 2 (Weeks 5-10): Data Structures**
    - All coding work is solo
    - Moves moderately fast
- **Phase 3 (Weeks 12-14): Algorithms**
    - Coding work is entirely dedicated to final project, done in pairs
    - Slower pace

---

# Intro to Java

```python
print("hello world")
```

>[!NOTE]
>
> If we screw up,we'll screw it together.

**Java is a language that cares very much about object-oriented programming.**  
It really cares that all the code you write is in a class. Let's make a class. The *magic words* I'm going to use to define a class are `public class`.

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello world"); // print not include "\n"
    }
}
```

---

## Java and Object Orientation

**Reflections on Hello World:**
- In Java, all code must be part of a class
- Classes are defined with `public class CLASSNAME`
- We use `{ }` to delineate the beginning and ending of things
- We must end lines with a semicolon
- The code we want to run must be inside `public static void main(String[] args)`
    - We'll learn what this means later

**Java is an object-oriented language with strict requirements:**
- Every Java file must contain a class declaration
- **All code** lives inside a class, even helper functions, global constants, etc.
- To run a Java program, you typically define a main method using `public static void main(String[] args)`

---

## Java vs. Python: Static Typing

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
        x = "horse"; // This will cause a compile-time error
        System.out.println(x);
    }
}
```

**Reflections on Hello Numbers:**
- Before Java variables can be used, they must be declared
- Java variables must have a specific type
- Java variable types can never change
- Types are verified before the code even runs!

---

## Java and Static Typing

- **Java is statically typed!**
    - All variables, parameters, and methods must have a declared type
    - That type can never change
    - Expressions also have a type, e.g., `larger(5, 1) + 3` has type `int`
    - The compiler checks that all the types in your program are compatible before the program ever runs!
        - e.g., `String x = larger(5, 10) + 3` will fail to compile
        - This is unlike a language like Python, where type checks are performed during execution

---

## Writing a Function in Java

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

**Reflections on Larger:**
- Functions **must** be declared as part of a class in Java. A method that is part of a class is called a "method"
- To define a function in Java, we use `public static`. We will see alternate ways of defining functions later
- All parameters of a function must have a declared type, and the return value of the function must have a declared type. Functions in Java return only one value!

---

# Review: Object-Oriented Programming

- **A model for organizing programs**
    - **Modularity:** Define each piece without worrying about other pieces, and they all work together
    - **Data abstraction:** You can interact with an object without knowing how it's implemented
- **Objects**
    - An object bundles together information and related behavior
    - Each object has its own local state
    - Several objects may all be instances of a common type
- **Classes**
    - A class serves as a template for all of its instances
    - Each object is an instance of some class

---

## Classes in Python, Java, and C++

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
    delete c2; // Avoid memory leaks

    return 0;
}
```
# Review: Object-Oriented Programming
- **A model for organizing programs**
    - **Modularity:** Define each piece without worrying about other pieces, and they all work together
    - **Data abstraction:** You can interact with an object without knowing how it's implemented
- **Objects**
    - An object bundles together information and related behavior
    - Each object has its own local state

# Some words in the end:
As a student from China, I am deeply impressed by the content of CS61B. This is truly what computer science education should be—focusing on the essence of the field rather than fixating on syntax or rote memorization for exams. It often makes me reflect on the common critique that university education is disconnected from real-world demands. The root of the problem lies in the stagnation of curricula.

In many domestic contexts, outdated course content persists for several reasons. First, revising syllabi would require instructors to redesign their teaching materials, which increases their workload and complicates lesson preparation. Second, students might struggle with higher failure rates if the content becomes more challenging. As a result, universities and instructors often prefer to maintain the status quo, perpetuating a cycle of outdated knowledge. This "path dependency" has caused a growing disconnect between university curricula and the demands of the modern world.

This is one of the reasons I am committed to studying open courses like CS61B. By engaging with curricula that emphasize both theory and practical application, I aim to bridge the gaps in domestic education and gain a deeper understanding of the core principles and real-world applications of computer science. This learning journey is not only about personal growth but also a reflection on and response to the current state of education.