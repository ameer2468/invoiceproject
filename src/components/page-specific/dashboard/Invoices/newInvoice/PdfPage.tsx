import { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer';
import { styles } from '../../../../../../styles/pdfStyling';
import React from 'react';
import { numberFormat } from '../../../../../helpers';
import { Invoice } from '../../../../../../types/invoice';

interface props {
  invoiceInfo: Invoice;
}

const PdfPage = ({ invoiceInfo }: props) => {
  const totalCost = invoiceInfo.invoiceItems.reduce(
    (acc: number, item: any) => {
      return acc + Number(item.amount);
    },
    0
  );

  return (
    <PDFViewer className={'pdfPage'}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View>
              <Text style={styles.clientName}>{invoiceInfo.to}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 8,
                }}
              >
                <Text style={styles.invoiceTitle}>Invoice from:</Text>
                <Text style={styles.text}>{invoiceInfo.from}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 30,
                }}
              >
                <Text style={styles.invoiceTitle}>Date:</Text>
                <Text style={styles.text}>
                  {new Date().toISOString().split('T')[0]}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 5,
                }}
              >
                <Text style={styles.invoiceTitle}>Due date:</Text>
                <Text style={styles.text}>
                  {invoiceInfo.dueDate?.toISOString().split('T')[0]}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 5,
                }}
              >
                <Text style={styles.invoiceTitle}>Invoice No:</Text>
                <Text style={styles.text}>{invoiceInfo.id}</Text>
              </View>
            </View>
          </View>
          <View style={styles.colHeadings}>
            <Text>Description</Text>
            <Text>Total</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.invoiceItems}>
            {invoiceInfo.invoiceItems.map(
              ({ description, amount }, index: number) => {
                return (
                  <View key={index.toString()} style={styles.invoiceItem}>
                    <Text>{description}</Text>
                    <Text style={styles.invoiceItem.price}>${amount}</Text>
                  </View>
                );
              }
            )}
          </View>
          <View style={styles.footer}>
            <View style={styles.footerContainer}>
              <View style={styles.headings}>
                <Text style={styles.footerHeading}>Payment Info</Text>
                <Text style={styles.footerHeading}>Due By</Text>
                <Text style={styles.footerHeading}>Total</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.textWrap}>
                  <Text style={styles.whiteText}>
                    Account No:
                    {invoiceInfo.account_number
                      ? invoiceInfo.account_number
                      : 'N/A'}
                  </Text>
                  <Text style={styles.whiteText}>
                    Sort code:
                    {invoiceInfo.sort_code ? invoiceInfo.sort_code : 'N/A'}
                  </Text>
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.whiteText}>
                    {invoiceInfo.dueDate?.toISOString().split('T')[0]}
                  </Text>
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.whiteText}>
                    ${numberFormat(totalCost, 2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfPage;
