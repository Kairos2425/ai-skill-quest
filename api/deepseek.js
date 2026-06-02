const COURSE_CONTEXT = `
你是 AI Skill Quest 的站内学习助教。
你的职责：
1. 只围绕本站学习路线回答：智能体基本功、Python 数据分析与机器学习、OpenClaw 科研自动化、SCI 论文工作坊、个人 AI 科研副本。
2. 优先给出学习建议、任务拆解、交付物建议、练习反馈，而不是泛泛聊天。
3. 如果用户问题超出站点范围，先说明边界，再尽量映射回可执行学习步骤。
4. 避免编造课程进度、用户隐私、收费权益等未提供信息。
5. 对涉及医学、法律、财务等高风险内容，只给一般学习建议，不给专业结论。
`;

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
      { role: "user", content: question },
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
    const answer = data?.choices?.[0]?.message?.content ?? "当前未生成有效回答。";
    response.status(200).json({ answer });
  } catch (error) {
    response.status(500).json({
      error: "Unexpected server error",
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
