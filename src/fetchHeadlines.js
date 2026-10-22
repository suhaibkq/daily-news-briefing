import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function fetchHeadlines() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Chicago',
  });

  const systemPrompt = `You are a news editor who compiles concise daily briefings.
Search for today's top headlines from the specified sources only.
Return results as valid JSON only — no preamble, no commentary, no markdown fences.`;

  const userPrompt = `Today is ${today} (US Central Time).

Search for today's top headlines from ONLY these five sources:
- Washington Post (washingtonpost.com)
- New York Times (nytimes.com)
- Wall Street Journal (wsj.com)
- The Guardian (theguardian.com)
- Dawn (dawn.com)

Search each source separately. For each source find 3–5 headlines with a one-sentence summary (max 25 words).

Return ONLY this JSON structure, with no text outside it:
{
  "date": "${today}",
  "international": [
    { "source": "Washington Post", "headline": "...", "summary": "..." },
    { "source": "New York Times",  "headline": "...", "summary": "..." },
    { "source": "Wall Street Journal", "headline": "...", "summary": "..." },
    { "source": "The Guardian",    "headline": "...", "summary": "..." }
  ],
  "pakistan": [
    { "source": "Dawn", "headline": "...", "summary": "..." }
  ]
}`;

  const stream = client.messages.stream({
    model: 'claude-opus-5-5',
    max_tokens: 4096,
    system: systemPrompt,
    tools: [{ type: 'web_search_20260209', name: 'web_search' }],
    messages: [{ role: 'user', content: userPrompt }],
  });

  const response = await stream.finalMessage();

  for (const block of response.content) {
    if (block.type === 'text' && block.text.trim()) {
      const match = block.text.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
    }
  }

  throw new Error('Claude returned no valid JSON briefing data');
}
