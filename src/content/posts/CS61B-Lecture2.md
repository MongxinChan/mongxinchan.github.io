---
title: CS61B Lecture 2- Classes and Entity, & Introduction of Debugging
published: 2024-12-02
updated: 2024-12-03
description: 'The lecture shows some basic knowledge of Java.And the debugging of Java.'
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
>If you wanna read the Chinese Edition,[Click Here](https://www.loners.site/posts/cs61b-lecture2-cn/)

# Introduction

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

When we run `DogLauncher.java`, it calls the `Dog` class and outputs "Bark!". This is good because it allows us to break down complex code into smaller parts using different classes.

# Methods and Classes

- Every method (a.k.a. function) is associated with some class.
- To run a class, we must define a `main` method.
- Not all classes have a `main` method!

>[!TIP] 
>
>Shortcut to Run
>
>- Use `control + shift + .` as a shortcut to run.

**Creating Instances**
When writing methods and classes, we often want to simulate real-world characteristics. For example, each dog's bark can be different, and each student's reaction to a bell can vary.

**A Not-So-Good Approach**
We could create a separate class for every single dog, but this would become redundant quickly.

**Solution: Instance Variables**

The real solution is to create an entity (instance) that can represent specific characteristics. For example, the sound a dog makes can depend on its weight.

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

**DogLauncher.java with Instance**

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

>[!TIP] 
>
>**【Object Instantiation】**
>Classes can contain not just functions (methods), but also data. For example, we can add a `size` variable to each `Dog`.
>
>**【Class Instantiation】**
>
>- We create a single `Dog` class and then create instances of this `Dog`.
>- These instances are also called 'objects'.
>- The class provides a blueprint that all `Dog` objects will follow.
>- Cannot add new instance variables to a `Dog`; they must all obey the blueprint exactly.


```java
package lec2_intro2;
public class Dog {
    public int weightInPounds;

    // Instance variable. Can have as many of these as you want.

    public Dog(int w) {
        weightInPounds = w;
    } // Constructor (similar to a method but not a method). Determines how to instantiate the class.

    public void makeNoise() {
        if (weightInPounds < 10) {
            System.out.println("yipyipyip!");
        } else if (weightInPounds < 30) {
            System.out.println("bark!");
        } else {
            System.out.println("aroooooooo!");
        }
    }

    // Non-static method, a.k.a Instance Method. Idea: if the method is going to be invoked by an instance of the class, then it should be non-static.
}
```

# `Static` vs. `Non-Static` Methods

In the same class, we can have both static and non-static methods.

```java
package lec2_intro2;
public class Dog {
    public int weightInPounds;

    // Instance variable. Can have as many of these as you want.

    public Dog(int w) {
        weightInPounds = w;
    } // Constructor (similar to a method but not a method). Determines how to instantiate the class.

    public void makeNoise() {
        if (weightInPounds < 10) {
            System.out.println("yipyipyip!");
        } else if (weightInPounds < 30) {
            System.out.println("bark!");
        } else {
            System.out.println("aroooooooo!");
        }
    }

    // Non-static method, a.k.a Instance Method. Idea: if the method is going to be invoked by an instance of the class, then it should be non-static.

    public static Dog maxDoge(Dog d1, Dog d2) {
        if (d1.weightInPounds > d2.weightInPounds) {
            return d1;
        } else {
            return d2;
        }
    }
}
```

## Instance Methods

```java
package lec2_intro2;
public class Dog {
    // ... (previous code)

    public Dog maxDog(Dog d2) {
        if (weightInPounds > d2.weightInPounds) {
            return this;
        } else {
            return d2;
        }
    }
}
```

## DogLauncher.java with Static and Instance Methods

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

> [!TIP]
>
> **Static Variables**
>
> Static variables are common to the entire class, whereas instance variables are specific to each object.
>

**Interactive Debugging**

So far (e.g., in CS61A), you might have added print statements to find bugs in your code. Today, we'll use IntelliJ's built-in, interactive debugging tool to find bugs in some code. Debugging is more of an art than a science.

## Example: Using IntelliJ's Debugger

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
> **Class Attributes vs. Instance Attributes**
>- `static` defines class attributes.
>- Without `static`, it defines instance attributes.

# Summary

Classes, instances, and methods—these concepts can be confusing for beginners. But at their core, they're all about using code to model and represent real-world objects.

We often say that classes are abstract, but what does that really mean? In political science, abstraction involves distilling universal patterns from specific social phenomena, like concepts of power, freedom, or justice. In philosophy, it's more about epistemology and ontology—how abstraction helps us grasp the essence of the world.

> [!NOTE]  
> **Abstraction isn't just theoretical, it's grounded in reality. We identify common traits in concrete things, and that's exactly what defines the attributes, methods, and instances of a class.**

Take humans, for example. A single person can be thought of as an **instance**, with their own attributes (like name and age) and behaviors (like walking or thinking). But humans aren't isolated—we share common traits while also having unique qualities. This uniqueness is referred to in Java as **polymorphism**.

The abstraction of a class allows us to describe the world by capturing both shared traits and individual differences. For instance, humans are mammals, warm-blooded, and capable of language, while penguins are birds and warm-blooded but flightless. We can say that humans and penguins both **inherit** the traits of warm-blooded animals, such as maintaining a constant body temperature. However, due to differences in behavior or environment, their actual body temperatures may vary. This is what **inheritance** means—it lets us connect things while preserving their differences.

Another key feature of classes is **encapsulation**. Think of an air conditioner remote: you press a button, and the AC turns on. You don't need to know how it works internally. Encapsulation hides complexity, letting you focus on inputs and outputs, which simplifies interactions.

Finally, **instantiation** means turning a class into a specific object. This object inherits the class's common traits but also has its own unique qualities. For example, Zhang San and Li Si are both human instances. When they hear a bell, they instinctively run to their classrooms, but their names and specific behaviors differ.

By using these concepts, we can model complex real-world relationships more clearly, while making code more organized and maintainable.

