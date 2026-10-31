# Demo guide: Bruno + Learn Lab

**One line to say first:** "Type anything you want to learn. Claude writes the course and the quiz, draws an interactive visual inside a Daytona sandbox, and Bruno talks to you with an ElevenLabs voice."

Everything is made live by an LLM: the topics, the questions, the explanations and the visuals.

---

## 1. Before the demo (10 minutes)

1. Open **Terminal** and start the app:

   ```bash
   cd ~/Desktop/learn-lab-hackathon/learn-lab && npm run dev
   ```

2. Open **http://localhost:3737** in Chrome. Desktop shows the phone frame.
3. **Do one full dry run** with any topic. This warms up your Daytona sandbox, so the visual is fast on stage.
4. Reset Bruno for the real demo: tap the **person icon** (bottom right) → **Settings** → **Reset everything**. Your sandbox stays, so it is reused.
5. Check credits: Claude Console (Billing), Daytona (Wallet), ElevenLabs (Usage).
6. Turn the sound on. Bruno speaks.

---

## 2. The live demo (about 3 minutes)

| Step | What you do | What you say |
|---|---|---|
| 1 | Tap **Get started**, type your name. | "Bruno is a learning app with a bear tutor." |
| 2 | Type a topic, for example **How a rainbow forms**, or ask the audience for one. | "Any topic works. Nothing is prepared." |
| 3 | Pick a level, a daily goal, a streak, then **Don't Allow**. | "This is the onboarding from our design." |
| 4 | "Give me a sec…" runs (about 25 seconds). | "One Claude call is writing 4 concepts, 16 questions, explanations and flashcards right now." |
| 5 | The **Q&A** starts. Answer one question, then tap **Explain my answer**. | "Bruno explains the answer with a real voice from ElevenLabs." |
| 6 | Answer the rest, or tap "I haven't learned this yet". | "While you answer, a second Claude call draws an interactive visual and puts it in a Daytona sandbox." |
| 7 | Tap **Show my path**. The **Explore** screen shows the visual. Tap its buttons or slider. | "This page was written by Claude seconds ago, and it runs from our Daytona sandbox." |
| 8 | Type a change, for example **Show the 7 colors coming out**, and tap **Send** (about 20 seconds). | "You can talk to the visual. Bruno redraws it." |
| 9 | Tap **Continue**. Show the path and the coverage bar. Open a lesson. | "Bruno skips what you know. The bar ends at 100%, so you know when you are done." |

**Closing line:** "Every topic, question and visual is generated live. Daytona runs the AI-made visuals safely, one small sandbox per learner, and ElevenLabs gives Bruno his voice."

---

## 3. How it works (for judges' questions)

- **Front end:** the Bruno mobile design (plain HTML/CSS/JS), served by a Next.js app.
- **Course + Q&A:** `POST /api/course`, one Claude call (Claude Opus 5.5) with a fixed JSON format. The server checks every question and drops broken ones.
- **Visual:** `POST /api/visual`, one Claude call that returns one small HTML page. The server uploads it to the learner's Daytona sandbox, which serves it. Bruno shows it in a locked frame.
- **Voice:** `POST /api/tts` calls ElevenLabs (voice "Will", Flash model). The key stays on the server.
- **Sandboxes:** one per browser, reused after a reload, 1 vCPU and 2 GB each. They stop after 30 minutes and are deleted 60 minutes later.

**Measured times:** course about 25 s, visual 15–30 s, voice about 1–2 s.

---

## 4. If something goes wrong

| Problem | Do this |
|---|---|
| "Hmm, that didn't work" while building | Tap **Try again**, or pick another topic. |
| The visual fails | Tap **Try again** on the Explore screen. |
| Daytona is down | Stop the app (Control + C) and start it in local test mode: `DAYTONA_API_KEY= npm run dev`. Visuals then run on your laptop. |
| No voice | Bruno uses the browser voice by itself. Check the sound volume. |
| No internet | Nothing works, because Claude, Daytona and ElevenLabs are online services. Use a phone hotspot. |
| Anything else | Have a screen recording of a full run ready as a backup. |

---

## 5. What is still a demo

These parts come from the original design and are not connected to the backend yet: streak, gems, shop, league, quests, and the "Talk with Bruno" call (it has fixed answers about photosynthesis).
