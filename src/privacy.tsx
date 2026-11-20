import React from "react";

const EFFECTIVE = "20 November 2026";
const CONTACT = "gopimanikanta50@gmail.com";

const SECTIONS: [string, string[]][] = [
  ["Who we are", [
    "SoloSync (app.solosync.live and api.solosync.live) is operated by Chithraguptha Software Solutions, 3-14, First Floor, Ganga Bhavani Nilayam, Sivalayam Street, Mulastanam, East Godavari, Andhra Pradesh 533233, India (\"we\", \"us\"). This policy explains what personal data we collect, why, and the choices you have. It should be read with our Terms and Conditions.",
  ]],
  ["What we collect", [
    "Account data: your name, email address, profile picture (if you sign in with Google), sign-in method, and the time you accepted our Terms.",
    "WhatsApp connection data: the phone numbers and display names of WhatsApp accounts you connect, and their connection status.",
    "Message data: recipient numbers, message content and media links you send through the Service, and delivery status.",
    "Payment data: amounts, payment status and Razorpay payment references. Card, UPI and bank details are handled by Razorpay and never reach us.",
    "Technical data: IP address, browser and device information, API request logs, and cookies needed to keep you signed in.",
    "Advertising and analytics data: when you visit our website we use Google Tag Manager and Google Ads conversion tracking, which set cookies or similar identifiers to tell us which adverts lead to sign-ups. Google processes this data under its own privacy policy.",
  ]],
  ["Why we use it", [
    "To create and secure your account, connect your WhatsApp numbers and deliver your messages; to charge for the Service and issue receipts; to provide support; to detect abuse, fraud and breaches of our Terms; to measure and improve our advertising and the Service; and to comply with law.",
  ]],
  ["Messages you send", [
    "For message content and recipient numbers, you decide what is sent and to whom, and you act as the data fiduciary under the Digital Personal Data Protection Act, 2023. We process that data only on your instructions, to deliver your messages and show you their status. You are responsible for having your recipients' consent.",
  ]],
  ["Sharing", [
    "We do not sell personal data. We share it only with providers that help run the Service — cloud hosting (Microsoft Azure), our WhatsApp connection infrastructure, Razorpay for payments, and Google for sign-in, tag management and advertising measurement — and where the law requires it.",
  ]],
  ["Retention", [
    "We keep account, connection and message records while your account is open and for a reasonable period after it closes for billing, security and dispute purposes, and payment records for as long as tax and accounting law requires. Then we delete or anonymise them.",
  ]],
  ["Your rights and choices", [
    `You can ask to access, correct or delete your personal data, withdraw consent, or nominate someone to act for you, by emailing ${CONTACT}. You can block or delete cookies in your browser and limit ad personalisation in your Google account settings; essential sign-in cookies are required for the dashboard to work.`,
  ]],
  ["Security", [
    "We use HTTPS, hashed passwords and API keys, access controls and monitoring. No system is perfectly secure; tell us at once if you suspect your account has been compromised.",
  ]],
  ["Children", [
    "The Service is for people aged 18 and over. We do not knowingly collect data from children.",
  ]],
  ["Changes and contact", [
    "We may update this policy and will change the date above when we do. Material changes will be notified in the dashboard.",
    `Grievance officer: Gopi Mani Kanta, ${CONTACT}, at the address above. We acknowledge complaints within 48 hours and aim to resolve them within one month.`,
  ]],
];

export function PrivacyPage() {
  return <main className="terms-page"><a className="terms-back" href="/">← SoloSync</a><div className="terms-doc">
    <h1>Privacy Policy</h1><p className="terms-meta">Effective {EFFECTIVE}</p>
    {SECTIONS.map(([title, paras], i) => <section key={title}><h2>{i + 1}. {title}</h2>{paras.map((p, j) => <p key={j}>{p}</p>)}</section>)}
  </div></main>;
}
