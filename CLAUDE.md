# Daily News Briefing — Claude Code Context

## What this project does
Fetches top headlines from five specific news sources every morning and emails them to suhaibq@gmail.com at 7:00 AM US Central Time.

## Sources (fixed — do not add or swap)
- International: Washington Post, New York Times, Wall Street Journal, The Guardian
- Pakistan: Dawn

## Architecture
- `src/fetchHeadlines.js` — calls Claude API (claude-opus-5-5) with web_search tool to gather headlines
- `src/sendEmail.js` — formats and sends HTML email via Resend
- `src/index.js` — entry point, orchestrates fetch → email
- `.github/workflows/daily-briefing.yml` — GitHub Actions cron at 12:00 UTC (7AM CDT)

## Constraints
- No AWS (rejected in favour of Resend + GitHub Actions)
- No additional sources beyond the five listed above
- Email recipient: suhaibq@gmail.com only
- Scheduler: GitHub Actions (free, no server required)

## Secrets required (set in GitHub repo → Settings → Secrets → Actions)
- `ANTHROPIC_API_KEY` — Anthropic API key
- `RESEND_API_KEY` — Resend API key (free tier at resend.com)

## Known limitation
WSJ, NYT, and Guardian are paywalled. Claude's web search can reach their public listings and syndicated summaries but not full article bodies. Coverage may be thinner for those three sources on some days.

## Cron schedule note
The workflow runs at 12:00 UTC = 7:00 AM CDT (Mar–Nov).
Change to `0 13 * * *` for 7:00 AM CST (Nov–Mar) after US clocks fall back.
