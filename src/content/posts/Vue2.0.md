---
title: Vue 2.0 快速上手教程
published: 2025-03-25
updated: 2025-04-07
description: 'Vue.js 是一个用于构建用户界面的渐进式框架，它通过声明式的数据绑定和组件系统，简化了 DOM 操作和页面渲染。本教程将帮助你快速上手 Vue 2.0，并了解其基本概念和用法。'
image: ''
tags: [ComputerScience,Fronted,Vue ]
category: "ComputerScience"
draft: false 
lang: zh_CN
---


>[!NOTE]
>
>本教程假设你已经具备基本的 HTML、CSS 和 JavaScript 知识。如果你对这些知识不熟悉，可以先学习相关的教程。
>
>本笔记基于Bilibili课程[30分钟学会Vue之核心语法](https://www.bilibili.com/video/BV1oj411D7jk)

# 环境准备

在开始之前，确保你的开发环境已经安装了 Node.js 和 npm。你可以通过以下命令安装 Vue CLI：

```bash
npm install -g @vue/cli
```

安装完成后，可以通过以下命令创建一个新的 Vue 项目：

```bash
vue create my-vue-project
cd my-vue-project
npm run serve
```

# Vue 2.0 基础语法

## 2.1 响应式数据与插值表达式

Vue 的核心特性之一是响应式数据绑定。通过在模板中使用插值表达式（`{{ }}`），可以将数据动态绑定到 DOM 中。

```html
<!-- index.html -->
<div id="app">
    <p>{{ title }}</p>
    <p>{{ content }}</p>
</div>
```

在 JavaScript 中，通过 Vue 实例的 `data` 属性定义响应式数据：

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        title: 'Hello Vue!',
        content: 'This is a Vue.js project.'
    }
});
```

当 `data` 中的数据发生变化时，页面上绑定的内容会自动更新。

## 2.2 方法与插值表达式

Vue 允许在模板中调用方法。通过在 `methods` 中定义函数，可以在插值表达式中使用。

```html
<!-- index.html -->
<div id="app">
    <p>{{ output() }}</p>
</div>
```

在 Vue 实例中定义方法：

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        title: 'Hello Vue!',
        content: 'This is a Vue.js project.'
    },
    methods: {
        output() {
            return `Title: ${this.title}, Content: ${this.content}`;
        }
    }
});
```

## 2.3 计算属性

计算属性是基于依赖的缓存属性。当依赖的响应式数据发生变化时，计算属性会自动重新计算。

```html
<!-- index.html -->
<div id="app">
    <p>{{ outputContent }}</p>
</div>
```

在 Vue 实例中定义计算属性：

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        title: 'Hello Vue!',
        content: 'This is a Vue.js project.'
    },
    computed: {
        outputContent() {
            return `Title: ${this.title}, Content: ${this.content}`;
        }
    }
});
```

## 2.4 侦听器（Watchers）

侦听器用于监听数据的变化，并执行特定的操作。通过在 `watch` 中定义侦听器，可以实现更复杂的逻辑。

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        title: 'Hello Vue!'
    },
    watch: {
        title(newVal, oldVal) {
            console.log(`Title changed from ${oldVal} to ${newVal}`);
        }
    }
});
```

# 指令

Vue 提供了一系列指令，用于操作 DOM 和绑定数据。

## 3.1 条件渲染

`v-if` 和 `v-show` 用于根据条件渲染元素。`v-if` 是真正的条件渲染，而 `v-show` 只是切换元素的 CSS 属性。

```html
<!-- index.html -->
<div id="app">
    <p v-if="bool">This is visible when bool is true.</p>
    <p v-show="bool">This is visible when bool is true.</p>
</div>
```

在 Vue 实例中定义布尔值：

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        bool: true
    }
});
```

## 3.2 列表渲染

`v-for` 用于渲染列表数据。可以通过数组或对象进行循环。

```html
<!-- index.html -->
<div id="app">
    <p v-for="item in arr">{{ item }}</p>
    <p v-for="(item, key, index) in obj">{{ item }} - {{ key }} - {{ index }}</p>
</div>
```

在 Vue 实例中定义数组和对象：

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        arr: ['a', 'b', 'c'],
        obj: { a: 10, b: 20, c: 30 }
    }
});
```

## 3.3 属性绑定

`v-bind` 用于动态绑定 DOM 属性。

```html
<!-- index.html -->
<div id="app">
    <p v-bind:title="title">Hover over me to see the title.</p>
</div>
```

在 Vue 实例中定义属性值：

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        title: 'Dynamic Title'
    }
});
```

## 3.4 事件绑定

`v-on` 或简写为 `@` 用于绑定事件处理器。

```html
<!-- index.html -->
<div id="app">
    <button @click="output">Click me</button>
</div>
```

在 Vue 实例中定义事件处理方法：

```javascript
// main.js
new Vue({
    el: '#app',
    methods: {
        output() {
            alert('Button clicked!');
        }
    }
});
```

## 3.5 表单绑定

`v-model` 用于实现双向数据绑定，将表单输入与数据绑定在一起。

```html
<!-- index.html -->
<div id="app">
    <input type="text" v-model="inputValue">
    <p>{{ inputValue }}</p>
</div>
```

在 Vue 实例中定义绑定的数据：

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        inputValue: 'Default Value'
    }
});
```

# 修饰符

Vue 提供了一些修饰符，用于增强指令的功能。

## 4.1 事件修饰符

`.trim` 修饰符用于去除输入值的首尾空格。

```html
<!-- index.html -->
<div id="app">
    <input type="text" v-model.trim="inputValue">
</div>
```

在 Vue 实例中定义绑定的数据：

```javascript
// main.js
new Vue({
    el: '#app',
    data: {
        inputValue: ''
    }
});
```

# 示例代码

以下是完整的示例代码，展示了上述功能的综合应用。

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 2.0 Quick Start</title>
</head>
<body>
    <div id="app">
        <h1>{{ title }}</h1>
        <p>{{ content }}</p>
        <p>{{ outputContent }}</p>
        <p v-if="bool">This is visible when bool is true.</p>
        <p v-show="bool">This is visible when bool is true.</p>
        <p v-for="item in arr">{{ item }}</p>
        <p v-for="(item, key, index) in obj">{{ item }} - {{ key }} - {{ index }}</p>
        <p v-bind:title="title">Hover over me to see the title.</p>
        <button @click="output">Click me</button>
        <input type="text" v-model.trim="inputValue">
        <p>{{ inputValue }}</p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                title: 'Hello Vue!',
                content: 'This is a Vue.js project.',
                bool: true,
                arr: ['a', 'b', 'c'],
                obj: { a: 10, b: 20, c: 30 },
                inputValue: 'Default Value'
            },
            methods: {
                output() {
                    alert('Button clicked!');
                }
            },
            computed: {
                outputContent() {
                    return `Title: ${this.title}, Content: ${this.content}`;
                }
            },
            watch: {
                title(newVal, oldVal) {
                    console.log(`Title changed from ${oldVal} to ${newVal}`);
                }
            }
        });
    </script>
</body>
</html>
```

# 总结

通过以上内容，你已经掌握了 Vue 2.0 的基本语法和功能，包括响应式数据、插值表达式、指令、计算属性、侦听器和修饰符。这些功能将帮助你快速构建动态的用户界面。接下来，你可以通过阅读官方文档和实践更多项目，进一步提升你的 Vue.js 技能。