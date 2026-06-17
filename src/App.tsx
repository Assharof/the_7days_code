import { useEffect, useRef, useState } from "react";
import {
  IconCheck, IconX, IconArrowRight, IconWhatsApp, IconShield,
  IconStar, IconPhone, IconBriefcase, IconBook, IconHome,
  IconBolt,
} from "./icons";

// =========================================================
// CONFIG — single place to update CTA destination
// =========================================================
const WHATSAPP_URL = "https://chat.whatsapp.com/DBf7Lujo5JFAAoXamc2GjG?s=cl&p=i&ilr=1";
const SPOTS_LEFT = 23;

// =========================================================
// DATA
// =========================================================
const PAIN_POINTS = [
  {
    title: "Your salary finishes before the month ends.",
    sub: "You're tired of borrowing from friends just to make it to payday.",
  },
  {
    title: "You've watched 50 YouTube videos. Still zero sales.",
    sub: "Everyone shows you what to do, but nobody walks you through doing it.",
  },
  {
    title: "You don't have a laptop or capital to start.",
    sub: "You just have your phone, your data, and the determination to make it work.",
  },
  {
    title: "You're terrified of being scammed again.",
    sub: "You've paid for courses before. They taught theory. You left poorer.",
  },
  {
    title: "You don't want to disturb friends or do MLM.",
    sub: "You want real customers — strangers who pay because you actually helped them.",
  },
];

const STATS = [
  { number: "200+", label: "Nigerians Already Inside" },
  { number: "Day 3–5", label: "Average Time to First Sale" },
  { number: "₦80k", label: "Highest Earned in 7 Days" },
  { number: "₦0", label: "Capital Required" },
];

const DAYS = [
  {
    day: "Day 1",
    title: "Pick a Product People Will Actually Pay For",
    desc: "We skip the guesswork. You'll choose from 7 proven product categories that already sell on WhatsApp every single day in Nigeria. No inventory. No upfront cost.",
    variant: "gold" as const,
  },
  {
    day: "Day 2",
    title: "Set Up a WhatsApp Profile That Converts Strangers",
    desc: "Your profile is your storefront. We rebuild yours from scratch — display picture, About line, Status strategy — so people trust you within 10 seconds of opening your chat.",
    variant: "gold" as const,
  },
  {
    day: "Day 3",
    title: "Get Your First 50 Real Buyers Into Your DMs",
    desc: "The exact 3-step method to attract buyers (not friends, not family) using free tools. Most students get their first paying customer on this day.",
    variant: "gold" as const,
  },
  {
    day: "Day 4",
    title: "The Message That Turns 'How Much?' Into 'I Have Sent'",
    desc: "Copy-and-paste sales scripts I've personally used to close millions in WhatsApp sales. You'll respond to your first real buyer today.",
    variant: "default" as const,
  },
  {
    day: "Day 5",
    title: "Handle Objections & Close Without Begging",
    desc: "What to say when they say 'It's too expensive', 'Let me think about it', or go silent. You'll never lose a sale to confusion again.",
    variant: "default" as const,
  },
  {
    day: "Day 6",
    title: "Turn One Buyer Into Three (The Repeat Formula)",
    desc: "The Status sequence that gets your first buyer to refer their friends — automatically — without you asking. This is where a single sale becomes three.",
    variant: "accent" as const,
  },
  {
    day: "Day 7",
    title: "Scale to a Monthly Side Income — Still From Your Phone",
    desc: "Your 30-day plan to repeat this process consistently. Includes the daily 1-hour routine that runs in the background while you're at school, work, or home.",
    variant: "accent" as const,
  },
];

const OUTCOMES = [
  {
    title: "Your first paying customer",
    sub: "Money sent to your account. Real ₦, real human, no MLM.",
  },
  {
    title: "Real money in your first 7 days",
    sub: "Based on what 70% of past students have done. Some make more.",
  },
  {
    title: "A WhatsApp profile that sells while you sleep",
    sub: "Strangers DM you asking 'How much?' instead of you chasing them.",
  },
  {
    title: "Sales scripts you'll use for the next 10 years",
    sub: "Copy, paste, edit your product name, send. That simple.",
  },
  {
    title: "A repeatable 30-minute daily routine",
    sub: "So you keep making sales after Day 7 — even on a 9-5 or in lectures.",
  },
];

const AUDIENCE = [
  {
    icon: <IconBook />,
    name: "NYSC Corps Members & Students",
    desc: "You have time between lectures or PPA, and you need money your allowee can't cover.",
  },
  {
    icon: <IconBriefcase />,
    name: "9-5 Workers",
    desc: "Your salary ends by the 20th. You want ₦50k–₦100k extra without resigning.",
  },
  {
    icon: <IconPhone />,
    name: "Unemployed & Job Seekers",
    desc: "You need income now. You have a phone, data, and 1–2 free hours a day. That's enough.",
  },
  {
    icon: <IconHome />,
    name: "Stay-at-home Mums & Side Hustlers",
    desc: "You want to earn from home, on your own terms. Not network marketing. Not begging family.",
  },
];

const TESTIMONIALS = [
  {
    name: "Blessing O.",
    role: "Corps Member, Ogun",
    result: "First sale in 6 days",
    quote: "I joined on a Friday. By Wednesday, I had received my first ₦5,000 alert. By the end of Day 6, I had made real money selling something I never knew people would buy. Coach Jeremiah, God bless you.",
  },
  {
    name: "Tunde A.",
    role: "Bank Staff, Lagos",
    result: "4 weeks of salary in 7 days",
    quote: "I work 9-5 and thought I had no time. Coach showed us how to run it in 1 hour at night. My first week I made four times my typical take-home. My wife thinks I'm a wizard now.",
  },
  {
    name: "Mama Zainab",
    role: "Stay-at-home Mum, Kaduna",
    result: "More than her old job in 14 days",
    quote: "I haven't worked since my second baby. I joined to try. Two weeks in, I've made more than I earned at my last job. From my kitchen. With my phone.",
  },
];

const FAQS = [
  {
    q: "Is this a scam?",
    a: "Fair question — you should ask it about everything online. Here's the truth: I run a live training every day for 7 days. You see me, I see you, and your classmates see your results in the group. Scammers don't show their face for 7 days straight. They collect and disappear. I'm still here.",
  },
  {
    q: "I don't have a laptop or any capital. Can I still join?",
    a: "Yes — that's exactly who this is built for. Everything happens on your phone. You don't need to buy inventory, run ads, or have a website. If you have WhatsApp installed and ₦500 worth of data, you have everything you need.",
  },
  {
    q: "Is this MLM or do I have to recruit people?",
    a: "No. Zero recruiting. Zero downlines. You sell real products to real strangers who pay you because they actually want what you're offering. Nothing else.",
  },
  {
    q: "I've paid for online courses before and didn't make a kobo. Why is this different?",
    a: "Because most courses give you 40 hours of video and leave you alone. This is a 7-day LIVE bootcamp. You execute every day, you report back, and I personally see your work in the group. You can't hide and you can't get stuck — that's the difference.",
  },
  {
    q: "I'm a student / I work 9-5. I don't have hours every day.",
    a: "You need 1 hour per day. Most students do their work between 9pm–10pm or during lunch break. The whole system is built for people who are already busy.",
  },
  {
    q: "What if I do everything and still don't make a sale?",
    a: "If you show up every day, do the daily tasks, and don't make at least one sale by Day 14, I'll work with you 1-on-1 for free until you do. I have skin in the game — I don't want one student to leave empty-handed.",
  },
  {
    q: "How do I get in?",
    a: "Click any gold button on this page and you'll be taken straight to the bootcamp WhatsApp group. Tap 'Join Group' and you're inside. That's it — no waiting, no back-and-forth.",
  },
  {
    q: "When does the next bootcamp start?",
    a: "A new cohort begins every Monday. If you register before Sunday 11:59pm, you're inside the next one. Spots are capped at 50 per cohort so I can give personal attention.",
  },
];

// =========================================================
// HOOKS
// =========================================================
function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

// =========================================================
// REUSABLE BITS
// =========================================================
const CTAButton = ({ children, pulse = false, ariaLabel }: { children: React.ReactNode; pulse?: boolean; ariaLabel?: string }) => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn-primary ${pulse ? "btn-primary--pulse" : ""}`}
    aria-label={ariaLabel}
  >
    {children}
  </a>
);

const TrustMicro = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted" style={{ fontSize: "var(--text-sm)", textAlign: "center", marginTop: "var(--space-3)" }}>
    {children}
  </p>
);

// =========================================================
// APP
// =========================================================
export default function App() {
  useFadeIn();
  const scrolled = useScrollNav();

  return (
    <>
      {/* ============ NAV ============ */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`} aria-label="Primary">
        <div className="container nav__inner">
          <a href="#top" className="nav__logo">
            Coach <span>Jeremiah</span>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="nav__cta">
            Join the Bootcamp <IconArrowRight className="ml-1" style={{ width: 14, height: 14 }} />
          </a>
        </div>
      </nav>

      <main id="top">
        {/* ============ HERO ============ */}
        <header className="section hero-glow" style={{ paddingTop: "var(--space-16)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <span className="badge badge--accent fade-in" style={{ marginBottom: "var(--space-6)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <IconBolt style={{ width: 12, height: 12 }} /> 7-Day Live Bootcamp · Next Cohort Starts Monday
            </span>

            <h1 className="h-hero fade-in" style={{ marginBottom: "var(--space-6)" }}>
              Make Your First Real Money Online In 7 Days —{" "}
              <span style={{ color: "var(--color-text-muted)" }}>Using Just Your Phone.</span>
            </h1>

            <p className="h-sub fade-in" style={{ marginBottom: "var(--space-8)", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              The live WhatsApp Sales Bootcamp for Nigerians who are tired of "side hustles" that don't pay. No laptop. No capital. No MLM. Just one phone and 1 hour a day.
            </p>

            <p className="text-muted fade-in" style={{ fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>
              Join <strong style={{ color: "var(--color-text)" }}>200+ Nigerians</strong> already inside →
            </p>

            <div className="fade-in" style={{ maxWidth: 440, margin: "0 auto" }}>
              <CTAButton pulse ariaLabel="Reserve my spot in the 7-day bootcamp">
                Yes — I Want My First Sale In 7 Days
              </CTAButton>
              <TrustMicro>
                <IconBolt style={{ display: "inline-block", verticalAlign: "-2px", marginRight: 4, width: 14, height: 14 }} />
                Tap to join · Inside the group instantly
              </TrustMicro>
            </div>
          </div>
        </header>

        <div className="divider divider--glow" />

        {/* ============ PAIN ============ */}
        <section className="section section--surface" aria-labelledby="pain-title">
          <div className="container">
            <h2 id="pain-title" className="h-section fade-in" style={{ marginBottom: "var(--space-4)", textAlign: "center" }}>
              If Any Of This Sounds Like You…
            </h2>
            <p className="h-sub fade-in" style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
              Read these slowly. If 3 or more hit hard, this bootcamp was built for you.
            </p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {PAIN_POINTS.map((p, i) => (
                <li key={i} className="card fade-in" style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32, height: 32,
                      borderRadius: "var(--radius-full)",
                      background: "rgba(229, 57, 53, 0.12)",
                      color: "var(--color-red)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <IconX />
                  </span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "var(--text-base)", marginBottom: 4 }}>{p.title}</p>
                    <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>{p.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="fade-in" style={{ textAlign: "center", marginTop: "var(--space-10)", fontSize: "var(--text-lg)", fontFamily: "var(--font-display)", fontWeight: 700 }}>
              That changes in <span className="text-primary">7 days</span>.
            </p>
          </div>
        </section>

        {/* ============ SOCIAL PROOF BAR ============ */}
        <section className="section" aria-label="Results">
          <div className="container">
            <div
              className="fade-in"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "var(--space-6)",
                textAlign: "center",
              }}
            >
              {STATS.map((s, i) => (
                <div key={i}>
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ============ DAY-BY-DAY ============ */}
        <section className="section" aria-labelledby="days-title">
          <div className="container">
            <h2 id="days-title" className="h-section fade-in" style={{ marginBottom: "var(--space-4)", textAlign: "center" }}>
              Here's Exactly What Happens Each Day
            </h2>
            <p className="h-sub fade-in" style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
              No fluff. No theory. Every day you take one specific action that moves you closer to your first sale.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {DAYS.map((d, i) => (
                <article
                  key={i}
                  className={`fade-in card ${
                    d.variant === "gold" ? "card--gold" :
                    d.variant === "accent" ? "card--accent" : ""
                  }`}
                >
                  <span
                    className={`badge ${d.variant === "accent" ? "badge--accent" : "badge--gold"}`}
                    style={{ marginBottom: "var(--space-3)" }}
                  >
                    {d.day}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 700, marginBottom: "var(--space-2)", lineHeight: "var(--leading-snug)" }}>
                    {d.title}
                  </h3>
                  <p className="text-muted" style={{ fontSize: "var(--text-base)" }}>
                    {d.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ OUTCOMES ============ */}
        <section className="section section--surface" aria-labelledby="outcomes-title">
          <div className="container">
            <h2 id="outcomes-title" className="h-section fade-in" style={{ marginBottom: "var(--space-10)", textAlign: "center" }}>
              By Day 7, You Will Have:
            </h2>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {OUTCOMES.map((o, i) => (
                <li key={i} className="fade-in" style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32, height: 32,
                      borderRadius: "var(--radius-full)",
                      background: "rgba(201, 168, 76, 0.15)",
                      color: "var(--color-primary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <IconCheck />
                  </span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "var(--text-base)", marginBottom: 4 }}>{o.title}</p>
                    <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>{o.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="fade-in" style={{ maxWidth: 440, margin: "var(--space-10) auto 0" }}>
              <CTAButton>Lock In My Spot</CTAButton>
              <TrustMicro>Only {SPOTS_LEFT} spots left in the next cohort.</TrustMicro>
            </div>
          </div>
        </section>

        {/* ============ AUDIENCE ============ */}
        <section className="section" aria-labelledby="audience-title">
          <div className="container">
            <h2 id="audience-title" className="h-section fade-in" style={{ marginBottom: "var(--space-10)", textAlign: "center" }}>
              This Bootcamp Is Built For You If…
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {AUDIENCE.map((a, i) => (
                <article key={i} className="card card--gold fade-in" style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 48, height: 48,
                      borderRadius: "var(--radius-md)",
                      background: "rgba(201, 168, 76, 0.12)",
                      color: "var(--color-primary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {a.icon}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, marginBottom: 4 }}>{a.name}</h3>
                    <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>{a.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="fade-in" style={{ textAlign: "center", marginTop: "var(--space-10)", fontSize: "var(--text-lg)", fontFamily: "var(--font-display)", fontWeight: 700 }}>
              If you can use WhatsApp and read this page — <span className="text-primary">you're ready.</span>
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* ============ TESTIMONIALS ============ */}
        <section className="section" aria-labelledby="proof-title">
          <div className="container">
            <h2 id="proof-title" className="h-section fade-in" style={{ marginBottom: "var(--space-4)", textAlign: "center" }}>
              Real People. Real Sales.
            </h2>
            <p className="h-sub fade-in" style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
              These are screenshots from past students — paraphrased for privacy.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {TESTIMONIALS.map((t, i) => (
                <article key={i} className="card card--gold fade-in">
                  <div className="star-gold" style={{ display: "flex", gap: 2, marginBottom: "var(--space-3)" }}>
                    {Array.from({ length: 5 }).map((_, n) => <IconStar key={n} />)}
                  </div>
                  <span className="badge badge--accent" style={{ marginBottom: "var(--space-3)" }}>{t.result}</span>
                  <p style={{ fontSize: "var(--text-base)", fontStyle: "italic", marginBottom: "var(--space-4)", lineHeight: "var(--leading-normal)" }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <span
                      style={{
                        width: 40, height: 40, borderRadius: "var(--radius-full)",
                        background: "var(--color-surface-2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, color: "var(--color-primary)",
                        fontFamily: "var(--font-display)",
                      }}
                      aria-hidden="true"
                    >
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "var(--text-sm)" }}>{t.name}</p>
                      <p className="text-muted" style={{ fontSize: "var(--text-xs)" }}>{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section className="section section--surface" aria-labelledby="about-title">
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <img
                src="/images/coah-jeremiah.jpg"
                alt="Coach Jeremiah, founder of the 7-Day WhatsApp Sales Bootcamp"
                width={140}
                height={140}
                loading="lazy"
                className="fade-in"
                style={{
                  width: 140, height: 140,
                  borderRadius: "var(--radius-full)",
                  objectFit: "cover",
                  border: "3px solid var(--color-primary)",
                  margin: "0 auto var(--space-6)",
                }}
              />
              <h2 id="about-title" className="h-section fade-in" style={{ marginBottom: "var(--space-6)" }}>
                Hi, I'm <span className="text-primary">Coach Jeremiah.</span>
              </h2>
              <div className="fade-in" style={{ textAlign: "left", fontSize: "var(--text-base)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <p>
                  I've spent the last 4 years selling on WhatsApp — first to survive as a broke 300-level student, now as a full-time business doing <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>millions of naira in tracked sales</span>.
                </p>
                <p>
                  Along the way I noticed something. Nigerians don't lack hustle — they lack <strong style={{ color: "var(--color-text)" }}>a specific system that fits their reality</strong>: one phone, limited data, no startup capital.
                </p>
                <p>
                  So I built this bootcamp. 7 days. Live. With me in the group every single day. Over 200 students later, the system works — and I'd rather help one more person eat than make another viral post.
                </p>
              </div>

              <div className="fade-in" style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--space-3)",
                marginTop: "var(--space-10)",
              }}>
                {[
                  { n: "4+", l: "Years Selling" },
                  { n: "₦4M+", l: "Tracked Sales" },
                  { n: "200+", l: "Students" },
                ].map((s, i) => (
                  <div key={i} className="card" style={{ padding: "var(--space-4)", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-primary)", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: "10px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)", marginTop: 6, fontWeight: 600 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ OFFER STACK / FINAL CTA ============ */}
        <section className="section final-cta" aria-labelledby="offer-title" id="enroll">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
              <span className="badge badge--red fade-in" style={{ marginBottom: "var(--space-4)", display: "inline-block" }}>
                ⚡ Only {SPOTS_LEFT} Spots Left In Next Cohort
              </span>
              <h2 id="offer-title" className="h-section fade-in" style={{ marginBottom: "var(--space-4)" }}>
                Everything You Get When You Join Today
              </h2>
              <p className="h-sub fade-in">A complete live system — nothing else to buy, nothing else to learn.</p>
            </div>

            <ul className="fade-in card" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-8)" }}>
              {[
                { title: "7-Day Live Bootcamp Access", desc: "Daily live trainings + Q&A inside the private WhatsApp group" },
                { title: "The WhatsApp Sales Scripts Pack", desc: "Copy-paste templates I used to close ₦4M+ in sales" },
                { title: "Profile Conversion Playbook", desc: "Turn your WhatsApp profile into a 24/7 storefront" },
                { title: "Objection-Handling Cheat Sheet", desc: "What to say when buyers go silent or push back on price" },
                { title: "Lifetime Access to the Alumni Group", desc: "Stay in the group forever. Ask questions long after Day 7." },
              ].map((b, i) => (
                <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                  <span style={{
                    flexShrink: 0, width: 24, height: 24, borderRadius: "var(--radius-full)",
                    background: "rgba(201, 168, 76, 0.15)", color: "var(--color-primary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <IconCheck style={{ width: 14, height: 14 }} />
                  </span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "var(--text-base)" }}>{b.title}</p>
                    <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Price summary — NO PRICE, emphasis on urgency */}
            <div className="fade-in card card--gold" style={{ textAlign: "center", padding: "var(--space-10) var(--space-6)" }}>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
                Tap In. Show Up. Get Your First Sale.
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--color-text)", lineHeight: 1.15, marginBottom: "var(--space-4)" }}>
                Get All 5 Components + Lifetime Alumni
              </p>
              <p className="text-muted" style={{ fontSize: "var(--text-base)", marginBottom: "var(--space-6)" }}>
                Tap the button below and you're inside the private group — the training starts Monday.
              </p>

              <CTAButton pulse>
                <IconWhatsApp style={{ width: 18, height: 18 }} /> Join the Bootcamp Now
              </CTAButton>

              <p className="text-muted" style={{ fontSize: "var(--text-sm)", marginTop: "var(--space-4)", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
                <span><IconBolt style={{ display: "inline-block", verticalAlign: "-2px", width: 14, height: 14 }} /> Tap to join</span>
                <span>·</span>
                <span>Inside instantly</span>
                <span>·</span>
                <span>Lifetime access</span>
              </p>
            </div>
          </div>
        </section>

        {/* ============ GUARANTEE ============ */}
        <section className="section" aria-labelledby="guarantee-title">
          <div className="container">
            <div className="card card--gold fade-in" style={{ textAlign: "center", padding: "var(--space-10) var(--space-6)" }}>
              <span style={{ display: "inline-flex", color: "var(--color-primary)", marginBottom: "var(--space-4)" }}>
                <IconShield />
              </span>
              <h2 id="guarantee-title" className="h-section" style={{ marginBottom: "var(--space-4)" }}>
                The "Show Up & I'll Get You There" Guarantee
              </h2>
              <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
                Show up for all 7 days. Do the daily tasks. If you don't make at least one sale by Day 14, I'll work with you <strong style={{ color: "var(--color-text)" }}>1-on-1 for free</strong> until you do.
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-primary)" }}>
                The risk is on me — not you.
              </p>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="section section--surface" aria-labelledby="faq-title">
          <div className="container">
            <h2 id="faq-title" className="h-section fade-in" style={{ marginBottom: "var(--space-10)", textAlign: "center" }}>
              Questions People Ask Before Joining
            </h2>
            <FAQAccordion items={FAQS} />
          </div>
        </section>

        {/* ============ URGENCY BLOCK — Gold premium contrast ============ */}
        <section className="section" style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)", color: "#0A0A0A" }} aria-labelledby="urgency-title">
          <div className="container" style={{ textAlign: "center" }}>
            <span style={{
              display: "inline-block",
              padding: "var(--space-1) var(--space-3)",
              borderRadius: "var(--radius-full)",
              background: "rgba(10, 10, 10, 0.12)",
              fontSize: "var(--text-xs)", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "var(--tracking-wider)",
              marginBottom: "var(--space-6)",
              color: "#0A0A0A",
            }}>
              The Cost of Waiting
            </span>
            <h2 id="urgency-title" className="h-section fade-in" style={{ color: "#0A0A0A", marginBottom: "var(--space-4)" }}>
              Every Day You Wait Is Another Day of "Next Month, I'll Start."
            </h2>
            <p className="fade-in" style={{ fontSize: "var(--text-lg)", color: "rgba(10,10,10,0.78)", marginBottom: "var(--space-8)", maxWidth: 540, margin: "0 auto var(--space-8)" }}>
              The next cohort starts Monday. Spots are capped at 50. After that you wait another 7 days — and another month finishes with your account still at zero.
            </p>
            <div className="fade-in" style={{ maxWidth: 440, margin: "0 auto" }}>
              <a
                href={WHATSAPP_URL}
                target="_blank" rel="noopener noreferrer"
                className="btn-primary"
                style={{ background: "#0A0A0A", color: "var(--color-primary)" }}
              >
                Reserve My Spot Now
              </a>
            </div>
          </div>
        </section>

        {/* ============ FINAL CLOSE ============ */}
        <section className="section" aria-labelledby="close-title">
          <div className="container" style={{ textAlign: "center" }}>
            <h2 id="close-title" className="h-hero fade-in" style={{ marginBottom: "var(--space-6)" }}>
              This Is Your <span className="text-primary">Decision Point.</span>
            </h2>
            <div className="fade-in" style={{ fontSize: "var(--text-base)", color: "var(--color-text-muted)", marginBottom: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <p>You can close this page and try to figure it out alone. Most people do. Most people are still where they were a year ago.</p>
              <p>Or you can spend less than the cost of a night out, get inside the group on Monday, and have your first sale by Friday.</p>
              <p style={{ color: "var(--color-text)", fontWeight: 600 }}>The choice is yours. The clock is the same either way.</p>
            </div>
            <div className="fade-in" style={{ maxWidth: 460, margin: "0 auto" }}>
              <CTAButton pulse>
                <IconWhatsApp style={{ width: 18, height: 18 }} /> Yes — Get Me In
              </CTAButton>
              <TrustMicro>
                One tap to join · Inside the group in under 30 seconds
              </TrustMicro>
            </div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer style={{ borderTop: "1px solid var(--color-border)", padding: "var(--space-8) 0" }}>
          <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>
              © 2026 Coach Jeremiah. All rights reserved.
            </p>
            <p className="text-muted" style={{ fontSize: "var(--text-xs)", maxWidth: 540, margin: "0 auto" }}>
              Earnings disclaimer: Results vary based on effort. Numbers shown reflect past student outcomes and are not guarantees. This is not get-rich-quick — it's a real skill that takes work.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", fontSize: "var(--text-sm)" }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
                <IconWhatsApp style={{ width: 16, height: 16 }} /> Contact on WhatsApp
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* ============ STICKY MOBILE CTA ============ */}
      <div className="sticky-cta">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary--pulse">
          <IconWhatsApp style={{ width: 18, height: 18 }} /> Join Bootcamp Now
        </a>
      </div>
    </>
  );
}

// =========================================================
// FAQ ACCORDION (only one open at a time)
// =========================================================
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="fade-in">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="faq-item" data-open={isOpen}>
            <button
              className="faq-button"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="faq-icon" aria-hidden="true">+</span>
            </button>
            <div id={`faq-${i}`} className="faq-answer" role="region">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
