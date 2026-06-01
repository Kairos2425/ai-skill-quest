export const tracks = [
  {
    id: "agent-foundation",
    title: "智能体基本功",
    subtitle: "从会提问到会设计可复用的 AI 工作流",
    level: "L1",
    color: "#2f6f73",
    accent: "#f2c94c",
    hours: 10,
    source: "AI智能体科研应用与构建、Claude Code 与 OpenClaw、多智能体科研创新",
    outcomes: ["会定义任务边界", "能设计角色协作", "能评估幻觉风险", "能沉淀 SOP"],
    modules: [
      {
        title: "大语言模型与 Agent 的差别",
        summary: "理解 LLM、工具、工作流、智能体、记忆与知识库之间的关系。",
        tasks: ["画出一个科研任务的 Agent 执行链路", "写出三条防幻觉约束"],
      },
      {
        title: "Prompt 到 SOP",
        summary: "把一次性提示词升级为目标、输入、步骤、检查点和输出格式。",
        tasks: ["把一个论文检索需求改写成 SOP", "生成质量检查清单"],
      },
      {
        title: "多模型协作与裁决",
        summary: "用多个模型分别构思、审查、补充，再由裁决者给出下一步。",
        tasks: ["设计一个三角色讨论模板", "标注每个角色的失败模式"],
      },
    ],
  },
  {
    id: "openclaw-lab",
    title: "OpenClaw 科研自动化",
    subtitle: "文献、数据、写作、项目申报的一体化自动执行",
    level: "L2",
    color: "#3d5a80",
    accent: "#81b29a",
    hours: 18,
    source: "学术龙虾 OpenClaw、Claude Code 与 OpenClaw",
    outcomes: ["能完成本地化部署规划", "会安装和调用 Skills", "能构建科研自动化流水线"],
    modules: [
      {
        title: "OpenClaw 与 Skills 入门",
        summary: "理解身份档案、工具调用、技能系统、上下文压缩和安全边界。",
        tasks: ["列出本机部署检查表", "选择 3 个科研常用 Skills"],
      },
      {
        title: "文献检索与综述自动化",
        summary: "检索近年论文，抽取背景、方法、结果、局限与改进思路。",
        tasks: ["生成一个主题检索报告", "做 3 篇论文对比表"],
      },
      {
        title: "数据采集、清洗与报告",
        summary: "面向公开数据集、实验 CSV、Excel 和网页数据建立可复跑流程。",
        tasks: ["清洗一个小型数据集", "输出统计分析报告"],
      },
      {
        title: "自定义 Skill 开发",
        summary: "用 SKILL.md、脚本和参数约定，把个人流程封装为可复用技能。",
        tasks: ["写一个天气查询 Skill 草案", "把 Python 脚本包装为 Skill"],
      },
    ],
  },
  {
    id: "python-ml",
    title: "Python 数据分析与机器学习",
    subtitle: "从数据理解到可解释建模，再到 SCI 场景表达",
    level: "L2",
    color: "#7f4f24",
    accent: "#90be6d",
    hours: 24,
    source: "全国人工智能 Python 数据分析、机器学习与深度学习",
    outcomes: ["掌握 Pandas/Numpy", "会做特征工程", "能训练与解释模型", "能写技术路线"],
    modules: [
      {
        title: "Python 与数据处理核心库",
        summary: "安装环境，使用 Jupyter、Numpy、Pandas、Matplotlib、Seaborn 和 Scikit-learn。",
        tasks: ["完成一个数据框清洗练习", "画出三种探索性图表"],
      },
      {
        title: "数据分析方法论与大模型辅助",
        summary: "用 CRISP-DM、交叉验证、模型指标和大模型解释建立分析闭环。",
        tasks: ["写一份分析计划", "用助教检查指标选择是否合理"],
      },
      {
        title: "机器学习与可解释性",
        summary: "覆盖线性模型、树模型、集成学习、聚类、异常检测、SHAP 与 LIME。",
        tasks: ["训练一个分类模型", "生成特征重要性解释"],
      },
      {
        title: "深度学习与文本分析",
        summary: "学习神经网络、CNN、RNN/LSTM、BERT 表示与文本分类、摘要、情感分析。",
        tasks: ["复现一个文本分类流程", "解释深度模型在论文中的使用理由"],
      },
    ],
  },
  {
    id: "matlab-ai",
    title: "MATLAB AI 实验室",
    subtitle: "工程计算、图像处理和深度学习模型的可视化实践",
    level: "L2",
    color: "#9b2226",
    accent: "#ee9b00",
    hours: 18,
    source: "Matlab 数据分析、机器学习与深度学习实践应用",
    outcomes: ["掌握 MATLAB 基础", "能处理图像和信号", "能训练经典与深度模型"],
    modules: [
      {
        title: "MATLAB 基础与 Live Script",
        summary: "矩阵、函数、脚本、文件导入、调试、向量化编程和交互控件。",
        tasks: ["导入 CSV 并可视化", "写一个 Live Script 小实验"],
      },
      {
        title: "经典机器学习",
        summary: "BP 神经网络、SVM、决策树、随机森林、PCA、PLS 与特征选择。",
        tasks: ["完成 Iris 分类", "对模型结果做可解释说明"],
      },
      {
        title: "深度学习图像与序列任务",
        summary: "CNN、迁移学习、GAN、RNN/LSTM、YOLO、U-Net、自编码器。",
        tasks: ["设计猫狗分类迁移学习流程", "写出 U-Net 分割实验计划"],
      },
    ],
  },
  {
    id: "sci-paper",
    title: "SCI 论文工作坊",
    subtitle: "选题、创新点、初稿、润色、审稿回复的完整闭环",
    level: "L3",
    color: "#5f4b8b",
    accent: "#f28482",
    hours: 20,
    source: "AI 深度赋能 SCI 论文精准选题、创新点挖掘及写作",
    outcomes: ["能拆解论文结构", "能凝练创新点", "能生成初稿", "能回复审稿意见"],
    modules: [
      {
        title: "选题与创新点挖掘",
        summary: "文献深挖、需求导向、跨学科嫁接、方法迁移和痛点反推。",
        tasks: ["给出 5 个选题候选", "为每个候选写新颖性证据"],
      },
      {
        title: "论文七步法",
        summary: "从选题定位、材料准备、方法设计、结果展示到讨论和总结。",
        tasks: ["生成论文框架", "写摘要和引言初稿"],
      },
      {
        title: "润色、降 AIGC 与审稿回复",
        summary: "结构逻辑检查、英文润色、图表优化、参考文献与 Q-R-C 回复模板。",
        tasks: ["改写一段方法描述", "模拟两条审稿意见回复"],
      },
    ],
  },
  {
    id: "capstone",
    title: "个人 AI 科研副本",
    subtitle: "把工具、模型、数据、论文与自动化助教合成一个作品",
    level: "Boss",
    color: "#264653",
    accent: "#e76f51",
    hours: 16,
    source: "六份课程大纲综合整理",
    outcomes: ["拥有个人知识库", "拥有自动化工作流", "拥有可展示项目", "拥有复盘报告"],
    modules: [
      {
        title: "个人知识库与 RAG",
        summary: "将 PDF、笔记、数据说明和实验记录整理成可检索知识库。",
        tasks: ["建立知识库目录规范", "写 10 条问答测试集"],
      },
      {
        title: "科研论文查询系统",
        summary: "用多智能体协作完成前端、后端、数据库、测试和部署规划。",
        tasks: ["定义 4 个子智能体角色", "产出 MVP 功能清单"],
      },
      {
        title: "成果展示与可控发布",
        summary: "用可控发布站点展示学习地图、作品集、复盘和下一阶段路线。",
        tasks: ["发布一次受控 Demo", "写一份项目 README"],
      },
    ],
  },
];

export const quests = [
  {
    id: "q1",
    title: "今天的 30 分钟开局",
    xp: 30,
    tag: "入门",
    detail: "选择一条航线，完成第一张任务卡，并把问题写给自动助教。",
  },
  {
    id: "q2",
    title: "建立个人 SOP",
    xp: 80,
    tag: "流程",
    detail: "把一个真实科研任务拆成目标、资料、工具、步骤、检查点和输出格式。",
  },
  {
    id: "q3",
    title: "复刻一篇论文的技术路线",
    xp: 120,
    tag: "硬核",
    detail: "提取研究问题、数据、模型、指标、图表和局限，再写成自己的复现实验计划。",
  },
  {
    id: "q4",
    title: "封装一个可复用 Skill",
    xp: 150,
    tag: "作品",
    detail: "为常见任务写出 SKILL.md、输入输出规范和最小脚本接口。",
  },
];

export const badges = [
  { id: "starter", title: "启航者", threshold: 1, description: "完成任意 1 个模块" },
  { id: "builder", title: "流程工程师", threshold: 4, description: "完成 4 个模块并获得首个 SOP" },
  { id: "scholar", title: "科研加速者", threshold: 8, description: "完成 8 个模块，具备论文/数据双线能力" },
  { id: "captain", title: "个人 AI 舰长", threshold: 12, description: "完成 12 个模块，形成个人自动化系统" },
];

export const assistantKnowledge = [
  {
    keywords: ["入门", "零基础", "开始", "路线", "先学"],
    answer:
      "建议从「智能体基本功」开始，用 2 天建立 LLM、Agent、工具调用、知识库、质量评估的基本概念；随后进入 Python 或 OpenClaw。若目标是科研提效，优先顺序是：智能体基本功 -> OpenClaw 科研自动化 -> SCI 论文工作坊 -> 个人 AI 科研副本。",
  },
  {
    keywords: ["python", "数据", "机器学习", "建模", "深度学习"],
    answer:
      "Python 航线的重点是从数据处理到模型解释：先掌握 Numpy/Pandas/可视化，再做数据质量、特征工程、经典模型、聚类异常检测，最后进入深度学习与文本分析。每一章都要产出一个可复用 notebook 或分析报告。",
  },
  {
    keywords: ["matlab", "图像", "工程", "仿真"],
    answer:
      "MATLAB 航线适合工程计算、图像处理和可视化建模。建议先完成基础编程和数据导入，再做 BP、SVM、随机森林、PCA，最后选择 CNN、迁移学习、YOLO、U-Net 或 LSTM 做一个实验型作品。",
  },
  {
    keywords: ["openclaw", "skills", "skill", "自动化", "部署"],
    answer:
      "OpenClaw 航线要抓住三件事：安全部署、Skills 调用、科研流水线。先列出本地部署检查表和密钥管理规范，再安装 2-3 个文献/数据/写作 Skills，最后把文献检索、PDF 总结、数据清洗、报告生成串成一个可复跑流程。",
  },
  {
    keywords: ["论文", "sci", "选题", "创新", "写作", "审稿"],
    answer:
      "SCI 工作坊的路径是：先用文献深挖、需求导向、跨学科嫁接、方法迁移生成选题，再把摘要、引言、Related Works、方法、实验、讨论、结论逐段完成。修改阶段重点检查逻辑链、证据链、图表和审稿回复结构。",
  },
  {
    keywords: ["奖励", "积分", "游戏", "徽章", "闯关"],
    answer:
      "本站的学习激励建议按「模块完成数 + 任务难度 XP + 作品交付」计算。轻任务给 30-80 XP，作品任务给 120-150 XP；每完成 1、4、8、12 个模块解锁徽章，避免只刷阅读量，要把奖励绑定到产出物。",
  },
  {
    keywords: ["部署", "github", "私有", "pages", "上线"],
    answer:
      "这个项目是静态 Vite 站点，建议使用 GitHub Private Repo 再连接 Cloudflare Pages 或 Vercel。公开环境只发布 dist 构建产物；真实助教、支付和用户权益逻辑必须放在后端。",
  },
];
