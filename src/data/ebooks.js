const resolveAsset = (path) =>
  typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;

const hydrateIllustration = (illustration = {}) => ({
  ...illustration,
  imagePath: illustration.imagePath || '',
  caption: illustration.caption || '',
  resolvedImage: illustration.imagePath ? resolveAsset(illustration.imagePath) : '',
});

const hydrateChapter = (chapter = {}) => {
  const gallery = Array.isArray(chapter.illustrations)
    ? chapter.illustrations.map(hydrateIllustration).filter((item) => item.imagePath)
    : [];

  if (!gallery.length && chapter.illustrationImagePath) {
    gallery.push({
      imagePath: chapter.illustrationImagePath,
      caption: chapter.illustrationCaption || '',
      resolvedImage: resolveAsset(chapter.illustrationImagePath),
    });
  }

  return {
    ...chapter,
    illustrationImage: chapter.illustrationImagePath
      ? resolveAsset(chapter.illustrationImagePath)
      : '',
    illustrations: gallery,
  };
};

const hydrateBook = (book) => ({
  ...book,
  author: book.author || 'Henry Ugochukwu',
  focusTitle: book.focusTitle || book.badge || book.title || 'Featured Guide',
  focus:
    book.focus ||
    book.description ||
    'Premarital preparation, communication, and commitment.',
  showPdfDownload: book.showPdfDownload !== false,
  coverImage: resolveAsset(book.coverImagePath),
  chapters: Array.isArray(book.chapters) ? book.chapters.map(hydrateChapter) : [],
});

async function readJson(path, fallback = []) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Unable to load ${path}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

export async function fetchEbooks() {
  const books = await readJson('/data/ebooks.json', []);
  return Array.isArray(books) ? books.map(hydrateBook) : [];
}

export async function fetchPdfTemplates() {
  const templates = await readJson('/data/pdf-templates.json', []);
  return Array.isArray(templates) ? templates : [];
}

export const getEbookBySlug = (ebooks = [], slug) => ebooks.find((ebook) => ebook.slug === slug);
