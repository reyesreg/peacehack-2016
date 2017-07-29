import React, { Component } from 'react';
import {
    ListView,
    View,
    Text } from 'react-native';
import firebase from 'firebase';
import { Header } from '../Common';
import styles from '../../Styles/DrawerStyle';

var _navigate;

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        _navigate = this.props.navigate;
    }
    componentWillMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['Home','Profile', 'About', 'Settings'])
        });
    }
    _renderMenuItem(item) {
        return (
            <Text style={styles.menuItem} onPress={() => this._onItemSelect(item) }>{item}</Text>
        );
    }
    _onItemSelect(item) {
        _navigate(item);
    }

    render() {
        return (
            <View>
                <Header headerText="Welcome, Reg!"/>
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderMenuItem(item) }
                    />
                <Text 
                    style={stylez.logoutBtn}
                    onPress={this.logoutUser.bind(this)}>Logout</Text>
            </View>
        );
    }
    logoutUser(){
       firebase.auth().signOut()
    }
}
const stylez ={
    logoutBtn: { 
        marginTop: 50
    }
}

export { Menu };
