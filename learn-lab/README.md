# Learn Lab

A student types a topic (or uploads lecture slides). Claude builds an interactive, visual lesson, and the page shows it live.

Read `../HACKATHON_GUIDE.md` for every step.

Quick start (needs only a Claude key):

    npm install
    cp .env.local.example .env.local      # then put your Claude key in .env.local
    npm run dev                           # open http://localhost:3000

Without `DAYTONA_API_KEY` the app runs in local test mode: the lesson runs on your laptop at http://localhost:5173.
With `DAYTONA_API_KEY` each student gets a Daytona cloud sandbox. Before that, run once:

    npx tsx --env-file=.env.local scripts/hello-sandbox.mts
    npx tsx --env-file=.env.local scripts/make-template.mts
