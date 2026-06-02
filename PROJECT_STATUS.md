# AI Skill Quest 项目进展

## 当前状态

已完成一个可运行的私有可控发布学习网站 MVP，项目位于：

`C:\Users\Windows\Documents\learning`

线上预览地址：

`https://ai-skill-quest-9u3.pages.dev/`

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
- 已补充商业化安全边界：
  - 仓库建议设置为 Private
  - 不授予开源许可证
  - 真实助教、支付、用户权益、课程资产必须后端化
  - 公开部署只发布构建产物
- 已接入 DeepSeek 助教服务端代理：
  - Cloudflare Pages Functions: `functions/api/deepseek.js`
  - 前端请求同源 `/api/deepseek`
  - API Key 通过 Cloudflare `DEEPSEEK_API_KEY` 环境变量读取
  - 接口失败时自动回退本地知识库模式
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

Cloudflare Pages 线上访问已验证：

- HTTP 状态：200
- 页面标题：`AI Skill Quest | AI技能学习地图`
- 安全响应头：CSP、X-Frame-Options、X-Content-Type-Options、Referrer-Policy、Permissions-Policy 已生效

DeepSeek 函数本地模拟已验证：

- 未配置环境变量时返回 500 安全错误
- 模拟 DeepSeek 响应时返回 200 与 `{ answer, mode }`

## 当前阻塞

GitHub 仓库已创建并推送：

`https://github.com/Kairos2425/ai-skill-quest.git`

本地分支：

`main -> origin/main`

尝试 Vercel CLI 部署时，CLI 检测到旧 token 无效：

```text
Error: The specified token is not valid. Use `vercel login` to generate a new token.
```

浏览器打开 GitHub OAuth 授权页时出现“无法连接”。本机网络测试显示 GitHub 与 Vercel 的 443 端口均可连通，因此更可能是 OAuth 页面会话、浏览器环境或平台跳转问题，而不是项目代码问题。

后续发现：浏览器使用本机代理 `127.0.0.1:21081`，终端默认未使用代理，导致 GitHub push 失败。临时给 Git 设置 `HTTP_PROXY` / `HTTPS_PROXY` 后，GitHub push 已成功。

Cloudflare Wrangler CLI 可用，但非交互环境要求提供 `CLOUDFLARE_API_TOKEN`。为避免敏感 token 暴露，优先建议走 Cloudflare 网页端 GitHub Pages 集成。

## 下一步建议

优先路径：

1. 本地继续开发和预览：`http://127.0.0.1:5173/`
2. 在 Cloudflare Pages 里连接 GitHub 仓库 `Kairos2425/ai-skill-quest`。
3. Cloudflare 构建参数：
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production branch: `main`
4. 如果 OAuth 仍失败，使用 `dist/` 静态包手动上传到 Cloudflare Pages Direct Upload、Netlify Drop 或服务器。

第二阶段：

- 接入真实 LLM 助教。
- 引入账号系统和云端学习进度。
- 评估 InsForge 作为后端。
- 需要移动端时再启用 Expo。
