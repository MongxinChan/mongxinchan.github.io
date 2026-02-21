---
title: 'Agent —— 从 API、CLI 到多智能体架构的全景解析'
published: 2026-02-22
updated: 2026-02-22
description: '在掌握了基础指令和编排范式后，本篇文章将带你深入 Claude API、Claude Code CLI 以及 Agent SDK，探索大模型在复杂工程和多智能体协作中的高阶实践。' 
image: '' 
tags: [Agent] 
category: Intelligence
draft: false 
lang: zh_CN
---

:::TIP[Materials]
你可以点击以下链接来获取 `Agent Skills` 的资料：
::github{repo="https-deeplearning-ai/sc-agent-skills-files"}
:::

## 前言

在[上一篇](https://www.loners.site/posts/agent-part2/)中，我们探讨了如何通过目录解耦和渐进式披露来构建一个专业的 `Skill`。但随着项目复杂度的提升，帆帆遇到了新的瓶颈。

设想一下，帆帆正在开发一个极其复杂的基于 Canvas 的富文本编辑器（比如叫 `JianZi`），这个项目包含了大量的 TypeScript 类型校验和自定义的 AST 渲染管线。如果每次让 AI 帮忙写一段重绘逻辑，都要手动把这些项目背景和 `Skill` 喂给网页版对话框，那效率依然很低下。

为了让 AI 真正深入我们的代码仓库，成为不知疲倦的数字协作者，我们需要跨越网页端的限制，深入到底层架构中。本文基于吴恩达与 Anthropic 联合课程的 7-9 集，带你全面解析从 API 到本地 CLI，再到多智能体编排的高阶玩法。

# 脱离网页端的魔法：API 中的 Skills 闭环

在网页端，我们觉得 `Agent` 是无所不能的魔法师；但在底层的 API 环境中，大模型本身并不具备直接“执行”任何动作的能力。它只是一个极其聪明的文本推理引擎。

## 1.1 Trigger-Execute-Return 机制

在 API 环境下使用 Skills，本质上是建立一套标准化的大模型与宿主环境之间的通信协议（Function Calling）。

:::Note[核心闭环]
1. **定义工具箱 (Tool Definition)**：在发送请求时，我们需要用 JSON Schema 严谨地定义可用工具（如 `execute_bash`）。
2. **模型决策 (Model Decision)**：模型判断需要外部协助，返回一个 `tool_use` 指令。
3. **本地执行 (Execution & Injection)**：我们在本地环境解析指令，实际运行代码，并将结果封装发回给模型。
:::

## 1.2 沙盒与文件操作的化学反应

在第 7 课中，最核心的启发是将**代码执行工具 (Code Execution Tool)** 与 **Files API** 结合。当你赋予 Claude 读写本地文件的权限，并允许它在安全的沙盒中运行 Shell 脚本时，它就变成了一台微型计算机。帆帆可以利用这个机制，让 `Agent` 自动拉取最新的代码，运行测试脚本，并输出排错报告。

# 本地工程化的护城河：Claude Code CLI

如果说 API 是造轮子，那么 `Claude Code` 就是 Anthropic 为开发者打造的“保时捷”。作为运行在本地终端的 CLI 工具，它能直接与你的本地工程目录对话。

## 2.1 CLAUDE.md：项目的“宪法”

在庞大的工程中，每次交互都解释业务逻辑是极其消耗 Token 的。`Claude Code` 引入了项目级全局上下文机制。

你可以在项目的根目录下创建一个 `CLAUDE.md`。这是当前项目的“宪法”，你可以声明：
- 全局的技术栈偏好（如：严格执行 TypeScript 校验）。
- 架构分层模式。
- Git 提交规范。

## 2.2 定制化本地 Skills

对于 `JianZi` 这样底层依赖 Canvas 的项目，单纯的全局文本约束往往不够。你可以在 `.claude/skills/` 目录下存放定制的技能文件。

例如，创建一个针对 Canvas 渲染的 Skill，里面详细写明：“本项目使用自定义的 TypeScript AST 结构，任何针对画布重绘的操作必须调用 `renderPipeline`，严禁直接操作原生 Canvas Context”。

**按需加载**：这种本地 `Skill` 依然遵循我们在上一篇提到的渐进式披露原则。只有当帆帆的 Prompt 命中了这个 Skill 的描述时，关于 Canvas 渲染优化的长篇规范才会被作为上下文注入，既精准干活，又防止了上下文爆炸。

# 架构师视角：Agent SDK 与多智能体协作

当一个需求大到“将整个后端的旧有逻辑重构成 Spring Boot 标准三层架构”时，把所有任务压在一个模型实例上，往往会导致 AI 逻辑混乱甚至产生幻觉。

在第 9 课中，课程引入了 `Claude Agent SDK`，向我们展示了 **Orchestrator-Workers (主控-工作节点)** 的多智能体架构。这与我们上一篇提到的 `Subagents` 概念完美契合。

## 3.1 明确的分工体系

| 智能体角色 | 核心职责 | 挂载的特定 Skills |
| :--- | :--- | :--- |
| **Main Orchestrator (主控节点)** | 负责全局调度、拆解任务、信息汇总。 | 规划与任务路由技能。 |
| **Researcher (研究员子代理)** | 查阅全网资料或本地厚重的 API 文档。 | 网页搜索、文档阅读技能。 |
| **Coder (编码子代理)** | 基于需求和参考资料进行实际编码。 | 代码读写、AST 解析技能。 |
| **Reviewer (审查子代理)** | 负责对代码进行无情打击和单元测试。 | 测试执行、规范校验技能。 |

## 3.2 Skill 作为智能体边界协议

在这种复杂的架构中，`Skill` 的定位发生了微妙的转变。它不仅仅是提供给子智能体的工具，更是**用来约束主控节点“行为模式”的协议**。

主控节点通过调用不同的 `Skill`，能够按照一个可预测的、渐进式的工作流去分配子任务。这就像是一个自动化运转的微型软件公司，主控是 PM，带着一群极客各司其职。

## 结语

从 Part 1 网页版的 `Prompt` 解放，到 Part 2 的生态系统协同，再到本篇深入 API 和多智能体架构。我们见证了 Agent Skills 从一个简单的“指令集”进化为“专家工作流”的全过程。

真正的智能化，不是让一个 Agent 学会所有事情，而是通过清晰的**规范约束 (CLAUDE.md)**、**能力插件化 (Skills)** 以及**分工协作 (Multi-Agent)**，打造一套属于你自己的数字研发流水线。