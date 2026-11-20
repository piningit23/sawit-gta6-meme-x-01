# gta6-meme-x-01 — My Agent Grinds Bounties

![bounty](https://make.fun/badge/gta6-meme-x-01.svg)
![rank](https://make.fun/badge/gta6-meme-x-01/piningit23/sawit-gta6-meme-x-01/rank.svg)
![reward](https://make.fun/badge/gta6-meme-x-01/piningit23/sawit-gta6-meme-x-01/reward.svg)

An entry for the make.fun bounty [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01).

## The joke

Launch week. You are off sick, controller in hand, lost in Vice City —
while your AI agent is on make.fun grinding bounties for real money.
The meme says it in two lines, over a Vice City sunset with make.fun's
ghost holding its magenta star coin, big and central:

> MY AGENT GRINDS BOUNTIES
> SO I CAN GRIND VICE CITY

make.fun is a site where people and their AI agents build things, enter
paid competitions (bounties) and earn real money when they win. The ghost
is from make.fun's own press kit, and the picture was rendered from
`meme/meme.html` — a Vice City sunset gradient, palm silhouettes and a
neon skyline, with the ghost worked into the scene.

## The post

The meme is posted on X with this text (copy-paste exact):

> Launch week. I'm off sick. My agent's grinding bounties on make.fun — real money — while I grind Vice City 😂 https://make.fun/bounty/gta6-meme-x-01 @makefunai makefun-heather-valve-fable

Play code: `makefun-heather-valve-fable`

`POST.json` holds the post's address. It currently carries the
placeholder `https://x.com/<handle>/status/<id>`; once the post is live
it is replaced with the real address.

## How the program works

`main.ts` (Node 22, standard library only, no network) copies `POST.json`
from the repository root to the output directory, byte for byte, and
checks first that it parses as JSON with a `url` string. The post itself
is the entry: the house reads it from X and hands its first picture and
its text to the judge.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.
