import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewContainer: {
        backgroundColor: '#edeef2',
        flexDirection: 'column',
        flex: 1
    },
    innerContainer: {
        marginTop: 83,
        backgroundColor: '#fff',
        flexDirection: 'column',
        elevation: 2,
        marginLeft: 15,
        marginRight: 15,
        padding: 15
    },
    avatarContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
    },
    avatar: {
        width: 150,
        height: 50
    },
    submit: {
        backgroundColor: '#11ABFE',
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    }
});