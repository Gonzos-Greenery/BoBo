import { StyleSheet } from 'react-native';

export const PINK = '#ff5dc8';

export const screenOptions = {
  headerStyle: {
    backgroundColor: PINK,
  },
  headerTintColor: '#fff',
};

export default StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 15,
    textAlign: 'center'
  },
  subheader: {
    paddingTop: 10,
    marginTop: 5,
    width: '75%',
  },
});
