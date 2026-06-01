# AI Skill Quest 多平台部署教程

## 方式一：GitHub Pages

适合开源项目长期展示。

1. 在 GitHub 创建一个新仓库，例如 `ai-skill-quest`。
2. 本地提交并推送：

```bash
git add .
git commit -m "init ai skill quest"
git branch -M main
git remote add origin https://github.com/<你的用户名>/ai-skill-quest.git
git push -u origin main
```

3. 打开 GitHub 仓库的 `Settings -> Pages`。
4. Source 选择 `GitHub Actions`。
5. 仓库已有 `.github/workflows/pages.yml`，之后每次推送 `main` 都会自动构建并发布。

## 方式二：Vercel

适合最快拿到在线 URL，也方便以后加 serverless API。

### 网页方式

1. 打开 [Vercel](https://vercel.com/) 并登录。
2. New Project，导入 GitHub 仓库。
3. Framework Preset 选择 Vite。
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. 点击 Deploy。

### CLI 方式

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

项目已包含 `vercel.json`。

## 方式三：Netlify

适合静态站托管，也方便表单、重定向和分支预览。

### 网页方式

1. 打开 [Netlify](https://www.netlify.com/) 并登录。
2. Add new site，导入 GitHub 仓库。
3. Build command: `npm run build`
4. Publish directory: `dist`
5. 点击 Deploy。

### CLI 方式

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy
netlify deploy --prod
```

项目已包含 `netlify.toml`。

## OAuth 或平台登录失败时

如果 GitHub OAuth、Vercel 登录页或 Netlify 登录页出现“无法连接”，先不要怀疑代码。当前项目是纯静态站，可以先用构建产物交付：

```bash
npm run build
```

然后使用 `dist/` 目录：

1. 直接压缩 `dist/`，交给任何静态网站托管服务。
2. 使用 Netlify Drop 手动拖拽上传。
3. 使用 Cloudflare Pages 的 Direct Upload。
4. 上传到自己的服务器或对象存储，并配置静态站点托管。

登录恢复后，再回到 GitHub/Vercel/Netlify 的自动化流程。

## 方式四：Expo + InsForge 判断

当前项目是在线学习网站，优先 Web 静态部署。Expo 更适合第二阶段移动端：

- 手机 App 学习打卡。
- 离线课程缓存。
- 推送提醒。
- 扫码加入课程或完成任务。

InsForge 更适合第二阶段后端：

- 用户账号。
- 云端学习进度。
- 文件上传与课程知识库。
- 真实 LLM 自动助教。
- 排行榜与任务提交。

建议先发布 Web MVP，验证课程路线与游戏化机制，再决定是否引入 Expo 或 InsForge。
