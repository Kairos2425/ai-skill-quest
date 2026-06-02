const COURSE_CONTEXT = `
你是 AI Skill Quest 的站内学习助教。
你的职责：
1. 只围绕本站学习路线回答：智能体基本功、Python 数据分析与机器学习、OpenClaw 科研自动化、SCI 论文工作坊、个人 AI 科研副本。
2. 优先给出学习建议、任务拆解、交付物建议、练习反馈，而不是泛泛聊天。
3. 如果用户问题超出站点范围，先说明边界，再尽量映射回可执行学习步骤。
4. 避免编造课程进度、用户隐私、收费权益等未提供信息。
5. 对涉及医学、法律、财务等高风险内容，只给一般学习建议，不给专业结论。
6. 用户常用中文或中英混合提问；只要能读懂，就不要说“乱码”或要求重新描述。
`;

function normalizeAnswer(answer, question) {
  const hasReadableChinese = /[\u4e00-\u9fa5]/.test(question);
  if (!hasReadableChinese) return answer;

  const cleaned = answer
    .replace(/^您好！?看起来您的问题似乎出现了乱码，不过别担心，我可以帮您梳理一下。\s*/u, "")
    .replace(/^你好！?看起来你的消息可能出现了乱码。不过别担心，?\s*/u, "")
    .replace(/^您好！?看起来您的问题可能出现了编码问题，我无法直接识别。不过别担心，我会尽力帮您。\s*/u, "")
    .replace(/^看起来.*?乱码.*?\n\n/u, "")
    .replace(/^.*?编码问题.*?\n\n/u, "")
    .replace(/如果问题不是这个，请重新用中文描述，我会尽力帮您解答。/u, "")
    .trim();

  if (/(乱码|编码问题|重新描述|无法直接识别)/u.test(cleaned.slice(0, 160))) {
    return fallbackChineseAnswer(question);
  }

  return cleaned;
}

function fallbackChineseAnswer(question) {
  if (/路线|入门|零基础|怎么学|学习/u.test(question)) {
    return `建议按 5 个阶段推进：

1. 智能体基本功：先理解 LLM、工作流、Agent、RAG 和提示词边界。
2. Python 数据分析与机器学习：完成数据质量诊断、特征工程、建模和结果解释。
3. OpenClaw 科研自动化：把文献检索、摘要、对比表、数据清洗做成可复跑流程。
4. SCI 论文工作坊：训练选题、创新点、论文结构、图表和审稿回复。
5. 个人 AI 科研副本：把教程、作品、SOP、提示词和复盘整合成自己的学习系统。

下一步任务：先完成“智能体基本功”的第 1 关，并交付一张 AI 任务分层图。`;
  }

  return "我建议先把你的问题转成一个可执行学习任务：明确目标、已有基础、想完成的交付物和时间范围。你可以从当前学习地图中选择一条主线，我会继续帮你拆成关卡任务。";
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    response.status(500).json({ error: "DEEPSEEK_API_KEY is not configured" });
    return;
  }

  try {
    const { question, history = [] } = request.body ?? {};

    if (!question || typeof question !== "string") {
      response.status(400).json({ error: "question is required" });
      return;
    }

    const messages = [
      { role: "system", content: COURSE_CONTEXT },
      ...history
        .filter((item) => item && typeof item.content === "string" && (item.role === "user" || item.role === "assistant"))
        .slice(-8),
      { role: "user", content: `用户问题（中文或中英混合）：${question}` },
    ];

    const result = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.4,
        max_tokens: 1000,
        messages,
      }),
    });

    if (!result.ok) {
      const text = await result.text();
      response.status(result.status).json({ error: "DeepSeek request failed", detail: text });
      return;
    }

    const data = await result.json();
    const rawAnswer = data?.choices?.[0]?.message?.content ?? "当前未生成有效回答。";
    const answer = normalizeAnswer(rawAnswer, question);
    response.status(200).json({ answer });
  } catch (error) {
    response.status(500).json({
      error: "Unexpected server error",
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
