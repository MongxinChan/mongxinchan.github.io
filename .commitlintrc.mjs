export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 强制 scope 只能从这些中选择
    'scope-enum': [
      2,
      'always',
      [
        'posts',     // 专指文章内容
        'site',      // 博客系统/框架修改
        'component', // UI 组件
        'ci',        // GitHub Actions 等
        'deps',      // 依赖更新
        'chore',     // 杂项
      ],
    ],
    // 允许各种大小写风格（因为你现在的提交习惯比较随性）
    'subject-case': [0],
  },
};