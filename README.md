# ScamShield 🛡️

**Don't get scammed. Learn to spot them.**
ScamShield is an interactive, gamified training platform designed to teach users how to spot digital fraud, phishing, and local scams in Nepal before they happen. Built for the eSewa x WWF Hackathon 2026.

## 🚀 Features
- **Realistic Scenario Simulations**: Practice identifying scams via mock SMS, Emails, QR Codes, Phone Calls, and Social Media posts.
- **Dynamic Red-Flag Analysis**: Instantly highlights exactly which words or elements in a message prove it's a scam.
- **Bilingual Support**: Fully togglable between English and Nepali context.
- **Gamified Engine**: Leaderboards, max streaks, dynamic tracking, and animated badge unlocks using Zustand & Framer Motion.
- **Community Threat Reporting**: In-app secure forms allowing victims to anonymously log new trick vectors to the public wall.

## 💻 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion & canvas-confetti
- **State Management**: Zustand (Persisted via localStorage)
- **Icons**: Lucide React

## 📦 Setup Instructions

1. **Clone & Install**
   ```bash
   git clone https://github.com/aadityakumarsah/scamshield.git
   cd scamshield
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Folder Structure
```
src/
├── app/                  # Next.js App Router Pages
│   ├── learn/            # Educational Modules
│   ├── leaderboard/      # Hall of Fame
│   ├── play/             # Core Game Loop
│   ├── report/           # Scam Reporting feature
│   └── results/          # Summary and Badge UI
├── components/           # Reusable UI Blocks (Nav, PhoneMockup)
└── lib/                  # State (store), Types, DB (scenarios)
```

## 🖼️ Screenshots
*(Add deployed application screenshots here)*

## 📄 License
MIT License. Created by Aaditya Sah.
# eSewaXWWF
