# AI Skill Quest

一个开源 AI 技能学习网站，把 6 份 AI/科研培训大纲重组为「学习地图 + 任务闯关 + 自动助教」。

## 功能

- 六条学习航线：智能体基本功、OpenClaw 科研自动化、Python 机器学习、MATLAB AI、SCI 论文工作坊、个人 AI 科研副本。
- 游戏化学习机制：模块完成、XP、徽章、每日/阶段任务。
- 自动助教：当前为本地知识库检索模式，不上传数据；后续可接入 LLM API。
- 静态部署：支持 GitHub Pages、Vercel、Netlify。

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
4. 若接入真实 AI 助教，新增后端 API 或 serverless function，避免把密钥放到前端。

更完整的多平台部署教程见 `DEPLOYMENT_GUIDE.md`。
