import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#edeef2',
    paddingBottom: 70
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 70,
    elevation: 6,
    right: 20,
    backgroundColor:'#11ABFE',
    height: 60,
    width: 60,
    borderRadius: 30,
    zIndex: 2,
    alignItems:'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 10,
    flexDirection: 'column',
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  titleText: {
    paddingTop: 10,
    paddingRight: 10,
    color: '#000',
    fontFamily: 'museo',
    fontSize: 16
  },
  info: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: 2
  },
  infoText: {
    fontSize: 10,
    marginLeft: 5,
  },

  mainWrapper: {
    flexDirection: 'row', flex: 1, position: 'absolute',bottom: 0, zIndex: 1
  },
  viewTabContainer: {
    flex: 1, flexDirection: 'row',
    backgroundColor: '#00A57D',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnNav: {
      padding: 20,
      flex: 1, alignItems: 'center'
  },
  btnIcon: {
    marginTop: -10,
  },
  btnLabel: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold'
  }
});
