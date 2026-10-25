# Daily News Briefing

Automated daily email digest of top headlines from five curated news sources, delivered to your inbox at **7:00 AM US Central Time** — no server required.

## Sources
| Category | Outlet |
|---|---|
| International | Washington Post · New York Times · Wall Street Journal · The Guardian |
| Pakistan | Dawn |

## How it works
1. **GitHub Actions** triggers the workflow every day at 12:00 UTC (7AM CDT).
2. **Claude API** (`claude-haiku-5-5`) with web search fetches today's top headlines from each outlet.
3. **nodemailer + Gmail SMTP** emails a formatted HTML digest to configured recipients.

## Stack
| Layer | Tool | Cost |
|---|---|---|
| LLM + web search | Anthropic Claude Haiku API | ~$0.05/day |
| Email delivery | Gmail SMTP (nodemailer) | $0 |
| Scheduler | GitHub Actions | $0 (public repo) |
| Infrastructure | None | — |

**Estimated monthly cost: < $2**

---

## Setup

### 1. Fork or clone this repo
```bash
git clone https://github.com/suhaibkq/daily-news-briefing.git
cd daily-news-briefing
npm install
```

### 2. Get your API keys

**Anthropic API key**  
→ [console.anthropic.com](https://console.anthropic.com) → API Keys → Create key

**Gmail App Password**  
→ [myaccount.google.com](https://myaccount.google.com) → Security → 2-Step Verification → App passwords → Create  
(requires 2FA to be enabled on your Google account)

### 3. Add secrets to GitHub
Go to your repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic key (`sk-ant-...`) |
| `GMAIL_APP_PASSWORD` | Your Gmail App Password (16-char code) |

### 4. Test locally
```bash
cp .env.example .env
# Fill in your keys in .env

node src/index.js
```
You should receive an email within ~60 seconds.

### 5. Enable the workflow
The workflow in `.github/workflows/daily-briefing.yml` runs automatically once the secrets are set. You can also trigger it manually from the **Actions** tab → **Daily News Briefing** → **Run workflow**.

---

## Cron schedule
The workflow is set to `0 12 * * *` (12:00 UTC = 7:00 AM CDT, UTC-5).

When US clocks fall back to CST (first Sunday of November), update the cron to `0 13 * * *` and revert in March.

---

## Known limitations
- WSJ, NYT, and Guardian are paywalled. Claude's web search reaches their public listings and syndicated summaries — coverage from these three may be thinner on some days.
- GitHub Actions cron can drift by a few minutes under load.

---

## Project structure
```
daily-news-briefing/
├── src/
│   ├── index.js           # entry point
│   ├── fetchHeadlines.js  # Claude API + web search
│   └── sendEmail.js       # Gmail SMTP email delivery
├── .github/workflows/
│   └── daily-briefing.yml # GitHub Actions cron
├── docs/
│   ├── PRD.md             # product requirements
│   └── decision-log.md    # key architectural decisions
├── CLAUDE.md              # context for Claude Code sessions
├── .env.example           # secrets template
└── README.md
```
