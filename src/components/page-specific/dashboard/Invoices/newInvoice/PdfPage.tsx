import {Document, Page, PDFViewer, Text, View} from "@react-pdf/renderer";
import {styles} from "../../../../../../styles/pdfStyling";
import React from "react";
import {numberFormat} from "../../../../../helpers";

const PdfPage = ({invoiceInfo}: any) => {

    const totalCost = invoiceInfo.item.reduce((acc: number, item: any) => {
        return acc + Number(item.amount);
    }, 0);
    const {dueDate} = invoiceInfo;

    return (
        <PDFViewer className={"pdfPage"}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.clientName}>{invoiceInfo.billTo}</Text>
                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                marginTop: 5
                            }}>
                                <Text style={styles.invoiceTitle}>Invoice from:</Text>
                                <Text style={styles.text}>{invoiceInfo.from}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                marginTop: 30
                            }}>
                                <Text style={styles.invoiceTitle}>Date:</Text>
                                <Text style={styles.text}>{new Date().toISOString().split('T')[0]}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                marginTop: 5
                            }}>
                                <Text style={styles.invoiceTitle}>Due date:</Text>
                                <Text style={styles.text}>{invoiceInfo.dueDate}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                marginTop: 5
                            }}>
                                <Text style={styles.invoiceTitle}>Invoice No:</Text>
                                <Text style={styles.text}>{invoiceInfo.invoiceNumber}</Text>
                            </View>
                        </View>
                    </View>
                        <View style={styles.colHeadings}>
                            <Text>Description</Text>
                            <Text>Total</Text>
                        </View>
                        <View style={styles.line}/>
                            <View style={styles.invoiceItems}>
                            {invoiceInfo.item.map(({description, amount}: {description: string, amount: string}, index: number) => {
                                  return (
                                    <View key={index.toString()} style={styles.invoiceItem}>
                                        <Text>{description}</Text>
                                        <Text style={styles.invoiceItem.price}>${amount}</Text>
                                  </View>
                                  )
                              })}
                            </View>
                        <View style={styles.footer}>
                            <View style={styles.footerContainer}>
                                <View style={styles.headings}>
                                       <Text style={styles.footerHeading}>Payment Info</Text>
                                       <Text style={styles.footerHeading}>Due By</Text>
                                       <Text style={styles.footerHeading}>Total</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.footerText}>Account No: asdasd234</Text>
                                    <Text style={styles.footerText}>{dueDate}</Text>
                                    <Text style={styles.footerText}>${numberFormat(totalCost, 2)}</Text>
                                </View>
                            </View>
                        </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default PdfPage;
