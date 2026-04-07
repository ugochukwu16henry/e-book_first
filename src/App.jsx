import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  ArrowRight,
  Download,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { MyEbook } from './EbookDocument';
import './App.css';

const coverImagePath = '/images/E-book%20cover.jfif';

const coverImage =
  typeof window !== 'undefined'
    ? `${window.location.origin}${coverImagePath}`
    : coverImagePath;

const modules = [
  {
    title: 'Chapter 1: The Foundation',
    desc: 'Clarify values, readiness, expectations, and the kind of marriage you are trying to build.',
  },
  {
    title: 'Chapter 2: Communication',
    desc: 'Develop habits of honesty, empathy, emotional safety, and everyday understanding.',
  },
  {
    title: 'Chapter 3: Conflict Resolution',
    desc: 'Learn to repair quickly, manage tension wisely, and move through disagreement with maturity.',
  },
  {
    title: 'Chapter 4: Shared Values',
    desc: 'Align on faith, finances, family culture, roles, priorities, and long-term direction.',
  },
  {
    title: 'Chapter 5: Commitment',
    desc: 'Strengthen trust, resilience, and the steady choices that support covenant love.',
  },
];

const ebookData = {
  title: 'The Premarital Readiness Blueprint',
  subtitle: 'A practical, faith-aware guide for couples preparing for a strong and intentional future.',
  intro:
    'This premium guide helps couples move beyond romantic excitement into thoughtful preparation. It brings together emotional insight, relationship wisdom, and practical conversation prompts so readers can prepare for marriage with greater clarity, trust, and maturity.',
  coverImage,
  chapters: [
    {
      title: 'Chapter 1: The Foundation',
      summary: 'Build the relationship on clarity, identity, and spiritual alignment.',
      content: `Before couples plan a future together, they need to understand the foundation they are standing on. A healthy marriage is not built only on chemistry or shared attraction. It is built on values, convictions, emotional maturity, and a clear understanding of purpose.

This chapter invites each person to examine expectations about love, commitment, gender roles, spiritual leadership, and family life. Many couples carry hidden assumptions from childhood, culture, or previous relationships. Naming those assumptions early can prevent avoidable pain later.

A strong foundation also asks deeper questions: Are we individually prepared for covenant responsibility? Do we know how to make decisions with honesty and humility? Are we building toward the same kind of life? When couples slow down to answer these questions well, they begin their journey with wisdom instead of confusion.`,
      prompts: [
        'What beliefs about marriage did I inherit from my family or past experiences?',
        'Where do we already feel aligned, and where do we still need clarity?',
        'What does emotional and spiritual readiness look like for each of us right now?',
      ],
      takeaway: 'A wise marriage starts with a clear foundation, not vague assumptions.',
    },
    {
      title: 'Chapter 2: Communication',
      summary: 'Create emotional safety through listening, empathy, and truthfulness.',
      content: `Communication is more than words. It includes tone, timing, body language, emotional awareness, and the willingness to truly hear another person. Many couples speak often but still feel unseen because they have not learned how to listen deeply and respond with care.

This chapter focuses on practical communication habits such as slowing down reactive conversations, asking better questions, clarifying what was heard, and being honest without being harsh. It also emphasizes the importance of emotional safety, because trust grows when both people feel respected, not dismissed.

Good communication is not perfection. It is the repeated choice to move toward understanding rather than defensiveness. When couples strengthen this skill early, they build a pattern that protects the relationship during both ordinary days and difficult seasons.`,
      prompts: [
        'When conflict rises, do I tend to withdraw, attack, or stay present?',
        'What helps me feel truly heard and understood in conversation?',
        'How can we make hard discussions feel safer and more productive?',
      ],
      takeaway: 'Great relationships are strengthened by honest words delivered with grace.',
    },
    {
      title: 'Chapter 3: Conflict Resolution',
      summary: 'Handle disagreements in a way that protects connection instead of damaging it.',
      content: `Conflict is not proof that a relationship is failing. Often, it simply reveals where two people are different, wounded, tired, or misunderstood. What matters most is not whether conflict appears, but how it is handled when it does.

In this chapter, couples learn to identify unhealthy patterns such as contempt, blame, stonewalling, and scorekeeping. They also practice repair habits like taking responsibility, pausing before reacting, clarifying intent, and returning to the conversation with humility.

Healthy conflict resolution creates trust because it shows that the relationship can survive truth. Instead of trying to win, couples learn how to understand, solve, and reconnect. This shift turns tension into one of the greatest opportunities for growth and maturity.`,
      prompts: [
        'What triggers us most quickly during disagreement?',
        'How do we know when it is time to pause instead of pushing harder?',
        'What would repair and accountability look like after a hard conversation?',
      ],
      takeaway: 'The goal of conflict is not victory, but understanding and repair.',
    },
    {
      title: 'Chapter 4: Shared Values',
      summary: 'Align your life around what matters most before marriage begins.',
      content: `Couples often assume they are aligned because they enjoy being together, but long-term unity requires more than affection. It requires agreement on deeper questions of faith, purpose, finances, family rhythms, boundaries, and future vision.

This chapter helps couples explore the values that will shape daily life after the wedding. How will money be managed? What does family leadership look like? How will decisions be made? What role will faith play in the home? Clarity in these areas creates peace and direction.

Shared values do not mean identical personalities. They mean building life around common commitments. When couples become intentional here, they reduce confusion and create a stronger sense of partnership, teamwork, and mutual trust.`,
      prompts: [
        'What values do we want to define our home and future family?',
        'How do we each think about faith, finances, service, and priorities?',
        'Which expectations need to be discussed now rather than later?',
      ],
      takeaway: 'A unified future grows from shared values practiced consistently.',
    },
    {
      title: 'Chapter 5: Commitment',
      summary: 'Strengthen the habits and mindset that sustain lifelong love.',
      content: `Commitment is more than a promise made once. It is a daily posture of faithfulness, patience, service, and sacrifice. Lasting marriage is built by steady choices that protect trust and nurture connection over time.

This chapter encourages readers to think beyond the wedding into the kind of partner they want to become. It explores resilience, responsibility, boundaries, forgiveness, and the discipline required to keep love strong through change and pressure.

Couples who understand commitment as action—not just emotion—are better prepared for the realities of married life. They learn that enduring love is not accidental. It is cultivated through intention, humility, and the willingness to keep choosing one another.`,
      prompts: [
        'What does dependable love look like in real daily life?',
        'How do we protect trust when life feels stressful or uncertain?',
        'What rhythms will help us keep growing together after marriage begins?',
      ],
      takeaway: 'Strong commitment is built through consistent choices, not occasional feelings.',
    },
  ],
  closingNote:
    'Premarital preparation is one of the wisest gifts a couple can give their future. A thoughtful beginning does not guarantee a perfect marriage, but it does create stronger ground for love, trust, and lifelong partnership.',
};

const highlights = [
  {
    icon: HeartHandshake,
    title: 'Practical relationship wisdom',
    text: 'Grounded lessons and reflection prompts for serious couples preparing well.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted and professional',
    text: 'A polished, faith-aware presentation designed to feel credible and reassuring.',
  },
  {
    icon: Sparkles,
    title: 'Premium PDF experience',
    text: 'Your download is generated live with styled pages, chapter structure, and cover art.',
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="fixed bottom-5 right-5 z-50">
        <PDFDownloadLink
          document={<MyEbook data={ebookData} />}
          fileName="the-premarital-readiness-blueprint.pdf"
          className="inline-flex"
        >
          {({ loading }) => (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2E3A8C] px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-[#243171]">
              <Download className="h-4 w-4" />
              {loading ? 'Preparing PDF...' : 'Download PDF'}
            </span>
          )}
        </PDFDownloadLink>
      </div>

      <section className="relative overflow-hidden bg-[#2E3A8C] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-blue-100 ring-1 ring-white/20">
              Premium premarital eBook
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              The Premarital Readiness Blueprint
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 md:text-lg">
              A beautifully designed guide to help couples prepare for marriage with clarity, trust, and lasting confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PDFDownloadLink
                document={<MyEbook data={ebookData} />}
                fileName="the-premarital-readiness-blueprint.pdf"
              >
                {({ loading }) => (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[#2E3A8C] shadow-lg transition hover:bg-slate-100">
                    <Download className="h-4 w-4" />
                    {loading ? 'Preparing PDF...' : 'Download PDF'}
                  </span>
                )}
              </PDFDownloadLink>

              <a
                href="#modules"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore chapters
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[30px] bg-white/10 blur-2xl" />
              <img
                src={coverImagePath}
                alt="The Premarital Readiness Blueprint book cover"
                className="relative w-[260px] rounded-[24px] border border-white/20 shadow-2xl md:w-[320px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-8 md:grid-cols-3 md:px-10">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="mb-3 h-8 w-8 text-[#2E3A8C]" />
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          );
        })}
      </section>

      <section id="modules" className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E3A8C]">Course Modules</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Five focused chapters for lasting readiness</h2>
          <p className="mt-3 text-slate-600">
            Each section is written to help couples prepare intentionally for marriage with practical wisdom and meaningful conversation.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((mod, index) => (
            <div
              key={mod.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-semibold text-[#2E3A8C]">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{mod.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-4 md:px-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
              <User className="h-7 w-7 text-[#2E3A8C]" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E3A8C]">About the Author</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Henry Ugochukwu</h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                Henry Ugochukwu brings together training in <strong>Marriage and Family Studies</strong> and <strong>Software Engineering</strong> from <strong>BYU-Idaho</strong>. His work combines relationship insight, structure, and technology to help couples prepare for committed, healthy marriages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
