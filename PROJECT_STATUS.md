# AI Skill Quest 项目进展

## 当前状态

已完成一个可运行的开源学习网站 MVP，项目位于：

`C:\Users\Windows\Documents\learning`

## 已完成

- 基于 6 份 PDF 课程材料提炼学习路线。
- 搭建 Vite + React 静态站点。
- 设计六条 AI 技能航线：
  - 智能体基本功
  - OpenClaw 科研自动化
  - Python 数据分析与机器学习
  - MATLAB AI 实验室
  - SCI 论文工作坊
  - 个人 AI 科研副本
- 实现游戏化机制：
  - 模块完成状态
  - 本地进度保存
  - XP
  - 徽章墙
  - 阶段任务卡
- 实现自动助教 MVP：
  - 本地课程知识库检索
  - 常见问题快速提示
  - 不上传数据，不依赖 API Key
- 补齐三种部署配置：
  - GitHub Pages: `.github/workflows/pages.yml`
  - Vercel: `vercel.json`
  - Netlify: `netlify.toml`
- 补齐部署文档：
  - `DEPLOYMENT_DECISION.md`
  - `DEPLOYMENT_GUIDE.md`

## 验证结果

已执行：

```bash
npm install
npm run build
```

构建通过，产物位于 `dist/`。

本地开发服务器仍在运行：

`http://127.0.0.1:5173/`

## 当前阻塞

尝试 Vercel CLI 部署时，CLI 检测到旧 token 无效：

```text
Error: The specified token is not valid. Use `vercel login` to generate a new token.
```

浏览器打开 GitHub OAuth 授权页时出现“无法连接”。本机网络测试显示 GitHub 与 Vercel 的 443 端口均可连通，因此更可能是 OAuth 页面会话、浏览器环境或平台跳转问题，而不是项目代码问题。

## 下一步建议

优先路径：

1. 本地继续开发和预览：`http://127.0.0.1:5173/`
2. 使用 Vercel 网页端重新登录，再导入 GitHub 仓库。
3. 如果 OAuth 仍失败，使用 `dist/` 静态包手动上传到 Netlify Drop、Cloudflare Pages 或服务器。

第二阶段：

- 接入真实 LLM 助教。
- 引入账号系统和云端学习进度。
- 评估 InsForge 作为后端。
- 需要移动端时再启用 Expo。
