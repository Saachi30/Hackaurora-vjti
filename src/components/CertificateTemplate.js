// src/components/CertificateTemplate.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 40,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1a365d',
    fontWeight: 'bold',
  },
  content: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4a5568',
  },
  signature: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
    width: 200,
    textAlign: 'center',
  }
});

const CertificateTemplate = ({ certData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Certificate of Achievement</Text>
        <Text>Sustainability Excellence</Text>
      </View>
      
      <View style={styles.content}>
        <Text>This certifies that</Text>
        <Text>{certData.name}</Text>
        <Text>has successfully achieved</Text>
        <Text>{certData.title}</Text>
        <Text>with a score of {certData.score}/100</Text>
        <Text>Awarded on: {certData.awardedDate}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.signature}>
          <Text>Authorized Signature</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificateTemplate;

