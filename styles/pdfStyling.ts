import {StyleSheet, Font} from "@react-pdf/renderer";

Font.register({family: 'Poppins', src: '../fonts/poppins/Poppins-Bold.ttf'});

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: "30px 80px",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    clientName: {
      fontSize: 20,
      color: 'black',
      fontFamily: 'Poppins',
      fontWeight: 'bold',
    },
    invoiceTitle: {
        fontSize: 12,
        color: "#6f6f6f",
        fontFamily: 'Poppins',
    },
    invoiceItem: {
        fontSize: 13,
        color: "#5a5a5a",
        flexDirection: "row",
        width: '100%',
        margin: "10px 0",
        justifyContent: "space-between",
        price: {
            color: '#6281ff',
        }
    },
    colInfo: {
      flexDirection: "row",
    },
    colHeadings: {
       marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 10.5,
        textTransform: 'uppercase',
        color: "#6f6f6f",
    },
    text: {
      fontSize: 12,
      color: 'black',
      marginLeft: '5px',
    },
    line: {
        width: '100%',
        height: 0.5,
        margin: '10px 0',
        backgroundColor: '#6f6f6f',
    }
});
