---
title: 'LRU算法与其优化算法'
description: ''
image: ''
category: "System-Dev"
tags: [Redis, Algorithm]
draft: true 
lang: zh_CN
published: 2025-09-30
updated : 2025-11-02
---

# 业务背景

为什么我们需要LRU算法？

这个问题实际上我们只要考虑到内存的有限性就可以理解了，每个层级之间的访问速度存在着很大的差异：
- CPU寄存器/ L1 / L2 缓存 : ns
- 内存(RAM): ns~ms
- 磁盘(SSD/HDD): ms
- 网络请求() : 
![]()
我们发现，CPU访问内存的速度比访问磁盘快的量级是$10^5~10^6$

# LRU算法

# Mysql(InnoDB)中的优化

# Redis中LRU的优化

# List of references