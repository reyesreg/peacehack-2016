import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row', flex: 1, position: 'absolute',bottom: 0, zIndex: 1
  },
  viewTabContainer: {
    flex: 1, flexDirection: 'row',
    backgroundColor: '#00A57D',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnNav: {
      padding: 10,
      flex: 1, alignItems: 'center'
  }
});