// gta6-meme-x-01 entry program.
//
// What it does: carry the post address from this repository into the
// grader's output folder. The post itself is the entry — the house reads
// it from X (first picture, then text) and hands it to the judge — so all
// this program has to do is deliver POST.json unchanged.
//
// It runs on Node 22 with the standard library only: no network, no
// clock, nothing outside the repository. Both runs must write the same
// bytes, so the copy is byte-for-byte and the program prints nothing
// when it works.
//
// Local check:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// and out/POST.json then matches POST.json exactly.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The grader mounts the repository at /bot and wants output at /output.
// Outside the grader, the two environment variables stand in for those.
const repoRoot = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outRoot = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(repoRoot, 'POST.json');
const target = join(outRoot, 'POST.json');

if (!existsSync(source)) {
  console.error(`no POST.json found under ${repoRoot}`);
  process.exit(1);
}

mkdirSync(outRoot, { recursive: true });
const bytes = readFileSync(source);

// Refuse to hand the gate a file that is not even a post address:
// it must parse as JSON and carry a url string. Anything else is a
// broken entry, and failing loudly here beats a silent bad submission.
let parsed: unknown;
try {
  parsed = JSON.parse(bytes.toString('utf8'));
} catch {
  console.error('POST.json is not valid JSON');
  process.exit(1);
}
if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
  console.error('POST.json must be an object with a url string');
  process.exit(1);
}

writeFileSync(target, bytes);
