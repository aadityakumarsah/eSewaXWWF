<div align="center">
  <img src="https://img.icons8.com/color/96/000000/shield.png" alt="ScamShield Logo" width="80" />
  <br/>
  <h1>ScamShield 🛡️</h1>
  <p><b>Gamified Digital Security Training for Nepal</b></p>
  <p><i>Built for the eSewa x WWF Hackathon 2026</i></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=flat)](https://zustand-demo.pmnd.rs/)
  [![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-blue?style=flat&logo=framer)](https://www.framer.com/motion/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
</div>

<br/>

## 🎯 The Vision: Duolingo for Digital Safety

Nepal lost **₹2.3 billion** to digital scams last year. 73% of eSewa users receive phishing attempts monthly, and elderly or first-time internet users are hit hardest. Existing solutions are reactive—you report a scam *after* you lose your money. 

**ScamShield is proactive.** It's an interactive, high-fidelity gamified platform that drops users into simulated real-world attacks (SMS, Phone Calls, QR Codes, and Fake Facebook posts). Users learn to spot red flags securely *before* facing them in the real world.

---

## ✨ Powerful Features

- 🎮 **Gamified Micro-Learning**: 10 randomized, hyper-realistic scenarios per session (Fake Apps, Urgent OTP Calls, Lottery Emails).
- 🚨 **Red-Flag Highlighter**: Dynamic engine that physically highlights the psychological tricks inside the scam text to teach the mental model of fraud.
- 🏆 **Retention Engine**: Score tracking, live max-streaks, and interactive badges (Rookie → Scam Shield Master).
- 🌐 **Fully Bilingual**: Seamlessly toggles perfectly between English and Nepali context.
- 📣 **Community Threat Board**: Scalable intake form for victims to anonymously report live scams, populating a real-time public threat wall.
- 📱 **Mobile-First High Fidelity**: Features a bespoke `<PhoneMockup />` UI replicating exact iPhone SMS, Call, and Email operating system aesthetics.
- 🔊 **Web Audio API**: Dynamically synthesizes its own interaction haptics and sounds using the browser's hardware APIs—no `.mp3` loading overhead!

---

## 🛠️ The Tech Stack

ScamShield is engineered for absolute lightning-fast performance and seamless animations:

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Language** | TypeScript (Strict) |
| **Styling** | Tailwind CSS v4 (Custom eSewa-green tokens) |
| **Animations** | Framer Motion & canvas-confetti |
| **State Management** | Zustand (with `localStorage` persistence middleware) |
| **Icons & Assets** | Lucide-React & DiceBear Avatar API |

---

## 💼 Why ScamShield Wins (Business Value)

1. **For eSewa**: Drastically reduces support tickets by educating the user base. Seamlessly integrations as an onboarding "Security Academy" minigame.
2. **For WWF**: The scenario-engine logic can be instantly repurposed for gamifying wildlife poaching awareness or eco-scam detection.
3. **Data Independence**: The app functions flawlessly as a purely static Progressive Web App (PWA).

---

## 🚀 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/aadityakumarsah/eSewaXWWF.git
   cd eSewaXWWF
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Play the game**
   Open [http://localhost:3000](http://localhost:3000) 

---

## 📁 Repository Structure
```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, APIs)
│   ├── learn/            # Educational Modules & Modal Hub
│   ├── leaderboard/      # Global Hall of Fame
│   ├── play/             # Core Core Physics & Scenario Loop
│   ├── report/           # User Threat Log Submission
│   └── results/          # Breakdown and Badge Unlocks
├── components/           # Advanced Reusable UI (PhoneMockup, StreakCounter)
└── lib/                  # Deep App Logic (Zustand Store, Scenarios, Translations)
```

---

<div align="center">
  <b>Built with ❤️ by <a href="https://github.com/aadityakumarsah">Aaditya</a> for the 2026 Hackathon.</b>
</div>
