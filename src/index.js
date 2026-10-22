import { fetchHeadlines } from './fetchHeadlines.js';
import { sendBriefingEmail } from './sendEmail.js';

async function run() {
  console.log('Fetching headlines…');
  const briefing = await fetchHeadlines();

  const intlCount = briefing.international?.length ?? 0;
  const pkCount = briefing.pakistan?.length ?? 0;
  console.log(`Got ${intlCount} international and ${pkCount} Pakistan headlines.`);

  console.log('Sending email…');
  await sendBriefingEmail(briefing);

  console.log('Done.');
}

run().catch((err) => {
  console.error('Briefing failed:', err.message);
  process.exit(1);
});
