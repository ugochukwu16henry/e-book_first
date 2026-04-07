import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const toPlainText = (value = '') =>
  value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h1|h2|h3|h4|li|blockquote|ul|ol)>/gi, '$&\n')
    .replace(/<li>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const toParagraphs = (value = '') => {
  const cleaned = toPlainText(value);
  return cleaned ? cleaned.split(/\n\n+/) : ['Content goes here...'];
};

const themes = {
  premium: {
    label: 'PREMIUM EDITORIAL',
    accent: '#1E2A78',
    coverBg: '#F8FAFC',
    pageBg: '#FFFFFF',
    line: '#C7D2FE',
    cardBg: '#FFFFFF',
    highlightBg: '#EEF2FF',
    text: '#334155',
    subtext: '#475569',
  },
  classic: {
    label: 'CLASSIC STUDY GUIDE',
    accent: '#6B4F2A',
    coverBg: '#FFFBF5',
    pageBg: '#FFFEFB',
    line: '#E7D9C3',
    cardBg: '#FFFFFF',
    highlightBg: '#F9F5EE',
    text: '#4B3D31',
    subtext: '#6C5C4E',
  },
  minimal: {
    label: 'MINIMAL CLEAN',
    accent: '#0F172A',
    coverBg: '#F8FAFC',
    pageBg: '#FFFFFF',
    line: '#E2E8F0',
    cardBg: '#F8FAFC',
    highlightBg: '#F1F5F9',
    text: '#334155',
    subtext: '#64748B',
  },
  relaxed: {
    label: 'RELAXED PRINT LAYOUT',
    accent: '#1F3C88',
    coverBg: '#F4F1EA',
    pageBg: '#FFFDF8',
    line: '#D6C7B3',
    cardBg: '#FFFFFF',
    highlightBg: '#F6EFE4',
    text: '#2B2B2B',
    subtext: '#5F5A54',
    styleNote: 'HTML-print aesthetic with clean report structure',
    contentsHeading: 'Document overview',
    finalHeading: 'Turn insight into action',
    footerNote: 'Rendered in a ReLaXed-inspired print layout',
  },
  'relaxed-book': {
    label: 'RELAXED BOOK EDITION',
    accent: '#5A3E2B',
    coverBg: '#FBF6EE',
    pageBg: '#FFFCF7',
    line: '#E4D4C3',
    cardBg: '#FFFDF9',
    highlightBg: '#F7EFE3',
    text: '#3F342B',
    subtext: '#6B5B4D',
    styleNote: 'Long-form reading layout with warm editorial tones',
    contentsHeading: 'Book structure',
    finalHeading: 'Carry these lessons into your story',
    footerNote: 'Prepared in the ReLaXed Book Edition',
  },
  'relaxed-report': {
    label: 'RELAXED REPORT EDITION',
    accent: '#0B5D7A',
    coverBg: '#F4FAFC',
    pageBg: '#FCFEFF',
    line: '#C9E2EA',
    cardBg: '#FFFFFF',
    highlightBg: '#EAF6FA',
    text: '#20323B',
    subtext: '#50656F',
    styleNote: 'Professional report layout with strong section clarity',
    contentsHeading: 'Report highlights',
    finalHeading: 'Key recommendations for the future',
    footerNote: 'Prepared in the ReLaXed Report Edition',
  },
  'relaxed-paper': {
    label: 'RELAXED PAPER EDITION',
    accent: '#374151',
    coverBg: '#F8F8F6',
    pageBg: '#FFFFFF',
    line: '#D6D9DE',
    cardBg: '#FAFAFA',
    highlightBg: '#F3F4F6',
    text: '#2B313A',
    subtext: '#616B77',
    styleNote: 'Academic paper rhythm with clean, disciplined typography',
    contentsHeading: 'Paper outline',
    finalHeading: 'Conclusion and next reflection',
    footerNote: 'Prepared in the ReLaXed Paper Edition',
  },
  'relaxed-letter': {
    label: 'RELAXED LETTER EDITION',
    accent: '#8B3A3A',
    coverBg: '#FFF8F6',
    pageBg: '#FFFDFC',
    line: '#E7D0CB',
    cardBg: '#FFFFFF',
    highlightBg: '#FCEFEA',
    text: '#442F2F',
    subtext: '#7A5F5F',
    styleNote: 'Reflective editorial layout for personal, story-driven writing',
    contentsHeading: 'Letter themes',
    finalHeading: 'A final word for the journey ahead',
    footerNote: 'Prepared in the ReLaXed Letter Edition',
  },
};

const getAuthor = (data = {}) => toPlainText(data.author || 'Henry Ugochukwu');
const getFocusTitle = (data = {}, theme) => toPlainText(data.focusTitle || data.badge || theme.label || 'Featured Guide');
const getFocusText = (data = {}) =>
  toPlainText(data.focus || data.description || 'Premarital preparation, communication, and commitment');
const getLayoutNote = (theme = {}) => theme.styleNote || 'Premium eBook layout';
const getContentsHeading = (theme = {}) => theme.contentsHeading || 'Inside this eBook';
const getFinalHeading = (theme = {}) => theme.finalHeading || 'A wise beginning shapes a strong future';
const getFooterNote = (theme = {}, author = 'Henry Ugochukwu') =>
  theme.footerNote ? `${theme.footerNote} | ${author}` : `Prepared by ${author}`;

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 56,
    paddingHorizontal: 46,
  },
  coverPage: {
    paddingTop: 42,
    paddingBottom: 56,
    paddingHorizontal: 46,
  },
  label: {
    fontSize: 9,
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 12,
  },
  divider: {
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  coverRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  coverImageWrap: {
    width: 180,
    height: 270,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: 18,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  coverInfo: {
    flex: 1,
  },
  infoCard: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  infoLine: {
    fontSize: 10,
    marginBottom: 6,
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chapterTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summary: {
    fontSize: 10,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  paragraph: {
    fontSize: 10.5,
    lineHeight: 1.7,
    marginBottom: 10,
    textAlign: 'justify',
  },
  chapterIllustrationWrap: {
    marginTop: 6,
    marginBottom: 14,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  chapterIllustration: {
    width: '100%',
    height: 190,
    objectFit: 'cover',
    borderRadius: 8,
  },
  chapterCaption: {
    fontSize: 8.5,
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 1.4,
  },
  tocRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tocNumber: {
    width: 32,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tocContent: {
    flex: 1,
  },
  tocTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  tocText: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  takeawayBox: {
    marginTop: 10,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  takeawayLabel: {
    fontSize: 9,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  takeawayText: {
    fontSize: 10,
    lineHeight: 1.6,
  },
  subheading: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 4,
  },
  bullet: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 46,
    right: 46,
    fontSize: 8.5,
    textAlign: 'center',
    color: '#64748B',
  },
});

export const MyEbook = ({ data }) => {
  const chapters = data?.chapters ?? [];
  const theme = themes[data?.templateKey] ?? themes.premium;
  const author = getAuthor(data);
  const focusTitle = getFocusTitle(data, theme);
  const focusText = getFocusText(data);
  const layoutNote = getLayoutNote(theme);
  const contentsHeading = getContentsHeading(theme);
  const finalHeading = getFinalHeading(theme);
  const footerNote = getFooterNote(theme, author);

  return (
    <Document
      title={data?.title || 'The Premarital Readiness Blueprint'}
      author={author}
      subject={focusText}
      keywords={[data?.title, focusTitle, data?.templateKey, 'ebook', 'marriage']
        .filter(Boolean)
        .join(', ')}
    >
      <Page size="A4" style={[styles.coverPage, { backgroundColor: theme.coverBg, color: theme.text }]}> 
        <Text style={[styles.label, { color: theme.accent }]}>{focusTitle}</Text>
        <Text style={[styles.title, { color: theme.accent }]}>{data?.title || 'The Premarital Readiness Blueprint'}</Text>
        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          {toPlainText(data?.description || data?.subtitle || 'A practical guide for couples preparing for a strong, faith-centered future.')}
        </Text>
        <View style={[styles.divider, { borderBottomColor: theme.line }]} />

        <View style={styles.coverRow}>
          <View style={[styles.coverImageWrap, { borderColor: theme.line, backgroundColor: theme.cardBg }]}>
            {data?.coverImage ? <Image src={data.coverImage} style={styles.coverImage} /> : null}
          </View>

          <View style={styles.coverInfo}>
            <Text style={[styles.paragraph, { color: theme.text }]}>
              {toPlainText(
                data?.intro ||
                  'This eBook is designed to help couples build a thoughtful foundation for a healthy, lasting marriage.'
              )}
            </Text>

            <View style={[styles.infoCard, { backgroundColor: theme.cardBg, borderColor: theme.line }]}>
              <Text style={[styles.infoLine, { color: theme.text }]}>Author: {author}</Text>
              <Text style={[styles.infoLine, { color: theme.text }]}>Focus: {focusText}</Text>
              <Text style={[styles.infoLine, { color: theme.text }]}>Chapters: {chapters.length}</Text>
              <Text style={[styles.infoLine, { color: theme.text }]}>PDF Template: {theme.label}</Text>
              <Text style={[styles.infoLine, { color: theme.text }]}>Layout Style: {layoutNote}</Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages} | ${footerNote}`
          }
          fixed
        />
      </Page>

      <Page size="A4" style={[styles.page, { backgroundColor: theme.pageBg, color: theme.text }]}> 
        <Text style={[styles.label, { color: theme.accent }]}>TABLE OF CONTENTS</Text>
        <Text style={[styles.heading, { color: theme.accent }]}>{contentsHeading}</Text>
        <View style={[styles.divider, { borderBottomColor: theme.line }]} />

        {chapters.map((chapter, index) => (
          <View key={chapter.title || index} style={[styles.tocRow, { borderBottomColor: theme.line }]}>
            <Text style={[styles.tocNumber, { color: theme.accent }]}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={styles.tocContent}>
              <Text style={[styles.tocTitle, { color: theme.text }]}>{chapter.title}</Text>
              <Text style={[styles.tocText, { color: theme.subtext }]}>{chapter.summary || 'Practical insights for a stronger relationship.'}</Text>
            </View>
          </View>
        ))}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages} | ${footerNote}`
          }
          fixed
        />
      </Page>

{chapters.map((chapter, index) => {
        const chapterIllustrations = Array.isArray(chapter.illustrations) && chapter.illustrations.length
          ? chapter.illustrations
          : chapter.illustrationImage || chapter.illustrationImagePath
            ? [
                {
                  resolvedImage: chapter.illustrationImage || chapter.illustrationImagePath,
                  imagePath: chapter.illustrationImagePath || chapter.illustrationImage,
                  caption: chapter.illustrationCaption || '',
                },
              ]
            : [];

        return (
          <Page key={chapter.title || index} size="A4" style={[styles.page, { backgroundColor: theme.pageBg, color: theme.text }]}> 
            <Text style={[styles.label, { color: theme.accent }]}>{`CHAPTER ${String(index + 1).padStart(2, '0')}`}</Text>
            <Text style={[styles.chapterTitle, { color: theme.accent }]}>{chapter.title || `Chapter ${index + 1}`}</Text>
            <Text style={[styles.summary, { color: theme.subtext }]}>{chapter.summary || ''}</Text>
            <View style={[styles.divider, { borderBottomColor: theme.line }]} />

            {chapterIllustrations.map((illustration, illustrationIndex) => (
              <View
                key={`${chapter.title || index}-illustration-${illustrationIndex}`}
                style={[styles.chapterIllustrationWrap, { backgroundColor: theme.cardBg, borderColor: theme.line }]}
              >
                <Image src={illustration.resolvedImage || illustration.imagePath} style={styles.chapterIllustration} />
                {illustration.caption ? (
                  <Text style={[styles.chapterCaption, { color: theme.subtext }]}>{illustration.caption}</Text>
                ) : null}
              </View>
            ))}

            <View>
              {toParagraphs(chapter.content || 'Content goes here...').map((paragraph, paragraphIndex) => (
                <Text key={paragraphIndex} style={[styles.paragraph, { color: theme.text }]}> 
                  {paragraph}
                </Text>
              ))}
            </View>

            {chapter.takeaway ? (
              <View style={[styles.takeawayBox, { backgroundColor: theme.highlightBg, borderColor: theme.line }]}> 
                <Text style={[styles.takeawayLabel, { color: theme.accent }]}>KEY TAKEAWAY</Text>
                <Text style={[styles.takeawayText, { color: theme.text }]}>{chapter.takeaway}</Text>
              </View>
            ) : null}

            {chapter.prompts?.length ? (
              <View>
                <Text style={[styles.subheading, { color: theme.accent }]}>Reflection prompts</Text>
                {chapter.prompts.map((prompt, promptIndex) => (
                  <Text key={promptIndex} style={[styles.bullet, { color: theme.text }]}> 
                    • {prompt}
                  </Text>
                ))}
              </View>
            ) : null}

            <Text
              style={styles.footer}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages} | ${footerNote}`
              }
              fixed
            />
          </Page>
        );
      })}

      <Page size="A4" style={[styles.page, { backgroundColor: theme.pageBg, color: theme.text }]}> 
        <Text style={[styles.label, { color: theme.accent }]}>FINAL NOTE</Text>
        <Text style={[styles.heading, { color: theme.accent }]}>{finalHeading}</Text>
        <View style={[styles.divider, { borderBottomColor: theme.line }]} />
        <Text style={[styles.paragraph, { color: theme.text }]}>
          {toPlainText(
            data?.closingNote ||
              'Thoughtful preparation creates stronger ground for love, trust, and lifelong partnership.'
          )}
        </Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          Use this eBook as a conversation guide, a reflection tool, and a reminder that strong marriages are built with intention. When couples prepare honestly and prayerfully, they are better equipped to create a relationship marked by grace, trust, and enduring commitment.
        </Text>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages} | ${footerNote}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};