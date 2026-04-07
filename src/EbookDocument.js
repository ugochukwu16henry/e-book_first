import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 58,
    paddingHorizontal: 52,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    fontSize: 11,
    lineHeight: 1.6,
  },
  coverPage: {
    paddingTop: 60,
    paddingBottom: 58,
    paddingHorizontal: 52,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
  },
  badge: {
    fontSize: 10,
    color: '#2E3A8C',
    letterSpacing: 1,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: '#2E3A8C',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 18,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#2E3A8C',
    marginBottom: 18,
  },
  chapterTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2E3A8C',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 11,
    lineHeight: 1.7,
    textAlign: 'justify',
    color: '#374151',
  },
  introBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 52,
    right: 52,
    fontSize: 9,
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
        <Text style={styles.badge}>PREMARITAL EBOOK</Text>
        <Text style={styles.header}>{data?.title || 'The Premarital Readiness Blueprint'}</Text>
        <Text style={styles.subtitle}>
          {data?.subtitle || 'A practical guide for couples preparing for a strong, faith-centered future.'}
        </Text>
        <View style={styles.border} />

        <View style={styles.introBox}>
          <Text style={styles.body}>
            {data?.intro ||
              'This eBook is designed to help couples build a thoughtful foundation for a healthy, lasting marriage.'}
          </Text>
        </View>

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
          <Text style={styles.chapterTitle}>{chapter.title || `Chapter ${index + 1}`}</Text>
          <View style={styles.border} />
          <Text style={styles.body}>{chapter.content || 'Content goes here...'}</Text>

          <Text
            style={styles.footer}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages} | Prepared by Henry Ugochukwu`
            }
            fixed
          />
        </Page>
      ))}
    </Document>
  );
};
