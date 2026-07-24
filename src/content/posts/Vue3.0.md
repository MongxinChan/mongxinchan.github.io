---
title: Vue 3.0 快速上手教程
published: 2025-03-26
updated: 2025-04-07
description: 'Vue 3 是 Vue.js 的最新版本，它带来了性能提升、更好的 TypeScript 支持以及新的 Composition API 等特性。本教程是基于 Vue 3 的快速上手教程，帮助你快速掌握其核心语法和功能。'
image: ''
category: "System-Dev"
tags: [Frontend, Vue, TypeScript]
draft: false 
lang: zh_CN
---


> [!NOTE]
> 本教程假设你已经具备基本的 JavaScript 和 HTML 知识。
>
> 你可以通过 [Vue.js 官方文档](https://v3.vuejs.org/guide/introduction.html)了解更多关于 Vue 3 的详细信息。
>
>本笔记基于课程[半小时入门Vue3.0核心语法](https://www.bilibili.com/video/BV1Pg4y1A7pn)



# 环境准备

在开始之前，确保你的开发环境已经安装了 Node.js 和 npm。你可以通过以下命令安装 Vue CLI：

```bash
npm install -g @vue/cli
```

安装完成后，可以通过以下命令创建一个新的 Vue 3 项目：

```bash
vue create my-vue3-project
```

在创建过程中，确保选择 Vue 3 作为项目版本。

# Vue 3 基础语法
确保你安装了最新版本的 Node.js，并且你的当前工作目录正是打算创建项目的目录。在命令行中运行以下命令 (不要带上 $ 符号)：

```bash
npm create vue@latest
```

这一指令将会安装并执行 create-vue，它是 Vue 官方的项目脚手架工具。你将会看到一些诸如 TypeScript 和测试支持之类的可选功能提示：

```bash
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

如果不确定是否要开启某个功能，你可以直接按下回车键选择 No。在项目被创建后，通过以下步骤安装依赖并启动开发服务器：

```bash
cd <your-project-name>
npm install
npm run dev
```

当你准备将应用发布到生产环境时，请运行：

```bash
npm run build
```

此命令会在 `./dist` 文件夹中为你的应用创建一个生产环境的构建版本。

## 2.1 `<script setup>`

Vue 3 引入了 `<script setup>` 语法，它是一种更简洁的组件编写方式，适用于组合式 API。以下是一个简单的示例：

```vue
<!-- HelloWorld.vue -->
<script setup>
import { reactive, ref, computed, watch, watchEffect } from 'vue'

// 定义响应式数据
const count = ref(0)
const myData = reactive({
  name: 'cmx',
  age: 21,
  friends: ['8ks', 'cyy']
})

// 定义计算属性
const getLen = computed(() => {
  console.log('INVOKE computed')
  return myData.friends.length
})

// 定义侦听器
watch(() => myData.age, (newVal, oldVal) => {
  console.log(`Age changed from ${oldVal} to ${newVal}`)
})

// 定义自动侦听
watchEffect(() => {
  console.log(`count的值为: ${count.value}, myData的值为: ${myData.age}`)
})

// 定义事件处理函数
function clickHandler() {
  count.value++
  myData.age++
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ getLen }}</h1>
    <button @click="clickHandler">增加</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
```

## 2.2 响应式数据

Vue 3 使用 `ref` 和 `reactive` 来定义响应式数据：

- `ref` 用于定义基本数据类型的响应式数据。
- `reactive` 用于定义对象类型的响应式数据。

```vue
<script setup>
import { ref, reactive } from 'vue'

const count = ref(0) // 基本数据类型
const myData = reactive({
  name: 'cmx',
  age: 21,
  friends: ['8ks', 'cyy']
}) // 对象类型
</script>
```

## 2.3 计算属性

计算属性是基于依赖的缓存属性。当依赖的响应式数据发生变化时，计算属性会自动重新计算。

```vue
<script setup>
import { ref, computed } from 'vue'

const content = ref('hello world')
const getLen = computed(() => {
  return content.value.length
})
</script>
```

## 2.4 侦听器

侦听器用于监听数据的变化，并执行特定的操作。Vue 3 提供了 `watch` 和 `watchEffect` 两种侦听器：

- `watch` 用于监听特定数据的变化。
- `watchEffect` 用于自动侦听所有依赖的变化。

```vue
<script setup>
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const myData = reactive({
  age: 21
})

// 监听特定数据的变化
watch(() => myData.age, (newVal, oldVal) => {
  console.log(`Age changed from ${oldVal} to ${newVal}`)
})

// 自动侦听所有依赖的变化
watchEffect(() => {
  console.log(`count的值为: ${count.value}, myData的值为: ${myData.age}`)
})
</script>
```

## 2.5 浅响应式与只读数据

Vue 3 提供了 `shallowReactive` 和 `readonly` 用于定义浅响应式数据和只读数据：

- `shallowReactive` 用于定义浅响应式数据，只有外层数据是响应式的。
- `readonly` 用于定义只读数据，数据不能被修改。

```vue
<script setup>
import { shallowReactive, readonly } from 'vue'

const myData = shallowReactive({
  name: 'cmx',
  age: 21,
  friends: ['8ks', 'cyy']
})

const myReadOnlyData = readonly({
  name: 'cmx',
  age: 21
})
</script>
```

# 组合式 API

组合式 API 是 Vue 3 的核心特性之一，它允许你将逻辑相关的代码组织在一起，提高代码的可维护性和可重用性。

## 3.1 使用 `setup` 函数

在 Vue 3 中，`setup` 函数是组合式 API 的入口点。你可以在 `setup` 函数中定义响应式数据、生命周期钩子、计算属性等。

```vue
<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    return {
      count,
      doubleCount
    }
  }
}
</script>
```

## 3.2 自定义组合函数

自定义组合函数是一种将逻辑相关的代码封装在一起的方式，可以提高代码的可重用性。

```vue
<script setup>
import { ref, computed } from 'vue'

function useCounter() {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const increment = () => count.value++

  return { count, doubleCount, increment }
}

const { count, doubleCount, increment } = useCounter()
</script>
```

# TypeScript 支持

Vue 3 提供了更好的 TypeScript 支持，你可以通过定义类型来提高代码的可维护性和可读性。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)
</script>
```

# 示例代码

以下是完整的示例代码，展示了上述功能的综合应用。

```vue
<!-- HelloWorld.vue -->
<script setup>
import { reactive, ref, computed, watch, watchEffect } from 'vue'

// 定义响应式数据
const count = ref(0)
const myData = reactive({
  name: 'cmx',
  age: 21,
  friends: ['8ks', 'cyy']
})

// 定义计算属性
const getLen = computed(() => {
  console.log('INVOKE computed')
  return myData.friends.length
})

// 定义侦听器
watch(() => myData.age, (newVal, oldVal) => {
  console.log(`Age changed from ${oldVal} to ${newVal}`)
})

// 定义自动侦听
watchEffect(() => {
  console.log(`count的值为: ${count.value}, myData的值为: ${myData.age}`)
})

// 定义事件处理函数
function clickHandler() {
  count.value++
  myData.age++
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ getLen }}</h1>
    <button @click="clickHandler">增加</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
```

# 总结

通过以上内容，你已经掌握了 Vue 3 的基本语法和功能，包括 `<script setup>`、响应式数据、计算属性、侦听器和组合式 API。这些功能将帮助你快速构建动态的用户界面。接下来，你可以通过阅读官方文档和实践更多项目，进一步提升你的 Vue.js 技能。