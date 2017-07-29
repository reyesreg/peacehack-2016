import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    Navigator,
    TouchableOpacity,
    Text
} from 'react-native';
//import firebase from 'firebase';
import Drawer from 'react-native-drawer';
import firebase from 'firebase';
import SmsListener from 'react-native-android-sms-listener'
import navigationHelper from './Helpers/navHelper';
import { EventEmitter } from 'fbemitter';
import { Login, Menu } from './Components/Views';

import Icon2 from 'react-native-vector-icons/Ionicons';

let _emitter = new EventEmitter();


class App extends Component {
    state = { loggedIn: false };
    componentDidMount() {

        SmsListener.addListener(message => {
            this.addHash(message.body);
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });

            } else {
                this.setState({ loggedIn: false });

            }
        });

        var self = this;
        //Listeners to Open/Close drawers
        _emitter.addListener('openMenu', () => {
            self._drawer.open();
        });

        _emitter.addListener('back', () => {
            self._navigator.pop();
        });
    }

    addHash(text) {
        var res = text.split('.');

        var reference = firebase.database().ref('hashtag/' + res[0]);
        reference.once("value", function (snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref('hashtag/' + res[0] + '/descriptions/').push({
                    message: res[1],
                });

                var reference2 = firebase.database().ref('hashtag/' + res[0] + '/descriptions/');
                reference2.once("value", function (snapshot) {
                    var numDesc = snapshot.numChildren();
                    reference.update({numDesc: numDesc});
                    alert(numDesc);
                });
            }

            else {
                firebase.database().ref('hashtag/' + res[0] + '/descriptions/').push({
                    message: res[1]
                });
                reference.update({numDesc: '1'});
            }
        });

        
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu navigate={(route) => {
                    this._navigator.push(navigationHelper(route));
                    this._drawer.close();
                } }/>}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{
                    drawer: styles.mainDrawerStyle,
                }}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                }) }>
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FadeAndroid}
                    initialRoute={{
                        title: 'SAAN App',
                        component: Login,
                        index: 0
                    }}
                    renderScene={ this._renderScene }
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.navBarStyle}
                            navigationStyles={Navigator.NavigationBar.StylesIOS}
                            routeMapper={NavigationBarRouteMapper} />
                    }
                    />
            </Drawer>

        );
    }
    _renderScene(route, navigator) {


        let RouteComponent = route.component;
        return <RouteComponent navigator={navigator} {...route.passProps} />;
    }
}

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if (route.title !== 'Login' && route.title !== 'Registration') {
            return (
                <TouchableOpacity
                    style={styles.navBarLeftButton}
                    onPress={() => { _emitter.emit('openMenu'); } }>
                    <Icon2 name="md-menu" size={25} color="white" />
                </TouchableOpacity>);
        }
        else { return null; }
    },
    RightButton(route, navigator, index, navState) {
        if (index > 0 && route.title !== 'Home') {
            return (
                <TouchableOpacity
                    style={styles.navBarRightButton}
                    onPress={() => { if (index > 0) { navigator.pop(); } } }>
                    <Icon2 name="md-arrow-back" size={25} color="white" />
                </TouchableOpacity>);
        }
        else { return null; }
    },
    Title(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText]}>
                {route.title}
            </Text>
        );
    }
};

const styles = {
    navBarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'museo'
    },
    navBarLeftButton: {
        paddingLeft: 15,
    },
    navBarRightButton: {
        paddingRight: 15,
    },
    navBarStyle: {
        backgroundColor: '#38B69A',
        elevation: 5
    },
    mainDrawerStyle: {
        backgroundColor: '#ECEFF1'
    }
}

export default App;
