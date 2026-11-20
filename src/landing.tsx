import React from "react";

// Public prices, as charged by the API today (ACTIVATION_FEE_PAISE,
// MESSAGE_FEE_PAISE, MULTI_MESSAGE_FEE_PAISE in infra/envs/solosync).
// Keep in step: an advert landing page must not understate the price.
const PRICES = { activation: "₹299", message: "₹0.50", multiMessage: "₹1.00" };

const STEPS = [
  ["Create your account", "Sign up with Google or email. Exploring the dashboard, docs and API playground costs nothing."],
  ["Connect your WhatsApp number", `Pay the one-time ${PRICES.activation} activation, then scan a QR code from WhatsApp → Linked devices. Your number, your sender name.`],
  ["Send from your app", "Create an API key and call POST /v1/messages. Track delivery and read receipts per message."],
];

const FEATURES = [
  ["OTPs and alerts", "Sign-in codes, order updates, reminders and confirmations sent from your own WhatsApp number."],
  ["Simple REST API", "One endpoint to send text, images and video, plus status polling, message history and an OpenAPI spec."],
  ["Multiple numbers", "Connect several WhatsApp numbers to one account and choose the sender per message with a single field."],
  ["Pay per message", "Prepaid wallet with Razorpay. Messages are charged only once WhatsApp accepts them — failed sends cost nothing."],
  ["Delivery tracking", "Every message reports queued, published, delivered and read, in the dashboard and through the API."],
  ["Receipts and coupons", "A numbered receipt for every payment, and coupon codes for partner and launch pricing."],
];

const FAQ = [
  ["Is SoloSync an official WhatsApp product?", "No. SoloSync is independent software that connects to a WhatsApp account you own through WhatsApp's linked-devices feature. It is not affiliated with or endorsed by WhatsApp or Meta."],
  ["Can I send bulk promotional messages?", "No. SoloSync is for messages your recipients expect — codes, alerts, updates and replies — sent to people who have agreed to hear from you. Unsolicited bulk messaging breaks our terms and WhatsApp's, and gets numbers banned."],
  ["What does it cost?", `Creating an account is free. Activation is a one-time ${PRICES.activation}. After that you top up a wallet and pay ${PRICES.message} per message sent (${PRICES.multiMessage} per message on accounts with more than one number). Prices include no hidden fees.`],
  ["What happens if a message fails?", "A message that fails before WhatsApp accepts it is not charged, and the reserved amount goes back to your wallet."],
  ["Is my data safe?", "Messages travel over HTTPS, API keys are stored hashed, and we never sell data. See the Privacy Policy for what we keep and for how long."],
];

export function Landing({ auth }: { auth: React.ReactNode }) {
  return <div className="landing">
    <header className="lp-nav">
      <a className="lp-brand" href="/"><span className="brand-mark">SS</span><b>SoloSync</b></a>
      <nav><a href="#how">How it works</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#get-started" className="lp-nav-cta">Sign in</a></nav>
    </header>

    <section className="lp-hero">
      <div className="lp-hero-copy">
        <p className="eyebrow">WHATSAPP MESSAGING API</p>
        <h1>Send <em>WhatsApp</em> messages from your app.</h1>
        <p className="lp-lead">One API. Your own number. Live in minutes.</p>
        <div className="lp-chips"><span>OTP &amp; alerts</span><span>Multiple numbers</span><span>Pay per message</span></div>
        <div className="lp-hero-actions"><a className="primary link-button" href="#get-started">Create a free account</a><a className="secondary link-button" href="#pricing">See pricing</a></div>
        <p className="lp-note">Free to sign up · {PRICES.activation} one-time activation · from {PRICES.message} per message</p>
      </div>
      <img className="lp-hero-art" src="/hero.jpg" width="880" height="770" alt="A phone receiving an OTP, an order update and an appointment confirmation sent from a SoloSync API request" />
    </section>

    <section className="lp-section" id="get-started">
      <div className="lp-split">
        <div><p className="eyebrow">GET STARTED</p><h2>Create your account</h2><p className="muted">Sign up in under a minute. You can read the docs, create API keys and try the playground before paying anything.</p>
          <ul className="lp-ticks"><li>No contract, no minimum spend</li><li>Charged only for messages WhatsApp accepts</li><li>Receipts for every payment</li></ul></div>
        {auth}
      </div>
    </section>

    <section className="lp-section" id="how">
      <p className="eyebrow">HOW IT WORKS</p><h2>Three steps to your first message</h2>
      <div className="lp-steps">{STEPS.map(([title, body], i) => <div key={title} className="lp-card"><span className="lp-step-no">{i + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
      <pre className="code lp-code"><code>{`curl -X POST https://api.solosync.live/v1/messages \\
  -H "Authorization: Bearer ss_live_…" \\
  -H "Content-Type: application/json" \\
  -d '{ "chatId": "919876543210", "text": "Your OTP is 482913" }'`}</code></pre>
    </section>

    <section className="lp-section">
      <p className="eyebrow">FEATURES</p><h2>Everything you need to message customers</h2>
      <div className="lp-grid">{FEATURES.map(([title, body]) => <div key={title} className="lp-card"><h3>{title}</h3><p>{body}</p></div>)}</div>
    </section>

    <section className="lp-section" id="pricing">
      <p className="eyebrow">PRICING</p><h2>Simple, prepaid pricing</h2>
      <div className="lp-prices">
        <div className="lp-card"><h3>Sign up</h3><strong>Free</strong><p>Dashboard, docs, API keys and playground.</p></div>
        <div className="lp-card"><h3>Activation</h3><strong>{PRICES.activation}</strong><p>One time, before connecting your first WhatsApp number.</p></div>
        <div className="lp-card featured"><h3>Per message</h3><strong>{PRICES.message}</strong><p>From a prepaid wallet, charged only when WhatsApp accepts the message.</p></div>
        <div className="lp-card"><h3>Multiple numbers</h3><strong>{PRICES.multiMessage}</strong><p>Per message, for accounts with more than one connected number. Enabled on request.</p></div>
      </div>
      <p className="lp-note">Prices in Indian rupees. Wallet top-ups from ₹100. Activation fees are non-refundable; see the <a href="/terms">Terms</a> for refunds of unused wallet credit.</p>
    </section>

    <section className="lp-section" id="faq">
      <p className="eyebrow">FAQ</p><h2>Common questions</h2>
      <div className="lp-faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    </section>

    <footer className="lp-footer">
      <div><a className="lp-brand" href="/"><span className="brand-mark">SS</span><b>SoloSync</b></a><p className="muted">SoloSync is operated by Chithraguptha Software Solutions, 3-14, First Floor, Ganga Bhavani Nilayam, Sivalayam Street, Mulastanam, East Godavari, Andhra Pradesh 533233, India.</p><p className="muted">WhatsApp is a trademark of its owner. SoloSync is not affiliated with, endorsed or sponsored by WhatsApp or Meta.</p></div>
      <nav><a href="/terms">Terms and Conditions</a><a href="/privacy">Privacy Policy</a><a href="https://api.solosync.live/openapi.json">API reference</a><a href="mailto:gopimanikanta50@gmail.com">Contact</a></nav>
    </footer>
  </div>;
}
