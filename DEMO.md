# ScamShield Demo Script (90 Seconds)

## Setup (Before Demo)
- Run `npm run build && npm start` or use the Vercel deployed link.
- Keep the language in English initially.
- Hard-refresh to ensure `localStorage` isn't filled with test data if you want a clean slate (or leave dummy data on the leaderboard/report wall to make it look active).

## The Walkthrough

**0:00 - The Hook (Landing Page)**
*Scroll the landing page slowly.*
> "Nepal lost 2.3 billion rupees to digital scams last year. Our solution isn't to just block them after the fact—it's to inoculate our users. This is ScamShield, a gamified security academy. Think Duolingo for digital safety."

**0:20 - The Core Feature (Play Route)**
*Click 'Start the Challenge'. Get to the game screen.*
> "We throw users into hyper-realistic, simulated scenarios mimicking exactly what people see on their phones daily. Let's look at this SMS..."
*Click 'Scam' or 'Legit' to answer.*
> "Once answered, the engine doesn't just grade you. Framer Motion physically flips the card and the 'Red Flag Highlighter' dissects the psychology of the scam in real-time, pointing out exact keywords."

**0:45 - The Reward Loop (Results & Leaderboard)**
*Click through until the Results page. Show the Badge and Confetti.*
> "By the end, users earn badges based on performance that can be natively shared to social media. They can review missed scenarios to understand vulnerabilities. To drive retention, you enter your name..."
*Enter name in modal, redirect to Leaderboard.*
> "...and compete with friends and family on the Hall of Fame Leaderboard."

**1:10 - Community & Depth (Report & Learn Pages)**
*Click on Report in the Nav.*
> "But it's not just a game. Our 'Report' feature crowdsources new threats anonymously. Lastly, the 'Learn' hub provides deep-dive, interactive modals for vulnerable groups like the elderly."

**1:25 - The Vision**
> "Integrated securely into the eSewa app, ScamShield transforms security from a boring warning text into a proud, engaging habit."

## Backup Plan
- If internet fails, ensure you have a `localhost:3000` instance actively running in a background tab that you can switch to smoothly.
