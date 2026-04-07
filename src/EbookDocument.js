import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 60, backgroundColor: '#FFFFFF' },
  header: { fontSize: 24, marginBottom: 20, color: '#2E3A8C', fontWeight: 'bold' },
  body: { fontSize: 12, lineHeight: 1.6, textAlign: 'justify', color: '#333' },
  footer: { position: 'absolute', bottom: 30, left: 60, right: 60, fontSize: 10, textAlign: 'center', color: '#999' },
  chapterTitle: { fontSize: 18, marginTop: 25, marginBottom: 10, color: '#2E3A8C' },
  border: { borderBottom: 1, borderColor: '#2E3A8C', marginBottom: 20 }
});

export const MyEbook = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>The Premarital Readiness Blueprint</Text>
      <View style={styles.border} />
      <Text style={styles.chapterTitle}>Chapter 1: The Foundation</Text>
      <Text style={styles.body}>
        {data.chapter1Content || "Content goes here..."}
      </Text>
      <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages} | Prepared by Henry Ugochukwu`
      )} fixed />
    </Page>
  </Document>
);
