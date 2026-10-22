# Product Requirements Document
## Daily News Briefing

**Owner:** Suhaib  
**Status:** v1.0 — Active  
**Last updated:** October 2026

---

## Problem
Staying informed across international and Pakistan-specific news requires opening multiple paywalled tabs daily. A curated, automated briefing saves 15–20 minutes each morning.

## Goal
Deliver a concise daily email digest of top headlines from five curated sources, ready to read at 7:00 AM US Central Time.

## In-scope sources
| Category | Source |
|---|---|
| International | Washington Post |
| International | New York Times |
| International | Wall Street Journal |
| International | The Guardian |
| Pakistan | Dawn |

Out-of-scope: all other sources.

## Functional requirements
1. Run automatically every day at 7:00 AM US Central Time.
2. Fetch 3–5 headlines per source with a one-sentence summary each.
3. Deliver a formatted HTML email to suhaibq@gmail.com.
4. Require no manual action from the user.
5. Cost under $5/month to operate.

## Non-functional requirements
- No AWS dependency.
- No always-on server required (GitHub Actions handles scheduling).
- Secrets stored in GitHub Actions, not committed to the repo.
- Graceful failure: if a source is unreachable, log the gap rather than crashing.

## Constraints
- Sources are fixed. Do not substitute or augment.
- Paywalled outlets (WSJ, NYT, Guardian) may yield thinner coverage; this is accepted.

## Success metrics
- Email delivered before 7:15 AM CT on ≥ 95% of days.
- At least 3 of 5 sources have at least one headline on any given day.
