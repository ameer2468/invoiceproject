import {StyleSheet, Font} from "@react-pdf/renderer";
import { isAbsolute } from "path/posix";

Font.register({family: 'Poppins', src: '../fonts/poppins/Poppins-Bold.ttf'});

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: "relative",
        padding: "30px 80px",
        fontFamily: "Poppins"
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
    invoiceItems: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    footer: {
        width: "100vw",
        height: "270px",
        backgroundColor: "black",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
    },
    footerTotal :{
        fontSize: 20,
        color: 'white',
        textAlign: "center",
    },
    invoiceItem: {
        fontSize: 13,
        color: "#5a5a5a",
        flexDirection: "row",
        flex: '0 0 100%',
        margin: "7px 0",
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
