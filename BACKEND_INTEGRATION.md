# DeepSeek 助教接入说明

## 原则

- API Key 只放在部署平台环境变量中。
- 前端不得直接调用 DeepSeek 官方接口。
- 助教后端负责：
  - 注入课程上下文
  - 控制历史轮数
  - 做限流与日志
  - 未来接入用户身份和权益判断

## 当前接口

文件：

`api/deepseek.js`

请求格式：

```json
{
  "question": "如何做论文选题？",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

返回格式：

```json
{
  "answer": "..."
}
```

## Vercel / Cloudflare 环境变量

环境变量名：

`DEEPSEEK_API_KEY`

## 下一步建议

1. 给助教接口加速率限制。
2. 记录匿名问题日志。
3. 对不同课程路线注入不同上下文。
4. 加入会员权益和调用额度控制。
