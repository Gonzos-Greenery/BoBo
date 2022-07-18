import { NativeBaseProvider, extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#FFFFFF',
      100: '#EFEECE',
      200: '#CEE9C5',
      300: '#E1E9C5',
      400: '#E5E4A1',
      500: '#A4C69C',
      600: '#86A17F',
      700: '#8A9D8C',
      800: '#848B82',
      900: '#404746',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  components: {
    Button: {
      defaultProps: {
        color: '#404746',
        height: 55,
        borderRadius: 10,
        backgroundColor: '#d5e7d0',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
      },
    },
  },
  fontConfig: {
    Lato: {
      100: { normal: 'Lato' },
      200: { normal: 'Lato' },
      300: { normal: 'Lato' },
      400: { normal: 'Lato' },
    },
  },
  fonts: { heading: 'Lato', body: 'Lato', mono: 'Lato' },
  
});

export default theme;
