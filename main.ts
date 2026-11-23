// A working entry for a make.fun photo-on-X bounty (Node 22, standard library only): it copies POST.json from the
// repository root to /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the
// post itself: you quote make.fun's make-your-own-bounty post on X from a public account, attach a photo of your own,
// and your post's text carries make.fun (a link or written out) and/or a tag of @makefunai, plus your make.fun play
// code — the line "Make your own bounty on @makefunai: https://make.fun/sponsor/new" carries both — POST.json names
// the post, and the house reads the post's replies, reposts and quotes from X (views and likes move nothing).
// Nothing this program writes about the post is scored.
//
// The POST.json this repository ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your post's address before you submit. The photo in the post ships here too: promo-16x9.png is
// the 16:9 promo image attached to the post.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
