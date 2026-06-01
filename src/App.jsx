import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpenCheck,
  Bot,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  Compass,
  GitBranch,
  GraduationCap,
  Layers3,
  MessageSquareText,
  Rocket,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import { assistantKnowledge, badges, quests, tracks } from "./courseData.js";

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
  const [progress, setProgress] = useState(loadProgress);
  const [question, setQuestion] = useState("零基础科研人员应该先学哪条路线？");
  const [assistantAnswer, setAssistantAnswer] = useState("");
  const [selectedQuest, setSelectedQuest] = useState(quests[0].id);

  const activeTrack = tracks.find((track) => track.id === activeTrackId) ?? tracks[0];
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
  const xp = completedCount * 60 + quests.find((quest) => quest.id === selectedQuest).xp;
  const unlockedBadges = badges.filter((badge) => completedCount >= badge.threshold);

  const recommended = useMemo(() => {
    if (completedCount < 2) return "先完成智能体基本功的 3 张卡片，建立学习坐标系。";
    if (completedCount < 6) return "进入 Python 或 OpenClaw，做一个可展示的小作品。";
    if (completedCount < 10) return "开始 SCI 工作坊，把技术成果转成论文结构。";
    return "挑战 Boss 关：搭建个人 AI 科研副本，并可控发布。";
  }, [completedCount]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    askAssistant(question);
  }, []);

  function toggleModule(moduleId) {
    setProgress((current) => ({ ...current, [moduleId]: !current[moduleId] }));
  }

  function resetProgress() {
    setProgress({});
  }

  function askAssistant(input) {
    const cleanInput = input.trim();
    if (!cleanInput) {
      setAssistantAnswer("先告诉我你的目标，比如「我要做论文选题」或「我想学 OpenClaw 自动化」。");
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
      "我会把你的问题映射到学习地图：先明确目标产出，再选择航线，最后拆成一张可完成的任务卡。你可以问：Python 建模怎么学、OpenClaw 如何部署、SCI 论文如何选题、如何设置游戏化奖励。";
    setAssistantAnswer(best.score > 0 ? best.answer : fallback);
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
          <a href="#quests">任务</a>
          <a href="#mentor">自动助教</a>
          <a href="#open-source">私有部署</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow">
              <Compass size={16} />
              由 6 份 AI/科研培训大纲重组
            </div>
            <h1>把 AI 技能学习做成一张能闯关的科研地图</h1>
            <p>
              从数据分析、机器学习、MATLAB、OpenClaw、Claude Code、多智能体到 SCI 写作，学习者不再面对一堆课程目录，而是沿着任务、奖励和作品一步步升级。
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#map">
                开始闯关
                <ChevronRight size={18} />
              </a>
              <a className="secondary-action" href="#mentor">
                问自动助教
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
                <span>地图进度</span>
              </div>
            </div>
            <div className="stat-grid">
              <div>
                <span>XP</span>
                <strong>{xp}</strong>
              </div>
              <div>
                <span>模块</span>
                <strong>
                  {completedCount}/{totalModules}
                </strong>
              </div>
              <div>
                <span>徽章</span>
                <strong>{unlockedBadges.length}</strong>
              </div>
            </div>
            <p className="next-tip">{recommended}</p>
          </div>
        </section>

        <section className="section compact-section">
          <div className="section-title">
            <span>产品计划</span>
            <h2>先搭 MVP，再扩展为可商业化学习平台</h2>
          </div>
          <div className="plan-grid">
            {[
              ["01", "内容重组", "把六份材料整理成六条航线和一个 Boss 项目。"],
              ["02", "游戏化引导", "用 XP、徽章、任务卡和作品交付驱动学习。"],
              ["03", "自动助教", "先用本地知识库检索回答，后续可接 LLM API。"],
              ["04", "私有部署", "静态站点可发布到 Cloudflare Pages、Vercel 或 Netlify。"],
            ].map(([num, title, text]) => (
              <article className="plan-card" key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="map">
          <div className="section-title">
            <span>学习地图</span>
            <h2>六条航线，一个最终作品</h2>
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
                  <span>{activeTrack.modules.length} 模块</span>
                </div>
              </div>

              <div className="outcomes">
                {activeTrack.outcomes.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="module-path">
                {activeTrack.modules.map((module, index) => {
                  const moduleId = `${activeTrack.id}-${index}`;
                  const done = Boolean(progress[moduleId]);
                  return (
                    <article className={`module-card ${done ? "done" : ""}`} key={moduleId}>
                      <button className="check-button" onClick={() => toggleModule(moduleId)} aria-label="切换完成状态">
                        {done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                      </button>
                      <div className="module-index">{String(index + 1).padStart(2, "0")}</div>
                      <div className="module-body">
                        <h4>{module.title}</h4>
                        <p>{module.summary}</p>
                        <div className="task-list">
                          {module.tasks.map((task) => (
                            <span key={task}>{task}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className="source-note">内容来源：{activeTrack.source}。本站已将培训通知式大纲改造成可持续学习路线。</p>
            </div>
          </div>
        </section>

        <section className="section two-column" id="quests">
          <div>
            <div className="section-title">
              <span>任务系统</span>
              <h2>奖励绑定作品，而不是只奖励观看</h2>
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
              <span>自动助教</span>
              <h2>先做本地知识库助教，再接真实模型</h2>
            </div>
            <p>
              当前版本不会上传数据，直接根据课程知识库和关键词给出路线建议。后续部署时可接入 OpenAI、DeepSeek、Claude 或校内私有模型，让它读取课程 JSON、作业状态和 FAQ。
            </p>
          </div>
          <div className="mentor-console">
            <div className="assistant-head">
              <Bot size={22} />
              <span>AI 助教 · 本地知识库模式</span>
            </div>
            <div className="input-row">
              <Search size={18} />
              <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="问我：OpenClaw 怎么学？SCI 论文怎么选题？" />
              <button onClick={() => askAssistant(question)}>提问</button>
            </div>
            <div className="answer-box">
              <MessageSquareText size={20} />
              <p>{assistantAnswer}</p>
            </div>
            <div className="quick-prompts">
              {["OpenClaw 如何部署？", "Python 建模怎么学？", "SCI 论文如何选题？", "奖励机制怎么设计？"].map((prompt) => (
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
            <span>私有部署</span>
            <h2>面向 Cloudflare Pages / Vercel / Netlify 的受控静态站点</h2>
          </div>
          <div className="deploy-grid">
            <article>
              <GitBranch size={24} />
              <h3>私有仓库</h3>
              <p>课程数据集中在 <code>src/courseData.js</code>，后续商业版应迁移到后端或受控 CMS。</p>
            </article>
            <article>
              <Code2 size={24} />
              <h3>构建命令</h3>
              <p><code>npm install</code> 后执行 <code>npm run build</code>，产物在 <code>dist</code>。</p>
            </article>
            <article>
              <Layers3 size={24} />
              <h3>助教升级</h3>
              <p>把本地关键词检索替换为 API 调用，即可接入真实模型和课程知识库检索。</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <GraduationCap size={20} />
          <strong>AI Skill Quest</strong>
        </div>
        <span>私有、可部署、以作品为中心的 AI 技能学习网站。</span>
      </footer>
    </div>
  );
}

export default App;
