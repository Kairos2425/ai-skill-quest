# 部署与技术路线判断

## 推荐主线：Vite + React 静态站

当前项目最适合先做成静态学习网站：

- 不需要登录即可访问学习地图、课程路线、任务卡和本地助教。
- 可以立刻部署到 Cloudflare Pages、Vercel、Netlify。
- 仓库建议设为 Private；公开环境只发布构建产物。
- 自动助教第一版用本地知识库，不涉及 API Key 和隐私数据。

## GitHub Pages

适合：低成本托管和自动构建。若涉及商业化，必须使用私有仓库或只发布构建产物。

当前仓库已准备 `.github/workflows/pages.yml`。推送到 GitHub 后，在仓库设置里启用 Pages 的 GitHub Actions 发布即可。

## Vercel / Netlify

适合：最快获得在线 URL、自动预览分支、以后接 serverless API。商业逻辑和密钥必须放后端。

设置：

- Build command: `npm run build`
- Output directory: `dist`

## Expo

适合：未来要做手机 App、离线学习、推送提醒、扫码签到、移动端任务打卡。

不建议作为当前 MVP 主线，原因：

- 用户现在要的是在线学习网站，React Web 静态站最快。
- Expo Web 虽可发布网页，但对这个内容型网站没有明显收益。
- 若加入移动端，建议在 Web 版本验证内容和机制后，再用 Expo 复用课程数据。

## InsForge

适合：第二阶段作为后端能力层：

- 用户账号与学习进度同步。
- 真实自动助教、RAG 知识库、文件上传。
- 课程后台、任务提交、排行榜、社群运营。

不建议当前立即引入，原因：

- 第一版核心体验不依赖后端。
- 引入后端会增加部署、鉴权、数据库和密钥管理成本。
- 当前机器未配置相关 CLI 与登录态，远程部署仍需要授权。

## 分阶段计划

1. 现在：完成 Vite 静态站，可本地运行与构建。
2. 立即上线：推 GitHub 私有仓库，用 Cloudflare Pages/Vercel/Netlify 发布构建产物。
3. 第二阶段：接入真实 LLM 助教和用户系统，可评估 InsForge 或自建 serverless。
4. 第三阶段：需要移动端时再创建 Expo App，共用 `courseData`。
