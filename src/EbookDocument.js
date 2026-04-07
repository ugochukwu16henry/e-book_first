import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 56,
    paddingHorizontal: 46,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
  },
  coverPage: {
    paddingTop: 42,
    paddingBottom: 56,
    paddingHorizontal: 46,
    backgroundColor: '#F8FAFC',
    color: '#1F2937',
  },
  label: {
    fontSize: 9,
    color: '#2E3A8C',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E2A78',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#C7D2FE',
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
    borderColor: '#CBD5E1',
    backgroundColor: '#E2E8F0',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoLine: {
    fontSize: 10,
    color: '#334155',
    marginBottom: 6,
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E2A78',
    marginBottom: 8,
  },
  chapterTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E2A78',
    marginBottom: 8,
  },
  summary: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 12,
    lineHeight: 1.5,
  },
  paragraph: {
    fontSize: 10.5,
    color: '#334155',
    lineHeight: 1.7,
    marginBottom: 10,
    textAlign: 'justify',
  },
  tocRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tocNumber: {
    width: 32,
    fontSize: 10,
    color: '#2E3A8C',
    fontWeight: 'bold',
  },
  tocContent: {
    flex: 1,
  },
  tocTitle: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  tocText: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.5,
  },
  takeawayBox: {
    marginTop: 10,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  takeawayLabel: {
    fontSize: 9,
    color: '#2E3A8C',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  takeawayText: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.6,
  },
  subheading: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 4,
  },
  bullet: {
    fontSize: 10,
    color: '#334155',
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

  return (
    <Document
      title={data?.title || 'The Premarital Readiness Blueprint'}
      author="Henry Ugochukwu"
      subject="Premarital preparation and relationship readiness"
      keywords="premarital, marriage, relationships, communication, readiness"
    >
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.label}>PREMIUM DIGITAL EBOOK</Text>
        <Text style={styles.title}>{data?.title || 'The Premarital Readiness Blueprint'}</Text>
        <Text style={styles.subtitle}>
          {data?.subtitle || 'A practical guide for couples preparing for a strong, faith-centered future.'}
        </Text>
        <View style={styles.divider} />

        <View style={styles.coverRow}>
          <View style={styles.coverImageWrap}>
            {data?.coverImage ? <Image src={data.coverImage} style={styles.coverImage} /> : null}
          </View>

          <View style={styles.coverInfo}>
            <Text style={styles.paragraph}>
              {data?.intro ||
                'This eBook is designed to help couples build a thoughtful foundation for a healthy, lasting marriage.'}
            </Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoLine}>Author: Henry Ugochukwu</Text>
              <Text style={styles.infoLine}>Focus: Premarital preparation, communication, and commitment</Text>
              <Text style={styles.infoLine}>Chapters: {chapters.length}</Text>
              <Text style={styles.infoLine}>Designed to feel like a premium published guide</Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages} | Prepared by Henry Ugochukwu`
          }
          fixed
        />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>TABLE OF CONTENTS</Text>
        <Text style={styles.heading}>Inside this blueprint</Text>
        <View style={styles.divider} />

        {chapters.map((chapter, index) => (
          <View key={chapter.title || index} style={styles.tocRow}>
            <Text style={styles.tocNumber}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={styles.tocContent}>
              <Text style={styles.tocTitle}>{chapter.title}</Text>
              <Text style={styles.tocText}>{chapter.summary || 'Practical insights for a stronger relationship.'}</Text>
            </View>
          </View>
        ))}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages} | Prepared by Henry Ugochukwu`
          }
          fixed
        />
      </Page>

      {chapters.map((chapter, index) => (
        <Page key={chapter.title || index} size="A4" style={styles.page}>
          <Text style={styles.label}>{`CHAPTER ${String(index + 1).padStart(2, '0')}`}</Text>
          <Text style={styles.chapterTitle}>{chapter.title || `Chapter ${index + 1}`}</Text>
          <Text style={styles.summary}>{chapter.summary || ''}</Text>
          <View style={styles.divider} />

          <View>
            {(chapter.content || 'Content goes here...').split('\n\n').map((paragraph, paragraphIndex) => (
              <Text key={paragraphIndex} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>

          {chapter.takeaway ? (
            <View style={styles.takeawayBox}>
              <Text style={styles.takeawayLabel}>KEY TAKEAWAY</Text>
              <Text style={styles.takeawayText}>{chapter.takeaway}</Text>
            </View>
          ) : null}

          {chapter.prompts?.length ? (
            <View>
              <Text style={styles.subheading}>Reflection prompts</Text>
              {chapter.prompts.map((prompt, promptIndex) => (
                <Text key={promptIndex} style={styles.bullet}>
                  • {prompt}
                </Text>
              ))}
            </View>
          ) : null}

          <Text
            style={styles.footer}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages} | Prepared by Henry Ugochukwu`
            }
            fixed
          />
        </Page>
      ))}

      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>FINAL NOTE</Text>
        <Text style={styles.heading}>A wise beginning shapes a strong future</Text>
        <View style={styles.divider} />
        <Text style={styles.paragraph}>
          {data?.closingNote ||
            'Thoughtful preparation creates stronger ground for love, trust, and lifelong partnership.'}
        </Text>
        <Text style={styles.paragraph}>
          Use this blueprint as a conversation guide, a reflection tool, and a reminder that strong marriages are built with intention. When couples prepare honestly and prayerfully, they are better equipped to create a relationship marked by grace, trust, and enduring commitment.
        </Text>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages} | Prepared by Henry Ugochukwu`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
