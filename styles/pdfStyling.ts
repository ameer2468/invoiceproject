import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({ family: 'Poppins', src: '../fonts/poppins/Poppins-Bold.ttf' });

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    position: 'relative',
    padding: '30px 80px',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  clientName: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  invoiceTitle: {
    fontSize: 12,
    color: '#6f6f6f',
    fontFamily: 'Poppins',
  },
  invoiceItems: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    width: '100vw',
    height: '270px',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  footerTextWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    margin: '0 auto',
    height: '100%',
  },
  footerTotal: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  invoiceItem: {
    fontSize: 13,
    color: '#5a5a5a',
    flexDirection: 'row',
    flex: '0 0 100%',
    margin: '4px 0',
    justifyContent: 'space-between',
    price: {
      color: '#6281ff',
    },
  },
  colInfo: {
    flexDirection: 'row',
  },
  colHeadings: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10.5,
    textTransform: 'uppercase',
    color: '#6f6f6f',
  },
  textWrap: {
    textAlign: 'center',
    width: 'auto',
    flex: '0 0 33%',
  },
  whiteText: {
    color: 'white',
    marginBottom: 5,
    fontSize: 11,
  },
  footerText: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    flex: '0 0 33%',
    marginTop: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  headings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: '8px',
  },
  footerHeading: {
    color: 'white',
    flex: '0 0 33%',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.5,
  },
  text: {
    fontSize: 12,
    color: 'black',
    marginLeft: '5px',
  },
  footerLine: {
    width: '100%',
    height: 0.5,
    margin: '10px 0',
    backgroundColor: '#6f6f6f',
  },
  line: {
    width: '100%',
    height: 0.5,
    margin: '10px 0',
    backgroundColor: '#6f6f6f',
  },
});
