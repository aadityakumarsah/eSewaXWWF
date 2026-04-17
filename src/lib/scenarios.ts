export interface Scenario {
  id: string;
  type: 'sms' | 'call' | 'email' | 'qr' | 'fake_app' | 'social_media';
  title: string;
  content: string;
  sender?: string;
  senderNumber?: string;
  isScam: boolean;
  redFlags: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timestamp?: string;
}

export const scenarios: Scenario[] = [
  // 1. Fake eSewa cashback SMS with phishing link
  {
    id: 'sc-001',
    type: 'sms',
    title: 'eSewa Cashback Offer',
    content:
      'Congratulations! You have won Rs. 5,000 eSewa cashback on your last transaction. Claim your reward now before it expires: https://esewa-bonus.xyz/claim?id=98XXXXXXXX. Hurry, offer valid for 2 hours only!',
    sender: 'eSewa-Bonus',
    senderNumber: '+977-9800000001',
    isScam: true,
    redFlags: [
      'Suspicious domain "esewa-bonus.xyz" — eSewa\'s real domain is esewa.com.np',
      'Creates urgency with a 2-hour countdown to pressure quick action',
      'Unsolicited cashback claim you never applied for',
      'Generic greeting with no personalized account details',
      'Link asks you to enter credentials on an external site',
    ],
    explanation:
      'This is a classic phishing SMS. eSewa never sends cashback links through third-party domains like "esewa-bonus.xyz". The urgency trick is designed to stop you from thinking critically. Always verify offers directly inside the official eSewa app.',
    difficulty: 'easy',
    timestamp: '2026-04-15T10:23:00',
  },

  // 2. Call from "eSewa support" asking for OTP
  {
    id: 'sc-002',
    type: 'call',
    title: 'eSewa Support Call — OTP Request',
    content:
      'Hello, this is Rajesh from eSewa Customer Support. We have detected suspicious activity on your account ending in ...4521. For verification purposes, please share the 6-digit OTP you just received on your phone so we can secure your account immediately.',
    sender: 'Rajesh (eSewa Support)',
    senderNumber: '+977-9812345678',
    isScam: true,
    redFlags: [
      'No legitimate company ever asks for your OTP over the phone',
      'Call originated from a personal mobile number, not an official helpline',
      'Uses fear of "suspicious activity" to create panic',
      'Pressures you to act immediately without verifying identity',
    ],
    explanation:
      'eSewa support will never call you and ask for your OTP or PIN. OTPs are strictly private and meant only for your own use during transactions. If you receive such a call, hang up and report the number through the official eSewa app.',
    difficulty: 'easy',
    timestamp: '2026-04-14T14:45:00',
  },

  // 3. QR code redirecting to fake login page
  {
    id: 'sc-003',
    type: 'qr',
    title: 'Free Wi-Fi QR Code at Café',
    content:
      'A printed poster at a local café in Thamel reads: "Scan this QR code for FREE unlimited Wi-Fi! Powered by eSewa." After scanning, your browser opens a page that looks exactly like the eSewa login screen at http://esewa-login.com.np.co/auth and asks for your eSewa ID and password.',
    sender: 'Unknown QR Poster',
    isScam: true,
    redFlags: [
      'The URL "esewa-login.com.np.co" is not eSewa\'s official domain',
      'Free Wi-Fi should never require your eSewa login credentials',
      'QR codes in public places can be tampered with or replaced by scammers',
      'The page mimics eSewa\'s design to steal your credentials',
      'No legitimate Wi-Fi service partners with a payment app for login',
    ],
    explanation:
      'Scammers place fake QR codes in busy public spots to harvest login details. The URL is carefully designed to look legitimate but is a completely different domain. Never enter your eSewa credentials on any page you reach through a QR code scan.',
    difficulty: 'medium',
    timestamp: '2026-04-13T09:15:00',
  },

  // 4. Fake eSewa Sathi referral with huge bonus
  {
    id: 'sc-004',
    type: 'social_media',
    title: 'eSewa Sathi — Mega Referral Bonus',
    content:
      'BREAKING: eSewa Sathi is giving Rs. 10,000 bonus for every friend you refer this Tihar season! 🎆🎉 Just download from this link: https://bit.ly/esewa-sathi-bonus and enter code TIHAR10K. Limited to first 500 users. Share with everyone!',
    sender: 'eSewa Sathi Official (Facebook)',
    isScam: true,
    redFlags: [
      'Unrealistically high referral bonus of Rs. 10,000 per referral',
      'Uses a shortened bit.ly link instead of an official app store link',
      'Creates artificial scarcity — "limited to first 500 users"',
      'Posted from a page mimicking the official brand, not verified',
    ],
    explanation:
      'Legitimate referral programs offer modest bonuses (typically Rs. 25–100), not Rs. 10,000. The shortened link likely leads to a malicious APK or phishing page. Always download apps only from the Google Play Store or Apple App Store.',
    difficulty: 'medium',
    timestamp: '2026-04-12T18:30:00',
  },

  // 5. Facebook post impersonating eSewa CEO giving prizes
  {
    id: 'sc-005',
    type: 'social_media',
    title: 'eSewa CEO Giving Away Prizes',
    content:
      'I am giving away Rs. 50,000 to 100 lucky eSewa users this Dashain! 🎊 To participate, simply like this post, share it publicly, and send Rs. 200 via eSewa to 9801XXXXXX with remarks "DASHAIN GIFT" to confirm your entry. Winners announced in 24 hours! — CEO, eSewa',
    sender: 'eSewa CEO (Impersonator)',
    isScam: true,
    redFlags: [
      'Real CEOs do not run personal giveaways asking users to send money',
      'Requires you to pay Rs. 200 to "enter" — legitimate giveaways are free',
      'Unverified Facebook page impersonating an executive',
      'Extremely short 24-hour deadline creates pressure to act fast',
      'The destination number is a personal mobile, not a business account',
    ],
    explanation:
      'This is an impersonation scam. No company CEO asks you to send money to a personal number to win prizes. The scammer collects Rs. 200 from thousands of victims and disappears. Report such posts to Facebook and eSewa immediately.',
    difficulty: 'easy',
    timestamp: '2026-04-11T20:00:00',
  },

  // 6. Real eSewa transaction confirmation (LEGIT)
  {
    id: 'sc-006',
    type: 'sms',
    title: 'eSewa Transaction Confirmation',
    content:
      'You have successfully transferred Rs. 1,500.00 to Sita Sharma (9841XXXXXX) from your eSewa account. Transaction ID: TXN20260415102345. Your new balance is Rs. 3,245.00. If you did not make this transaction, contact support at 01-5970016.',
    sender: 'eSewa',
    senderNumber: 'eSewa',
    isScam: false,
    redFlags: [],
    explanation:
      'This is a legitimate transaction confirmation from eSewa. It contains specific details like the exact amount, recipient name, transaction ID, remaining balance, and the official support number. No links are included and no action is demanded from you.',
    difficulty: 'easy',
    timestamp: '2026-04-15T10:23:45',
  },

  // 7. Fake job offer requiring Rs. 500 registration via eSewa
  {
    id: 'sc-007',
    type: 'sms',
    title: 'Online Job Offer — Work from Home',
    content:
      'Dear User, earn Rs. 25,000–50,000/month working from home! Data entry job for Bikash International Pvt. Ltd. Only 20 seats left. Pay Rs. 500 registration fee via eSewa to 9867XXXXXX to secure your spot. Contact Bikash Sir: 9867XXXXXX. No experience needed!',
    sender: 'JobAlert Nepal',
    senderNumber: '+977-9867000002',
    isScam: true,
    redFlags: [
      'Legitimate employers never charge a registration fee to apply',
      'Unrealistic salary promise of Rs. 25,000–50,000 for simple data entry',
      'Payment directed to a personal eSewa number, not a company account',
      '"No experience needed" combined with high pay is a classic lure',
      'Creates urgency with "only 20 seats left"',
    ],
    explanation:
      'No genuine employer asks job applicants to pay money upfront. The scammer collects the Rs. 500 fee from many victims and vanishes. Always verify job offers through official company websites or reputable job portals like MeroJob or JobsNepal.',
    difficulty: 'easy',
    timestamp: '2026-04-10T08:15:00',
  },

  // 8. Phishing email from esewa-verify.com
  {
    id: 'sc-008',
    type: 'email',
    title: 'eSewa Account Verification Required',
    content:
      'Subject: URGENT — Your eSewa Account Will Be Suspended\n\nDear Valued Customer,\n\nWe have noticed unusual login attempts on your eSewa account. As per Nepal Rastra Bank regulations, your account will be permanently suspended within 24 hours unless you verify your identity.\n\nClick here to verify: https://esewa-verify.com/secure/login\n\nYou will need to provide:\n- Full name and address\n- eSewa MPIN\n- Citizenship number\n- Bank account linked to eSewa\n\nRegards,\neSewa Security Team\nsupport@esewa-verify.com',
    sender: 'eSewa Security Team',
    isScam: true,
    redFlags: [
      'Sender domain "esewa-verify.com" is not eSewa\'s official domain (esewa.com.np)',
      'Threatens permanent account suspension to create fear',
      'Asks for highly sensitive data: MPIN, citizenship number, bank details',
      'Claims to enforce "Nepal Rastra Bank regulations" to add false authority',
      'Generic greeting "Dear Valued Customer" instead of your actual name',
    ],
    explanation:
      'eSewa will never email you from a non-official domain or ask for your MPIN and citizenship number via email. The mention of NRB regulations is a scare tactic. Always verify account issues directly through the eSewa app or by calling their official helpline.',
    difficulty: 'medium',
    timestamp: '2026-04-09T11:20:00',
  },

  // 9. Fake customs fee SMS for delivery
  {
    id: 'sc-009',
    type: 'sms',
    title: 'Customs Fee for Your Package',
    content:
      'Your international parcel (Tracking: NP29384756CN) is held at Tribhuvan International Airport customs. Pay customs clearance fee of Rs. 2,350 via eSewa to release your package. Payment link: https://nepal-customs-pay.com/clear. Package will be returned to sender in 48 hours if unpaid.',
    sender: 'Nepal Customs',
    senderNumber: '+977-9845000003',
    isScam: true,
    redFlags: [
      'Nepal Customs does not collect fees via eSewa payment links',
      'Suspicious domain "nepal-customs-pay.com" is not a government website',
      'Sent from a personal mobile number, not an official government channel',
      '48-hour return threat creates artificial urgency',
      'You may not even be expecting any international parcel',
    ],
    explanation:
      'Government customs agencies do not send SMS payment links from personal numbers. Customs duties are paid through official channels at the post office or customs office. If you are expecting a parcel, verify its status through Nepal Post\'s official tracking system.',
    difficulty: 'medium',
    timestamp: '2026-04-08T15:40:00',
  },

  // 10. Real eSewa OTP message (LEGIT)
  {
    id: 'sc-010',
    type: 'sms',
    title: 'eSewa One-Time Password',
    content:
      'Your eSewa OTP is 482917. Valid for 5 minutes. Do NOT share this code with anyone, including eSewa staff. If you did not request this, change your password immediately.',
    sender: 'eSewa',
    senderNumber: 'eSewa',
    isScam: false,
    redFlags: [],
    explanation:
      'This is a genuine OTP message from eSewa. It clearly warns you not to share the code with anyone — including eSewa staff themselves. The message does not contain any suspicious links and is sent from the official "eSewa" sender ID, not a personal number.',
    difficulty: 'easy',
    timestamp: '2026-04-15T10:22:30',
  },

  // 11. Fake Dashain wheel-spin prize
  {
    id: 'sc-011',
    type: 'social_media',
    title: 'eSewa Dashain Spin & Win',
    content:
      'Happy Dashain from eSewa! 🎡 Spin the lucky wheel and win prizes up to Rs. 1,00,000! Ram Bahadur from Pokhara just won Rs. 50,000! Your turn now → https://esewa-dashain-spin.win. Spin is FREE but you must pay Rs. 150 processing fee via eSewa to claim your prize. Offer ends tonight!',
    sender: 'eSewa Dashain Offers',
    isScam: true,
    redFlags: [
      'Fake domain "esewa-dashain-spin.win" is not affiliated with eSewa',
      '"Free" spin but requires Rs. 150 payment to claim — contradictory',
      'Uses a fake winner testimonial ("Ram Bahadur from Pokhara") to build false trust',
      'Deadline of "tonight" creates panic and discourages verification',
      'Unrealistically large prize amounts for a simple wheel spin',
    ],
    explanation:
      'Spin-the-wheel scams are extremely common during Dashain and Tihar. The "processing fee" is how scammers profit — thousands of people pay Rs. 150 each, and nobody wins anything. eSewa runs legitimate Dashain offers only through their official app and verified social pages.',
    difficulty: 'medium',
    timestamp: '2026-04-07T19:00:00',
  },

  // 12. Investment scam: 10% daily returns
  {
    id: 'sc-012',
    type: 'social_media',
    title: 'eSewa Investment Plan — 10% Daily Returns',
    content:
      'Invest through eSewa and earn 10% DAILY returns! 💰 Minimum investment: Rs. 5,000. Withdraw anytime. Over 15,000 Nepalis already earning passive income. Join our official Telegram group: t.me/esewaInvestNP. Guaranteed by eSewa partnership. Transfer your investment to eSewa ID: 9823XXXXXX.',
    sender: 'eSewa Invest Nepal (Telegram)',
    isScam: true,
    redFlags: [
      '10% daily returns is mathematically impossible and unsustainable',
      'eSewa is a payment platform, not an investment company',
      'Payment directed to a personal eSewa ID, not a registered business',
      'Claims of "15,000 Nepalis already earning" with no verifiable proof',
      '"Guaranteed returns" is a hallmark of Ponzi schemes',
    ],
    explanation:
      'This is a Ponzi/pyramid scheme. Even the best global investments return 10-15% per year, not per day. eSewa does not offer any investment plans. These scams use early payouts (funded by new victims) to build trust before collapsing and stealing everyone\'s money.',
    difficulty: 'hard',
    timestamp: '2026-04-06T12:00:00',
  },

  // 13. WhatsApp family emergency money request
  {
    id: 'sc-013',
    type: 'social_media',
    title: 'Urgent Family Emergency on WhatsApp',
    content:
      'Bhai, yo mama ho. Mero phone kharab bhayo, yo naya number ho. Malai urgent Rs. 15,000 chaiyo — hospital ko bill tirnu paryo, Sita didi ko accident bhako cha. eSewa bata pathaideu hai, 9812XXXXXX ma. Paxi sabai kura bhanchu. Please jaldi gar! 🙏',
    sender: 'Mama (New Number)',
    senderNumber: '+977-9812000004',
    isScam: true,
    redFlags: [
      'Claims to be a family member but uses a completely new, unknown number',
      'Urgent request for a large sum (Rs. 15,000) with emotional pressure',
      'Refuses to provide details — "paxi sabai kura bhanchu" (will explain later)',
      'Uses a common family relation ("mama") that many people have',
      'Asks for immediate eSewa transfer to an unverified number',
    ],
    explanation:
      'This is a social engineering attack that exploits family bonds and urgency. Before sending any money, always call the person on their known original number to verify. Scammers harvest contact information from social media to make these requests feel convincing.',
    difficulty: 'hard',
    timestamp: '2026-04-05T22:15:00',
  },

  // 14. Fake lottery win via SMS
  {
    id: 'sc-014',
    type: 'sms',
    title: 'Nepal Telecom Lottery Winner',
    content:
      'Congratulations! Your NTC number has won Rs. 5,00,000 in the Nepal Telecom Annual Lucky Draw 2026! Reference: NTC/LD/2026/4829. To claim your prize, send Rs. 3,500 processing fee via eSewa to 9808XXXXXX and email your details to ntc-lottery@gmail.com. Prize expires in 7 days.',
    sender: 'NTC Lucky Draw',
    senderNumber: '+977-9808000005',
    isScam: true,
    redFlags: [
      'You never entered any lottery — you cannot win what you did not join',
      'Winners of real lotteries are never asked to pay a "processing fee"',
      'Official Nepal Telecom would never use a Gmail address for communication',
      'Sent from a personal mobile number, not NTC\'s official channels',
      'Large prize amount designed to cloud your judgment with excitement',
    ],
    explanation:
      'Lottery scams are one of the oldest tricks. Nepal Telecom does not run random SMS lotteries. The "processing fee" is pure profit for the scammer. Remember: if you never entered a lottery, you cannot win one. Delete and report such messages.',
    difficulty: 'easy',
    timestamp: '2026-04-04T16:30:00',
  },

  // 15. Real bill payment reminder (LEGIT)
  {
    id: 'sc-015',
    type: 'sms',
    title: 'NEA Electricity Bill Reminder',
    content:
      'Reminder: Your Nepal Electricity Authority bill for Customer ID 012-34-567 is Rs. 1,245.00 (Due: April 20, 2026). Pay conveniently through the eSewa app to avoid late fees. Thank you for using eSewa. — eSewa',
    sender: 'eSewa',
    senderNumber: 'eSewa',
    isScam: false,
    redFlags: [],
    explanation:
      'This is a legitimate bill payment reminder from eSewa. It includes your specific NEA customer ID, the exact bill amount, and a clear due date. It directs you to the official eSewa app (not an external link) and does not ask for any personal information or OTP.',
    difficulty: 'easy',
    timestamp: '2026-04-15T07:00:00',
  },
];
