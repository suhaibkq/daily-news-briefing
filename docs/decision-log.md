# Decision Log

## 001 — Drop AWS in favour of Resend + GitHub Actions
**Date:** October 2026  
**Decision:** Use Resend (free-tier email API) and GitHub Actions (free cron) instead of AWS Polly + SES + EC2.  
**Rationale:** User explicitly ruled out AWS. GitHub Actions is free for public repos and requires no always-on infrastructure. Resend's free tier (100 emails/day) is more than sufficient.  
**Trade-off:** Loses text-to-speech (MP3) capability; briefing is read, not heard. Accepted.

## 002 — Sources are fixed to five outlets only
**Date:** October 2026  
**Decision:** Restrict fetching to Washington Post, NYT, WSJ, Guardian, and Dawn. No substitutions if a source is unreachable.  
**Rationale:** User requirement. Prevents scope creep and keeps the briefing focused.  
**Trade-off:** WSJ, NYT, and Guardian are paywalled. Coverage from those three may be thin on some days. Accepted — the log entry is noted in the README.

## 003 — Use Claude API (claude-opus-5-5) with web_search tool
**Date:** October 2026  
**Decision:** Leverage Claude's built-in web search rather than scraping each site directly.  
**Rationale:** Avoids per-site scraper maintenance, handles paywalls gracefully (searches public listings), and keeps the codebase to three small files.  
**Trade-off:** Output quality depends on Claude's web search results. Paywalled outlets may return syndicated summaries rather than the outlet's own page.

## 004 — GitHub Actions cron as scheduler
**Date:** October 2026  
**Decision:** Use `.github/workflows/daily-briefing.yml` with a cron trigger at 12:00 UTC (7AM CDT).  
**Rationale:** Free for public repos, no server to maintain, visible run history in the GitHub Actions tab.  
**Trade-off:** GitHub Actions cron can drift by a few minutes under load. Acceptable for a morning briefing.  
**Note:** Cron must be manually updated twice a year when US clocks change (CDT ↔ CST).
