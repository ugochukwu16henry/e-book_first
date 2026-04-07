import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  Home,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  User,
} from 'lucide-react';
import { MyEbook } from './EbookDocument';
import { ebooks, getEbookBySlug } from './data/ebooks';
import './App.css';

const storeHighlights = [
  {
    icon: ShoppingBag,
    title: 'Storefront homepage',
    text: 'Showcase every eBook in one polished home page with clear buy and view actions.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium PDF delivery',
    text: 'Each title can generate its own styled PDF experience from the product page.',
  },
  {
    icon: Sparkles,
    title: 'Selar-ready links',
    text: 'Every card includes a purchase link you can point directly to your Selar checkout.',
  },
];

function DownloadPdfButton({ book, className = '' }) {
  return (
    <PDFDownloadLink document={<MyEbook data={book} />} fileName={book.pdfFileName} className="inline-flex">
      {({ loading }) => (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition ${className}`}
        >
          <Download className="h-4 w-4" />
          {loading ? 'Preparing PDF...' : 'Download PDF'}
        </span>
      )}
    </PDFDownloadLink>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-[#2E3A8C] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-20">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">
              <BookOpen className="h-4 w-4" />
              Henry’s eBook Store
            </div>
            <a
              href="#ebooks"
              className="hidden rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
            >
              Browse store
            </a>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                A home page that works like your digital eBook store
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 md:text-lg">
                Showcase every title, let visitors open each eBook page, and send buyers straight to Selar or to a downloadable PDF preview.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#ebooks"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[#2E3A8C] shadow-lg transition hover:bg-slate-100"
                >
                  View eBooks
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  to={`/books/${ebooks[0].slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Open featured title
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:max-w-[420px] lg:ml-auto">
              {ebooks.slice(0, 3).map((book, index) => (
                <Link
                  key={book.slug}
                  to={`/books/${book.slug}`}
                  className={`overflow-hidden rounded-[24px] border border-white/15 bg-white/10 shadow-2xl backdrop-blur ${
                    index === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <img src={book.coverImagePath} alt={book.title} className="h-full w-full object-cover" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-8 md:grid-cols-3 md:px-10">
        {storeHighlights.map((item) => {
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

      <section id="ebooks" className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E3A8C]">Store Catalog</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">All your eBooks, showcased on one homepage</h2>
          <p className="mt-3 text-slate-600">
            Each book has its own dedicated page, its own PDF download, and its own Selar payment button.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ebooks.map((book) => (
            <article key={book.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <Link to={`/books/${book.slug}`} className="block bg-slate-100">
                <img src={book.coverImagePath} alt={book.title} className="h-80 w-full object-cover" />
              </Link>

              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2E3A8C]">
                    {book.badge}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{book.price}</span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900">{book.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{book.description}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={`/books/${book.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#2E3A8C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243171]"
                  >
                    View eBook page
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={book.selarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Buy on Selar
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
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
                Henry Ugochukwu brings together training in <strong>Marriage and Family Studies</strong> and <strong>Software Engineering</strong> from <strong>BYU-Idaho</strong>. This store layout is ready for your growing library of lessons, guides, and premium relationship eBooks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EbookPage() {
  const { slug } = useParams();
  const book = getEbookBySlug(slug);

  if (!book) {
    return <Navigate to="/" replace />;
  }

  const relatedBooks = ebooks.filter((item) => item.slug !== book.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E3A8C]">
            <Home className="h-4 w-4" />
            Back to store
          </Link>
          <a
            href={book.selarUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2E3A8C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#243171]"
          >
            Buy on Selar
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:px-10 lg:grid-cols-[360px_1fr] lg:items-start">
        <div className="space-y-5">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <img src={book.coverImagePath} alt={book.title} className="w-full object-cover" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2E3A8C]">
                {book.badge}
              </span>
              <span className="text-lg font-bold text-slate-900">{book.price}</span>
            </div>
            <p className="text-sm text-slate-600">{book.format}</p>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href={book.selarUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2E3A8C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#243171]"
              >
                Buy on Selar
                <ExternalLink className="h-4 w-4" />
              </a>

              <DownloadPdfButton
                book={book}
                className="justify-center border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E3A8C]">eBook details</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{book.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{book.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <DownloadPdfButton
              book={book}
              className="bg-[#2E3A8C] text-white hover:bg-[#243171]"
            />
            <a
              href={book.selarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Purchase on Selar
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">What’s inside</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{book.intro}</p>

            <div className="mt-6 space-y-4">
              {book.chapters.map((chapter, index) => (
                <div key={chapter.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-[#2E3A8C]">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-slate-900">{chapter.title}</h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">{chapter.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-[#2E3A8C]" />
              <h2 className="text-xl font-semibold text-slate-900">Why this page works</h2>
            </div>
            <ul className="space-y-2 text-sm leading-6 text-slate-600">
              <li>• Visitors can discover the book from the homepage storefront.</li>
              <li>• Each eBook has its own dedicated page with its own download button.</li>
              <li>• The Selar button is ready for your product checkout link.</li>
            </ul>
          </div>
        </div>
      </section>

      {relatedBooks.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <h2 className="mb-5 text-2xl font-bold text-slate-900">More eBooks in the store</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedBooks.map((item) => (
              <Link
                key={item.slug}
                to={`/books/${item.slug}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img src={item.coverImagePath} alt={item.title} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:slug" element={<EbookPage />} />
      </Routes>
    </BrowserRouter>
  );
}
