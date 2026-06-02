import { useEffect, useMemo, useState } from "react";
import {
  Award,
  Bot,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  Compass,
  FileText,
  Flame,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Layers3,
  ListChecks,
  MessageSquareText,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  Target,
  Trophy,
} from "lucide-react";
import { assistantKnowledge, badges, deepseekGuide, learningLoops, quests, tracks } from "./courseData.js";

const storageKey = "ai-skill-quest-progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function App() {
  const [activeTrackId, setActiveTrackId] = useState(tracks[0].id);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [progress, setProgress] = useState(loadProgress);
  const [question, setQuestion] = useState("零基础科研人员应该先学哪条路线？");
  const [assistantAnswer, setAssistantAnswer] = useState("");
  const [selectedQuest, setSelectedQuest] = useState(quests[0].id);
  const [assistantMode] = useState("local");

  const activeTrack = tracks.find((track) => track.id === activeTrackId) ?? tracks[0];
  const selectedModule = activeTrack.modules[selectedModuleIndex] ?? activeTrack.modules[0];

  const allModules = tracks.flatMap((track) =>
    track.modules.map((module, index) => ({
      ...module,
      trackId: track.id,
      moduleId: `${track.id}-${index}`,
    })),
  );

  const completedCount = allModules.filter((module) => progress[module.moduleId]).length;
  const totalModules = allModules.length;
  const completionRate = Math.round((completedCount / totalModules) * 100);
  const xp = completedCount * 65 + (quests.find((quest) => quest.id === selectedQuest)?.xp ?? 0);
  const unlockedBadges = badges.filter((badge) => completedCount >= badge.threshold);
  const currentQuest = quests.find((quest) => quest.id === selectedQuest) ?? quests[0];
  const streak = Math.max(1, Math.min(7, completedCount + 1));
  const energy = Math.max(18, 100 - completedCount * 5);

  const recommended = useMemo(() => {
    if (completedCount < 2) return "先完成智能体基本功，建立概念、提示词和 SOP 习惯。";
    if (completedCount < 5) return "进入 Python 或 OpenClaw 主线，做第一个可提交作品。";
    if (completedCount < 8) return "开始 SCI 写作训练，把学习结果转成科研表达。";
    return "准备挑战 Boss 关，把课程、作品、助教和复盘整理成个人学习副本。";
  }, [completedCount]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    askAssistant(question);
  }, []);

  useEffect(() => {
    setSelectedModuleIndex(0);
  }, [activeTrackId]);

  function toggleModule(moduleId) {
    setProgress((current) => ({ ...current, [moduleId]: !current[moduleId] }));
  }

  function resetProgress() {
    setProgress({});
  }

  function askAssistant(input) {
    const cleanInput = input.trim();
    if (!cleanInput) {
      setAssistantAnswer("先告诉我你的目标，比如“我要做论文选题”或“我想把文献检索流程自动化”。");
      return;
    }

    const normalized = cleanInput.toLowerCase();
    const scored = assistantKnowledge
      .map((item) => ({
        ...item,
        score: item.keywords.reduce((sum, keyword) => sum + (normalized.includes(keyword.toLowerCase()) ? 1 : 0), 0),
      }))
      .sort((a, b) => b.score - a.score);

    const best = scored[0];
    const fallback =
      "我会先帮你确定目标产出，再匹配学习路线和当前最适合的一关。你也可以直接问：如何学 Python 建模、如何做论文选题、如何搭建 Agent 工作流、如何接入 DeepSeek 助教。";
    setAssistantAnswer(best.score > 0 ? best.answer : fallback);
  }

  function moduleDone(trackId, index) {
    return Boolean(progress[`${trackId}-${index}`]);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="返回首页">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>AI Skill Quest</span>
        </a>
        <nav aria-label="主导航">
          <a href="#map">学习地图</a>
          <a href="#lesson">教程关卡</a>
          <a href="#quests">任务系统</a>
          <a href="#mentor">AI 助教</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow">
              <Compass size={16} />
              结合课程大纲、Datawhale 风格学习路径与内容生态经验重构
            </div>
            <h1>不是课程目录，而是一套能闯关、能产出、能盈利的 AI 学习系统</h1>
            <p>
              现在这个站点不再只是导航页，而是把智能体、数据分析、自动化、论文写作做成真正可执行的学习关卡。每一关都有目标、教程、练习、验收和交付物。
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#lesson">
                开始第一关
                <ChevronRight size={18} />
              </a>
              <a className="secondary-action" href="#mentor">
                试用助教
                <MessageSquareText size={18} />
              </a>
            </div>
          </div>

          <div className="command-panel" aria-label="学习进度面板">
            <div className="panel-header">
              <span>学习者控制台</span>
              <Rocket size={18} />
            </div>
            <div className="level-ring">
              <div>
                <strong>{completionRate}%</strong>
                <span>主线推进度</span>
              </div>
            </div>
            <div className="stat-grid">
              <div>
                <span>XP</span>
                <strong>{xp}</strong>
              </div>
              <div>
                <span>已通关</span>
                <strong>
                  {completedCount}/{totalModules}
                </strong>
              </div>
              <div>
                <span>徽章</span>
                <strong>{unlockedBadges.length}</strong>
              </div>
            </div>
            <div className="live-stats">
              <div>
                <Flame size={16} />
                <span>{streak} 日连击</span>
              </div>
              <div>
                <Gamepad2 size={16} />
                <span>能量 {energy}</span>
              </div>
              <div>
                <Swords size={16} />
                <span>当前任务：{currentQuest.tag}</span>
              </div>
            </div>
            <p className="next-tip">{recommended}</p>
          </div>
        </section>

        <section className="section compact-section">
          <div className="section-title">
            <span>学习闭环</span>
            <h2>输入、执行、反馈、沉淀，才会有真正的游戏感</h2>
          </div>
          <div className="plan-grid">
            {learningLoops.map((loop, index) => (
              <article className="plan-card" key={loop.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{loop.title}</h3>
                <p>{loop.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="map">
          <div className="section-title">
            <span>学习地图</span>
            <h2>先选主线，再进入关卡</h2>
          </div>
          <div className="map-layout">
            <aside className="track-list" aria-label="课程航线">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  className={`track-button ${track.id === activeTrackId ? "active" : ""}`}
                  onClick={() => setActiveTrackId(track.id)}
                  style={{ "--track": track.color, "--accent": track.accent }}
                >
                  <span>{track.level}</span>
                  <div>
                    <strong>{track.title}</strong>
                    <small>{track.subtitle}</small>
                  </div>
                </button>
              ))}
            </aside>

            <div className="track-detail" style={{ "--track": activeTrack.color, "--accent": activeTrack.accent }}>
              <div className="track-hero">
                <div>
                  <div className="track-label">{activeTrack.level}</div>
                  <h3>{activeTrack.title}</h3>
                  <p>{activeTrack.subtitle}</p>
                </div>
                <div className="track-meta">
                  <span>{activeTrack.hours} 学时</span>
                  <span>{activeTrack.modules.length} 关卡</span>
                </div>
              </div>

              <div className="track-overview">
                <div>
                  <strong>适合人群</strong>
                  <p>{activeTrack.audience}</p>
                </div>
                <div>
                  <strong>完成后你将获得</strong>
                  <div className="outcomes">
                    {activeTrack.outcomes.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="module-path">
                {activeTrack.modules.map((module, index) => {
                  const done = moduleDone(activeTrack.id, index);
                  const moduleId = `${activeTrack.id}-${index}`;
                  return (
                    <article
                      className={`module-card ${done ? "done" : ""} ${selectedModuleIndex === index ? "selected" : ""}`}
                      key={moduleId}
                    >
                      <button className="check-button" onClick={() => toggleModule(moduleId)} aria-label="切换完成状态">
                        {done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                      </button>
                      <div className="module-index">{String(index + 1).padStart(2, "0")}</div>
                      <button className="module-focus" onClick={() => setSelectedModuleIndex(index)}>
                        <div className="module-body">
                          <div className="module-topline">
                            <h4>{module.title}</h4>
                            <span className="difficulty-badge">{module.difficulty}</span>
                          </div>
                          <p>{module.summary}</p>
                          <div className="task-list">
                            {module.tasks.map((task) => (
                              <span key={task}>{task}</span>
                            ))}
                          </div>
                        </div>
                      </button>
                    </article>
                  );
                })}
              </div>
              <p className="source-note">内容来源：{activeTrack.source}。本平台已将培训大纲重组为可学习、可交付、可商业化的教程关卡。</p>
            </div>
          </div>
        </section>

        <section className="section lesson-section" id="lesson">
          <div className="section-title">
            <span>教程关卡</span>
            <h2>当前关卡：{selectedModule.title}</h2>
          </div>

          <div className="lesson-layout">
            <article className="lesson-main">
              <div className="lesson-header">
                <div className="lesson-chip-group">
                  <span className="lesson-chip">
                    <Target size={14} />
                    {selectedModule.difficulty}
                  </span>
                  <span className="lesson-chip">
                    <Swords size={14} />
                    任务目标
                  </span>
                </div>
                <p className="lesson-mission">{selectedModule.mission}</p>
              </div>

              <section className="lesson-block">
                <h3>学习目标</h3>
                <ul>
                  {selectedModule.learnGoals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </section>

              <section className="lesson-block">
                <h3>教程正文</h3>
                {selectedModule.tutorial.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>

              <section className="lesson-block">
                <h3>推荐工具栈</h3>
                <div className="tag-wall">
                  {selectedModule.toolStack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </section>

              <section className="lesson-block">
                <h3>示例提示词</h3>
                <div className="prompt-list">
                  {selectedModule.prompts.map((prompt) => (
                    <blockquote key={prompt}>{prompt}</blockquote>
                  ))}
                </div>
              </section>
            </article>

            <aside className="lesson-side">
              <section className="lesson-panel">
                <h3>
                  <ListChecks size={18} />
                  练习任务
                </h3>
                <ul>
                  {selectedModule.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </section>

              <section className="lesson-panel">
                <h3>
                  <FileText size={18} />
                  交付物
                </h3>
                <p>{selectedModule.deliverable}</p>
              </section>

              <section className="lesson-panel">
                <h3>
                  <ShieldCheck size={18} />
                  验收标准
                </h3>
                <ul>
                  {selectedModule.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="lesson-panel">
                <h3>
                  <BookOpenCheckIcon />
                  参考来源类型
                </h3>
                <ul>
                  {selectedModule.references.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </section>

        <section className="section two-column" id="quests">
          <div>
            <div className="section-title">
              <span>任务系统</span>
              <h2>主线、精英、Boss 任务一起推动学习</h2>
            </div>
            <div className="quest-list">
              {quests.map((quest) => (
                <button
                  key={quest.id}
                  className={`quest-card ${selectedQuest === quest.id ? "active" : ""}`}
                  onClick={() => setSelectedQuest(quest.id)}
                >
                  <span className="quest-tag">{quest.tag}</span>
                  <div>
                    <h3>{quest.title}</h3>
                    <p>{quest.detail}</p>
                  </div>
                  <strong>+{quest.xp} XP</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="reward-board">
            <div className="panel-header">
              <span>徽章墙</span>
              <Trophy size={18} />
            </div>
            {badges.map((badge) => {
              const unlocked = completedCount >= badge.threshold;
              return (
                <div className={`badge-row ${unlocked ? "unlocked" : ""}`} key={badge.id}>
                  <Award size={24} />
                  <div>
                    <strong>{badge.title}</strong>
                    <span>{badge.description}</span>
                  </div>
                </div>
              );
            })}
            <button className="ghost-button" onClick={resetProgress}>
              重置本地进度
            </button>
          </div>
        </section>

        <section className="section mentor-section" id="mentor">
          <div className="mentor-copy">
            <div className="section-title">
              <span>AI 助教</span>
              <h2>先用本地知识助教，后续再接 DeepSeek</h2>
            </div>
            <p>
              当前模式是本地知识路由，能给学习路径建议、模块推荐和交付物提醒。后续如果你提供 DeepSeek API key，我会把它接到后端接口，不会放进前端代码。
            </p>
            <div className="deepseek-card">
              <strong>DeepSeek 接入原则</strong>
              <ul>
                {deepseekGuide.backendRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mentor-console">
            <div className="assistant-head">
              <Bot size={22} />
              <span>AI 助教 · {assistantMode === "local" ? "本地知识模式" : "DeepSeek 模式"}</span>
            </div>
            <div className="input-row">
              <Search size={18} />
              <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="问我：如何做论文选题？如何设计一个 Agent 工作流？" />
              <button onClick={() => askAssistant(question)}>提问</button>
            </div>
            <div className="answer-box">
              <MessageSquareText size={20} />
              <p>{assistantAnswer}</p>
            </div>
            <div className="quick-prompts">
              {["OpenClaw 怎么学？", "Python 建模怎么学？", "SCI 论文如何选题？", "如何接入 DeepSeek 助教？"].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setQuestion(prompt);
                    askAssistant(prompt);
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section compact-section" id="open-source">
          <div className="section-title">
            <span>部署与商业化</span>
            <h2>前端负责体验，后端负责助教、权益和安全</h2>
          </div>
          <div className="deploy-grid">
            <article>
              <GitBranch size={24} />
              <h3>受控发布</h3>
              <p>前端可持续部署到 Cloudflare Pages，源码和商业逻辑继续保持私有。</p>
            </article>
            <article>
              <Code2 size={24} />
              <h3>后端接入</h3>
              <p>DeepSeek、支付、权益、日志、限流都应放在后端或 Serverless。</p>
            </article>
            <article>
              <Layers3 size={24} />
              <h3>内容演进</h3>
              <p>后续可把课程内容迁移到 CMS 或数据库，做会员课程、作业批改与社区体系。</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <GraduationCap size={20} />
          <strong>AI Skill Quest</strong>
        </div>
        <span>私有、可部署、可持续迭代的 AI 技能学习平台。</span>
      </footer>
    </div>
  );
}

function BookOpenCheckIcon() {
  return <FileText size={18} />;
}

export default App;
