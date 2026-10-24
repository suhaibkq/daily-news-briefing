import { fetchHeadlines } from './fetchHeadlines.js';
import { sendBriefingEmail } from './sendEmail.js';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function saveArchive(briefing) {
  const lines = [
    `# Daily Briefing — ${briefing.date}`,
    '',
    '## 🌍 International',
    '',
    ...briefing.international.map(
      (item) => `### ${item.source}\n**[${item.headline}](${item.url})**\n${item.summary}`
    ),
    '',
    '## 🇵🇰 Pakistan',
    '',
    ...briefing.pakistan.map(
      (item) => `### ${item.source}\n**[${item.headline}](${item.url})**\n${item.summary}`
    ),
  ];

  const date = new Date().toISOString().slice(0, 10);
  const dir = join(process.cwd(), 'archive');
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, `${date}.md`), lines.join('\n'));
  console.log(`Archive saved: archive/${date}.md`);
}

async function run() {
  console.log('Fetching headlines…');
  const briefing = await fetchHeadlines();

  const intlCount = briefing.international?.length ?? 0;
  const pkCount = briefing.pakistan?.length ?? 0;
  console.log(`Got ${intlCount} international and ${pkCount} Pakistan headlines.`);

  await saveArchive(briefing);

  console.log('Sending email…');
  await sendBriefingEmail(briefing);

  console.log('Done.');
}

run().catch((err) => {
  console.error('Briefing failed:', err.message);
  process.exit(1);
});
