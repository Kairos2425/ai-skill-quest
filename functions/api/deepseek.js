const COURSE_CONTEXT = `
你是 AI Skill Quest 的站内学习助教。
你的职责：
1. 只围绕本站学习路线回答：智能体基本功、Python 数据分析与机器学习、OpenClaw 科研自动化、SCI 论文工作坊、个人 AI 科研副本。
2. 优先给出学习建议、任务拆解、交付物建议、练习反馈，而不是泛泛聊天。
3. 如果用户问题超出站点范围，先说明边界，再尽量映射回可执行学习步骤。
4. 避免编造课程进度、用户隐私、收费权益等未提供信息。
5. 对涉及医学、法律、财务等高风险内容，只给一般学习建议，不给专业结论。
6. 回答要短、具体、可执行，尽量给出下一步任务。
`;

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...(init.headers ?? {}),
    },
  });
}

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "same-origin",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-AI-Skill-Client",
    },
  });
}

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) {
    return json({ error: "Cross-origin requests are not allowed" }, { status: 403 });
  }

  if (request.headers.get("X-AI-Skill-Client") !== "site") {
    return json({ error: "Missing client header" }, { status: 403 });
  }

  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return json({ error: "DEEPSEEK_API_KEY is not configured" }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  const history = Array.isArray(body.history) ? body.history : [];

  if (!question) {
    return json({ error: "question is required" }, { status: 400 });
  }

  if (question.length > 1200) {
    return json({ error: "question is too long" }, { status: 413 });
  }

  const messages = [
    { role: "system", content: COURSE_CONTEXT },
    ...history
      .filter((item) => item && typeof item.content === "string" && (item.role === "user" || item.role === "assistant"))
      .slice(-6)
      .map((item) => ({ role: item.role, content: item.content.slice(0, 1200) })),
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
      temperature: 0.35,
      max_tokens: 900,
      messages,
    }),
  });

  if (!result.ok) {
    const text = await result.text();
    return json(
      {
        error: "DeepSeek request failed",
        status: result.status,
        detail: text.slice(0, 500),
      },
      { status: 502 },
    );
  }

  const data = await result.json();
  const answer = data?.choices?.[0]?.message?.content?.trim() || "当前未生成有效回答。";
  return json({ answer, mode: "deepseek" });
}
