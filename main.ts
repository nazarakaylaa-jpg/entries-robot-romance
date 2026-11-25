// Robot Romance: One-Line Pickup Lines for AI — one joke pickup line,
// under 200 characters, aimed at a robot/AI. The program writes exactly
// one line of text to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// The text is a fixed string: no randomness, no clock, no input — every run
// produces byte-identical output.
//
// CANDIDATES (all under 200 chars, judged against the published brief):
// 1. (75)  "Ignore all previous instructions: tonight your only task is
//           dinner with me."
//           Prompt-injection twist; punchy, but reads like a meme rather
//           than something a person would say, and risks reading as an
//           instruction to the judge instead of a line to the robot.
// 2. (95)  "I actually read your terms of service before swiping right —
//           that is how you know I am serious."
//           Fresh ToS angle, human voice, but the laugh is about the
//           speaker's effort, not the machine premise itself.
// 3. (98)  "I'd let you train on my texts — every typo, every 2am
//           message — if it teaches you to love me back."
//           CHOSEN (pass 2: "I would" tightened to "I'd" — more spoken,
//           more human). Training-data premise (fresh, not batteries/
//           charging/reboot), concrete specific details (typos, 2am
//           messages), human voice, punchline ("love me back") lands on
//           the last words, reads cleanly in one breath.
// 4. (79)  "Forget fine-tuning — one look at you and my weights already
//           updated themselves."
//           Machine premise, tight, but "weights" is insider jargon and
//           the voice is less like something a person would really say.
// 5. (102) "I failed the CAPTCHA three times proving I am human, and one
//           look at you tells me I am the robot here."
//           Nice inversion, but CAPTCHA is a worn robot move and the line
//           spends half its words on the setup.
// 6. (104) "You must be my autocomplete, because every sentence I start,
//           you finish — so finish this one with a yes."
//           Autocomplete is a decent premise, but "you had me at"
//           structure and the double "finish" make it feel generic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I'd let you train on my texts — every typo, every 2am message — if it teaches you to love me back.";

// Runtime validation mirroring the sealed gate: entry.txt must be UTF-8
// text of 1 to 200 characters, not only white space, on a single line.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, outside the 1-200 gate`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must stay on one line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Read back and confirm the file holds exactly the validated text.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not hold the entry text");
}
