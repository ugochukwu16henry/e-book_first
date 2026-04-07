import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  ArrowRight,
  BookOpen,
  Download,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { MyEbook } from './EbookDocument';
import './App.css';

const modules = [
  {
    title: 'Chapter 1: The Foundation',
    desc: 'Build clarity around purpose, expectations, and spiritual alignment before saying yes forever.',
  },
  {
    title: 'Chapter 2: Communication',
    desc: 'Learn how to listen with empathy, speak honestly, and create emotional safety in your relationship.',
  },
  {
    title: 'Chapter 3: Conflict Resolution',
    desc: 'Turn difficult conversations into growth moments with practical tools for calm and repair.',
  },
  {
    title: 'Chapter 4: Shared Values',
    desc: 'Explore faith, finances, family roles, and long-term goals so you move forward in unity.',
  },
  {
    title: 'Chapter 5: Commitment',
    desc: 'Strengthen trust, readiness, and resilience for a marriage built on wisdom and intention.',
  },
];

const ebookData = {
  title: 'The Premarital Readiness Blueprint',
  subtitle: 'A practical guide for couples preparing for a strong, faith-centered future.',
  intro:
    'This eBook helps couples prepare intentionally for marriage by focusing on communication, shared values, emotional maturity, and long-term commitment. Each chapter is designed to be practical, reflective, and immediately useful.',
  chapters: [
    {
      title: 'Chapter 1: The Foundation',
      content:
        'Healthy marriages are built on more than chemistry. They are built on purpose, values, and a shared understanding of what covenant love requires. In this chapter, couples examine identity, expectations, readiness, and spiritual alignment so the relationship starts on a solid foundation.',
    },
    {
      title: 'Chapter 2: Communication',
      content:
        'Strong communication is not only about talking more, but talking better. This chapter walks through active listening, emotional honesty, timing, tone, and how to create a safe environment where both people feel heard, respected, and understood.',
    },
    {
      title: 'Chapter 3: Conflict Resolution',
      content:
        'Conflict is inevitable, but damage is not. Here, couples learn how to manage tension with maturity, identify recurring triggers, avoid defensiveness, and move toward repair, accountability, and understanding instead of winning arguments.',
    },
    {
      title: 'Chapter 4: Shared Values',
      content:
        'A thriving relationship needs agreement on the things that matter most. This chapter explores faith, family culture, finances, intimacy, life goals, and priorities so couples can build a relationship with direction and unity.',
    },
    {
      title: 'Chapter 5: Commitment',
      content:
        'Commitment is sustained through trust, consistency, sacrifice, and vision. In this chapter, readers reflect on emotional readiness, healthy boundaries, long-term partnership, and the habits that support a resilient marriage.',
    },
  ],
};

const highlights = [
  {
    icon: HeartHandshake,
    title: 'Practical relationship wisdom',
    text: 'Clear, actionable guidance for serious couples preparing for lifelong commitment.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted and grounded',
    text: 'Built to feel thoughtful, professional, and aligned with faith-based relationship values.',
  },
  {
    icon: Sparkles,
    title: 'Beautifully designed PDF',
    text: 'Your download is generated live and packaged into a clean, polished reading experience.',
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
              A professional, faith-aware guide to help couples build communication, clarity, and confidence before marriage.
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
            <div className="relative h-[320px] w-[220px] [perspective:1200px] md:h-[360px] md:w-[250px]">
              <div className="absolute inset-y-3 -left-4 w-5 rounded-l-xl bg-[#1e2660] shadow-lg" />
              <div className="absolute inset-0 rotate-3 rounded-[24px] border border-white/20 bg-gradient-to-br from-[#4154cc] via-[#2E3A8C] to-[#1f285f] p-6 shadow-2xl">
                <div className="flex h-full flex-col justify-between rounded-[18px] border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                  <div>
                    <div className="mb-3 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-blue-100">
                      Relationship eBook
                    </div>
                    <h2 className="text-2xl font-bold leading-tight">
                      The Premarital Readiness Blueprint
                    </h2>
                  </div>
                  <div className="space-y-3">
                    <BookOpen className="h-10 w-10 text-blue-100" />
                    <p className="text-sm text-blue-100">
                      Thoughtfully structured lessons for intentional couples.
                    </p>
                  </div>
                </div>
              </div>
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
            Each lesson is designed to help couples prepare intentionally for marriage with clarity, trust, and practical wisdom.
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
