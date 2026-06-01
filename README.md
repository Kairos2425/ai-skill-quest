# AI Skill Quest

一个面向商业化运营的 AI 技能学习网站 MVP，把 6 份 AI/科研培训大纲重组为「学习地图 + 任务闯关 + 自动助教」。

## 授权与商业化声明

当前项目为私有源码/可控发布项目，不授予开源许可证。未经授权，不允许复制、分发、二次销售、训练模型、反编译或用于竞品复刻。

建议 GitHub 仓库设置为 Private。公开部署时只发布构建产物，不公开后续商业逻辑、助教后端、用户系统、支付逻辑和课程资产。

## 功能

- 六条学习航线：智能体基本功、OpenClaw 科研自动化、Python 机器学习、MATLAB AI、SCI 论文工作坊、个人 AI 科研副本。
- 游戏化学习机制：模块完成、XP、徽章、每日/阶段任务。
- 自动助教：当前为本地知识库检索模式，不上传数据；后续通过后端接入 LLM API。
- 可控部署：支持 GitHub Private Repo + Cloudflare Pages、Vercel、Netlify。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物位于 `dist/`。

## 内容扩展

核心课程数据位于 `src/courseData.js`：

- `tracks`：学习航线与模块。
- `quests`：任务卡与 XP。
- `badges`：徽章解锁规则。
- `assistantKnowledge`：自动助教的本地知识库。

## 部署计划

1. 创建 GitHub 仓库并推送代码。
2. 在 GitHub Pages、Vercel 或 Netlify 连接仓库。
3. 构建命令使用 `npm run build`，发布目录使用 `dist`。
4. 若接入真实 AI 助教，必须新增后端 API 或 serverless function，严禁把密钥、模型路由、付费规则放到前端。

更完整的多平台部署教程见 `DEPLOYMENT_GUIDE.md`。
