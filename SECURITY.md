# Security Policy

## Commercialization Boundary

This project is intended for controlled commercial deployment. Do not treat it
as open source. The public website may expose built frontend assets, but the
source repository, business rules, AI tutor implementation, payments, user
entitlements, course assets, and analytics pipeline should remain private.

## Frontend Hard Boundary

Never put these in frontend code:

- API keys or model provider keys
- Cloudflare, Vercel, GitHub, or payment tokens
- Prompt templates that define proprietary tutor behavior
- Paid course entitlement logic
- User identity verification logic
- Anti-abuse rules
- Private course PDFs or extracted raw text

## Reverse Engineering Notes

Frontend JavaScript can always be inspected after deployment. Minification and
bundling only raise friction; they do not protect secrets. Anything valuable or
security-sensitive must live behind an authenticated backend.

Recommended future steps:

1. Move the real AI tutor to a backend API.
2. Use signed sessions and server-side entitlement checks.
3. Store course assets behind authenticated object storage.
4. Add rate limiting, logging, and abuse detection at the edge.
5. Use Cloudflare WAF, Turnstile, and bot protection for public entry points.

## Deployment Safety

- Keep the GitHub repository private.
- Deploy only generated `dist/` assets publicly.
- Use environment variables in hosting providers; never commit `.env` files.
- Rotate tokens immediately if they are pasted into chat, committed, or exposed.
