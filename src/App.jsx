import React, { useEffect, useMemo, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
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
import { fetchEbooks, fetchPdfTemplates, getEbookBySlug } from './data/ebooks';
import './App.css';

const renderHtml = (value = '') => ({ __html: value || '' });

const storeHighlights = [
  {
    icon: ShoppingBag,
    title: 'JSON-powered storefront',
    text: 'Your homepage and product pages now read from the same shared eBook JSON database.',
  },
  {
    icon: ShieldCheck,
    title: 'Admin + PDF sync',
    text: 'Any title, chapter, lesson, or cover update can flow into both the frontend and the PDF output.',
  },
  {
    icon: Sparkles,
    title: 'Template-ready PDF design',
    text: 'Each eBook can choose its own PDF look from premium, classic, or minimal templates.',
  },
];

function DownloadPdfButton({ book, className = '', forceShow = false }) {
  if (!book || (!forceShow && book.showPdfDownload === false)) {
    return null;
  }

  const fileName = book.pdfFileName || `${book.slug || 'ebook'}.pdf`;
  const downloadKey = `${book.slug || 'ebook'}-${book.templateKey || 'template'}-${fileName}`;

  return (
    <PDFDownloadLink
      key={downloadKey}
      document={<MyEbook key={downloadKey} data={book} />}
      fileName={fileName}
      className="inline-flex"
    >
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

function HomePage({ books, templatesByKey }) {
  const featuredBook = books[0];

  if (!books.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-slate-700">
        No eBooks were found in `public/data/ebooks.json` yet.
      </div>
    );
  }

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
                A homepage that works like your digital eBook store
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 md:text-lg">
                Showcase all your titles, open dedicated eBook pages, connect Selar payments, and keep your PDFs synced from one JSON content source.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#ebooks"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[#2E3A8C] shadow-lg transition hover:bg-slate-100"
                >
                  View eBooks
                  <ArrowRight className="h-4 w-4" />
                </a>

                {featuredBook ? (
                  <Link
                    to={`/books/${featuredBook.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Open featured title
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:max-w-[420px] lg:ml-auto">
              {books.slice(0, 3).map((book, index) => (
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
          {books.map((book) => (
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
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  PDF template: {templatesByKey[book.templateKey]?.name || 'Custom'}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={`/books/${book.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#2E3A8C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243171]"
                  >
                    View eBook page
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <DownloadPdfButton
                    book={book}
                    className="border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  />

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
                Henry Ugochukwu brings together training in <strong>Marriage and Family Studies</strong> and <strong>Software Engineering</strong> from <strong>BYU-Idaho</strong>. This store now reads from the same JSON content source your admin dashboard will manage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EbookPage({ books, templatesByKey }) {
  const { slug } = useParams();
  const location = useLocation();
  const book = getEbookBySlug(books, slug);

  if (!books.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
        Loading eBook details...
      </div>
    );
  }

  if (!book) {
    return <Navigate to="/" replace />;
  }

  const relatedBooks = books.filter((item) => item.slug !== book.slug).slice(0, 2);
  const templateName = templatesByKey[book.templateKey]?.name || 'Custom template';
  const adminDownloadMode = new URLSearchParams(location.search).get('adminDownload') === '1';
  const canShowPdfButton = book.showPdfDownload !== false || adminDownloadMode;

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
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{templateName}</p>

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

              {canShowPdfButton ? (
                <DownloadPdfButton
                  book={book}
                  forceShow={adminDownloadMode}
                  className="justify-center border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                />
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E3A8C]">eBook details</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{book.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{book.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {canShowPdfButton ? (
              <DownloadPdfButton
                book={book}
                forceShow={adminDownloadMode}
                className="bg-[#2E3A8C] text-white hover:bg-[#243171]"
              />
            ) : null}
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
            <div
              className="mt-2 text-sm leading-6 text-slate-600 [&_p]:mb-3 [&_ul]:mb-3 [&_ol]:mb-3"
              dangerouslySetInnerHTML={renderHtml(book.intro)}
            />

            <div className="mt-6 space-y-4">
              {book.chapters.map((chapter, index) => {
                const chapterIllustrations = Array.isArray(chapter.illustrations) ? chapter.illustrations : [];

                return (
                  <div key={chapter.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-[#2E3A8C]">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-slate-900">{chapter.title}</h3>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{chapter.summary}</p>
                    {chapterIllustrations.length ? (
                      <div className={`mt-3 grid gap-3 ${chapterIllustrations.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                        {chapterIllustrations.map((illustration, illustrationIndex) => (
                          <figure key={`${chapter.title}-${illustrationIndex}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <img
                              src={illustration.resolvedImage || illustration.imagePath}
                              alt={illustration.caption || chapter.title}
                              className="h-56 w-full object-cover"
                            />
                            {illustration.caption ? (
                              <figcaption className="px-4 py-2 text-xs text-slate-500">{illustration.caption}</figcaption>
                            ) : null}
                          </figure>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
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
              <li>• The Selar button and PDF content both read from the shared JSON source.</li>
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
  const [books, setBooks] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadStore = async () => {
      setLoading(true);
      const [ebookData, templateData] = await Promise.all([fetchEbooks(), fetchPdfTemplates()]);

      if (!active) {
        return;
      }

      setBooks(ebookData);
      setTemplates(templateData);
      setLoading(false);
    };

    loadStore();

    return () => {
      active = false;
    };
  }, []);

  const templatesByKey = useMemo(
    () => Object.fromEntries(templates.map((template) => [template.key, template])),
    [templates]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-slate-700">
        Loading your eBook store from JSON content...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage books={books} templatesByKey={templatesByKey} />} />
        <Route path="/books/:slug" element={<EbookPage books={books} templatesByKey={templatesByKey} />} />
      </Routes>
    </BrowserRouter>
  );
}