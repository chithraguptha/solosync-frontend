import React from "react";

// Must match TERMS_VERSION on the API. Change both together whenever the
// text below changes, so everyone is asked to accept the new version.
export const TERMS_VERSION = "2026-11-20";
export const TERMS_EFFECTIVE = "20 November 2026";

const OPERATOR = "Chithraguptha Software Solutions";
const ADDRESS = "3-14, First Floor, Ganga Bhavani Nilayam, Sivalayam Street, Mulastanam, East Godavari, Andhra Pradesh 533233, India";
const CONTACT_EMAIL = "gopimanikanta50@gmail.com";
const GRIEVANCE_OFFICER = "Gopi Mani Kanta";

type Section = { title: string; clauses: string[] };

const SECTIONS: Section[] = [
  { title: "Acceptance of these Terms", clauses: [
    `These Terms and Conditions ("Terms") govern your access to and use of SoloSync, including the dashboard at app.solosync.live, the API at api.solosync.live, and any related software, documentation and services (together, the "Service"). The Service is operated by ${OPERATOR}, a micro enterprise registered in India with its office at ${ADDRESS} ("SoloSync", "we", "us", "our").`,
    "By creating an account, signing in, ticking the acceptance box, or using the Service in any way, you confirm that you have read, understood and agree to be bound by these Terms and by any policies they refer to. If you do not agree, do not create an account and do not use the Service.",
    "If you use the Service on behalf of a company or other organisation, you confirm that you are authorised to accept these Terms on its behalf, and \"you\" includes that organisation.",
    "These Terms are an electronic record under the Information Technology Act, 2000 and the rules made under it. They do not require a physical or digital signature.",
  ]},
  { title: "Description of the Service", clauses: [
    "SoloSync provides software that lets you connect one or more WhatsApp accounts you control and send messages through them using a dashboard and an application programming interface (API). Features, limits and prices are described in the dashboard and documentation and may change from time to time.",
    "The Service is offered as a minimum viable product (MVP). It is at an early stage of development, is provided for evaluation and early use, and may contain errors, defects, interruptions and incomplete features.",
    "SoloSync is not affiliated with, endorsed by or sponsored by WhatsApp LLC, Meta Platforms, Inc. or any of their affiliates. \"WhatsApp\" is a trademark of its respective owner and is used only to describe compatibility.",
  ]},
  { title: "Eligibility", clauses: [
    "You must be at least 18 years old and competent to contract under the Indian Contract Act, 1872 to use the Service.",
    "You may not use the Service if you are barred from doing so under the laws of India or any other applicable jurisdiction, or if we have previously suspended or terminated your account.",
  ]},
  { title: "Your account", clauses: [
    "You must provide accurate and complete information when you create an account and keep it up to date.",
    "You are responsible for keeping your password, session and API keys confidential, and for all activity that takes place under your account or with your API keys, whether or not you authorised it. Tell us promptly if you believe your account or a key has been compromised.",
    "API keys are credentials. Do not embed them in public code, mobile applications, browser code or source repositories. You can revoke and rotate keys from the dashboard.",
    "We may refuse to open an account, or limit the number of WhatsApp numbers, messages or API requests on an account, at our discretion.",
  ]},
  { title: "WhatsApp accounts and third-party platforms", clauses: [
    "You may only connect WhatsApp accounts and phone numbers that you own or are authorised to use. You are solely responsible for complying with the WhatsApp Terms of Service, the WhatsApp Business Policy, the WhatsApp Commerce Policy and any other rules that WhatsApp or Meta publish.",
    "WhatsApp may restrict, suspend or permanently ban any number or account at any time, including for reasons connected with automated or bulk messaging. We have no control over such actions, cannot reverse them, and are not liable for any loss arising from them, including the loss of a number, its contacts or its chat history.",
    "The Service depends on third-party software and infrastructure, including WhatsApp, hosting providers, payment processors and messaging gateways. Changes, outages or restrictions in any of them may affect or stop the Service without notice.",
  ]},
  { title: "Acceptable use", clauses: [
    "You must only message people who have given you their prior consent to be contacted on WhatsApp for the purpose you are contacting them, and you must honour any request to stop. You must comply with all laws that apply to your messages, including the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, the Telecom Commercial Communications Customer Preference Regulations, 2018 issued by TRAI, and consumer protection laws.",
    "You must not use the Service to send unsolicited bulk or commercial messages (spam); to send content that is unlawful, defamatory, obscene, harassing, threatening, hateful, misleading or fraudulent; to impersonate any person or organisation; to collect passwords, one-time passwords, card or bank details under false pretences; to distribute malware; or to infringe anyone's intellectual property or privacy.",
    "You must not attempt to reverse engineer, overload, disrupt or gain unauthorised access to the Service or its infrastructure, or use it to build a competing service, or resell it without our written permission.",
    "We may monitor usage volumes and patterns to operate, secure and bill for the Service, and may suspend sending, revoke keys or remove content without notice where we reasonably believe these Terms or the law are being breached.",
  ]},
  { title: "Fees, wallet and payments", clauses: [
    "Use of the Service may require a one-time activation fee and prepaid wallet credit from which per-message charges are deducted. Current prices are shown in the dashboard. Accounts with more than one connected WhatsApp number may be charged a different per-message price.",
    "Messages are charged when they are accepted for delivery by the WhatsApp session. A message that fails before it is sent is not charged. Delivery to the recipient is not guaranteed and charges for sent messages are not refunded because a message was not delivered, read or acted upon.",
    "Payments are processed by Razorpay or another payment processor we choose, under their terms. We do not store your card or bank details.",
    "The activation fee is non-refundable once the account is activated. Wallet credit is not transferable, cannot be withdrawn as cash and earns no interest. Except as stated in the section on availability and discontinuation, or as required by law, payments are non-refundable.",
    "We may change prices at any time. Changes apply from the time they are shown in the dashboard and do not affect messages already charged.",
    "Coupon codes are issued at our discretion, may carry conditions, limits and expiry dates, have no cash value, and may be withdrawn at any time. Pricing applied to your account by a coupon may be changed with notice.",
    "Receipts issued through the Service are payment receipts and are not tax invoices. You are responsible for any taxes that apply to your use of the Service other than taxes on our income.",
  ]},
  { title: "Availability, changes and discontinuation", clauses: [
    "We aim to keep the Service available but do not promise any level of uptime, delivery speed or support response time. No service level agreement applies unless we sign a separate written agreement with you.",
    "We may add, change, limit or remove any feature, limit or part of the Service at any time, with or without notice.",
    "Because the Service is an MVP, we may suspend or permanently discontinue the Service, or any part of it, at any time and for any reason, including without prior notice. Where reasonably possible we will try to give notice through the dashboard or by email.",
    "If we permanently discontinue the Service for reasons other than your breach of these Terms, we will refund any unused prepaid wallet balance on your account to the original payment method or another method we reasonably choose, on request made within 90 days of discontinuation. Activation fees and amounts already charged for messages are not refunded.",
    "We are not liable to you or to any third party for any suspension, change or discontinuation of the Service, except for the refund described above.",
  ]},
  { title: "Suspension and termination", clauses: [
    "You may stop using the Service and ask us to close your account at any time. Closing your account does not entitle you to a refund except as stated in these Terms.",
    "We may suspend or terminate your account, revoke API keys or disconnect WhatsApp sessions immediately and without notice if we reasonably believe you have breached these Terms or the law, if your use creates risk or harm to us, other users, recipients or third parties, if required by law or a government authority, or if payment is not made.",
    "On termination, your right to use the Service ends. Sections that by their nature should survive termination, including those on fees owed, intellectual property, disclaimers, limitation of liability, indemnity and governing law, survive.",
  ]},
  { title: "Data and privacy", clauses: [
    "To provide the Service we process account information (such as your name, email address and sign-in method), connection information (such as connected phone numbers and session status), message data (such as recipient numbers, message content and delivery status), payment records, API usage and technical logs.",
    "For message content and recipient data you send through the Service, you are the data fiduciary and we act as your data processor under the Digital Personal Data Protection Act, 2023. You are responsible for having a lawful basis, including consent where required, for every recipient you message, and for giving recipients any notice the law requires.",
    "We use this data to operate, secure, bill for, support and improve the Service, and to comply with law. We do not sell personal data. We share it only with service providers who help us run the Service (such as hosting, messaging infrastructure and payment processors), where required by law, or with your permission.",
    "We retain data for as long as your account is active and for a reasonable period afterwards for billing, legal, security and dispute purposes, after which it is deleted or anonymised. Message content may be held by WhatsApp and by the connected phone independently of us.",
    "We take reasonable security measures to protect data, but no system is completely secure and we cannot guarantee the security of data transmitted to or stored by the Service.",
    "You may ask us to access, correct or erase your personal data, or withdraw consent, by writing to the contact address below. Withdrawing consent may mean we can no longer provide the Service to you.",
  ]},
  { title: "Intellectual property", clauses: [
    "The Service, including its software, design, documentation and trademarks, is owned by us or our licensors and is protected by law. We grant you a limited, revocable, non-exclusive, non-transferable licence to use the Service in accordance with these Terms. No other rights are granted.",
    "You keep ownership of the content you send through the Service. You grant us a licence to host, transmit and process that content only as needed to provide the Service.",
    "If you send us feedback or suggestions, we may use them without any obligation to you.",
  ]},
  { title: "Disclaimer of warranties", clauses: [
    "TO THE FULLEST EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\", WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, AVAILABILITY OR THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE OR SECURE, OR THAT MESSAGES WILL BE DELIVERED.",
    "You are responsible for deciding whether the Service is suitable for your purposes. Do not rely on the Service as the only channel for messages that are time-critical, safety-critical, legally required or medically important.",
  ]},
  { title: "Limitation of liability", clauses: [
    "TO THE FULLEST EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, BUSINESS, GOODWILL, DATA, WHATSAPP NUMBERS OR ACCOUNTS, ARISING OUT OF OR IN CONNECTION WITH THE SERVICE OR THESE TERMS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
    "TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR IN CONNECTION WITH THE SERVICE OR THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID US FOR THE SERVICE IN THE THREE (3) MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM.",
    "Nothing in these Terms limits liability that cannot be limited under applicable law.",
  ]},
  { title: "Indemnity", clauses: [
    "You agree to indemnify and hold harmless SoloSync, its proprietor, employees and service providers from any claims, losses, liabilities, penalties, costs and expenses (including reasonable legal fees) arising out of your use of the Service, the content you send, your breach of these Terms, your breach of WhatsApp's terms, or your violation of any law or the rights of any third party, including any recipient of your messages.",
  ]},
  { title: "Changes to these Terms", clauses: [
    "We may update these Terms from time to time. The updated Terms will show a new effective date. Where a change is material, we will ask you to accept the updated Terms in the dashboard. If you continue to use the Service after the effective date, or accept the updated Terms, you are bound by them. If you do not agree to the updated Terms, you must stop using the Service.",
  ]},
  { title: "Governing law and disputes", clauses: [
    "These Terms are governed by the laws of India. Subject to the next paragraph, the courts at East Godavari District, Andhra Pradesh shall have exclusive jurisdiction over any dispute arising out of or in connection with the Service or these Terms.",
    "Before starting any legal proceedings, you agree to first contact us and try to resolve the dispute informally for at least 30 days.",
    "Nothing in this section limits any right you have as a consumer under the Consumer Protection Act, 2019 that cannot be excluded by agreement.",
  ]},
  { title: "General", clauses: [
    "These Terms, together with any policies they refer to and any written agreement we sign with you, are the entire agreement between you and us about the Service.",
    "If any provision of these Terms is found invalid or unenforceable, the rest remain in effect. Our failure to enforce any provision is not a waiver of it.",
    "You may not assign or transfer these Terms without our written consent. We may assign them in connection with a merger, acquisition, sale of assets or by operation of law.",
    "We are not liable for any failure or delay caused by events beyond our reasonable control, including failures of third-party platforms, networks, power, or acts of government.",
    "We may send you notices by email to the address on your account or through the dashboard.",
  ]},
  { title: "Contact and grievance officer", clauses: [
    `${OPERATOR}, ${ADDRESS}. Email: ${CONTACT_EMAIL}.`,
    `In accordance with the Information Technology Act, 2000, the rules made under it and the Consumer Protection (E-Commerce) Rules, 2020, the grievance officer is ${GRIEVANCE_OFFICER}, who can be reached at ${CONTACT_EMAIL} or at the address above. We will acknowledge complaints within 48 hours and aim to resolve them within one month.`,
  ]},
];

export function TermsDocument() {
  return <div className="terms-doc">
    <h1>Terms and Conditions</h1>
    <p className="terms-meta">Effective {TERMS_EFFECTIVE} · Version {TERMS_VERSION}</p>
    {SECTIONS.map((section, i) => <section key={section.title}>
      <h2>{i + 1}. {section.title}</h2>
      {section.clauses.map((clause, j) => <p key={j}><span className="clause-no">{i + 1}.{j + 1}</span> {clause}</p>)}
    </section>)}
  </div>;
}

/// The public page at /terms, readable without an account.
export function TermsPage() {
  return <main className="terms-page"><a className="terms-back" href="/">← SoloSync</a><TermsDocument /></main>;
}

/// The full terms in a scrollable dialog, opened from the sign-up form.
export function TermsDialog({ onClose }: { onClose: () => void }) {
  return <div className="terms-scrim" onClick={onClose}><div className="terms-dialog" role="dialog" aria-modal="true" aria-label="Terms and Conditions" onClick={e => e.stopPropagation()}>
    <div className="terms-scroll"><TermsDocument /></div>
    <div className="terms-actions"><a href="/terms" target="_blank" rel="noreferrer">Open in a new tab</a><button className="primary" onClick={onClose}>Close</button></div>
  </div></div>;
}
