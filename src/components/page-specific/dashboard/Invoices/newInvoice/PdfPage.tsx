import {Document, Page, PDFViewer, Text, View} from "@react-pdf/renderer";
import {styles} from "../../../../../../styles/pdfStyling";
import React from "react";

const PdfPage = ({invoiceInfo}: any) => {
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
                                marginTop: 15
                            }}>
                                <Text style={styles.invoiceTitle}>Date:</Text>
                                <Text style={styles.text}>{invoiceInfo.date}</Text>
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
                    <View>
                        <View style={styles.colHeadings}>
                            <Text>Description</Text>
                            <Text>Total</Text>
                        </View>
                        <View style={styles.line}/>
                        <View style={styles.colInfo}>
                            <View style={styles.invoiceItem}>
                                <Text>Website Design</Text>
                                <Text style={styles.invoiceItem.price}>$500.00</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default PdfPage;
