import React, { Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import firebase from 'firebase';
import { Card, Button, CardSection, NateInput, Spinner } from '../Common';
import { Home, Register } from './index';

class Login extends Component {
    state = {
        userEmail: '',
        userPassword: '',
        errorMsg: '',
        loading: false
    }
    render() {
        return (
            <View style={styles.tempStyle}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Image source={require('../../Images/saan-logo-colored.png')} style={{height: 170, width: 170}}/>
                    <Text style={{fontFamily: 'museo', fontWeight:'bold', fontSize: 18, marginTop: 20}}>Social Action Advocacy Network</Text>
                </View>
                <View style={styles.card}>
                    <CardSection>
                        <NateInput
                            placeHolder="example@gmail.com"
                            label="Email"
                            value={this.state.userEmail}
                            onChangeText={userEmail => this.setState({ userEmail }) } />
                    </CardSection>
                    <CardSection>
                        <NateInput
                            secureTextEntry
                            placeHolder="password"
                            label="Password"
                            value={this.state.password}
                            onChangeText={userPassword => this.setState({ userPassword }) } />
                    </CardSection>
                    <CardSection>
                    {this.renderButton() }
                </CardSection>
                </View>
                <View style={{margin: 20}}>
                    <Text style={styles.errorTextStyle}>
                        {this.state.errorMsg}
                    </Text>
                </View>
            </View>
        );
    }
    onLoginButtonPress() {
        const {userEmail, userPassword} = this.state;
        this.setState({ errorMsg: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then(this.onLoginSuccess.bind(this))
            .catch((error) => {
                this.setState({
                    errorMsg: error.message,
                    loading: false
                })
            });

    }
    onLoginFail() {
        this.setState({
            errorMsg: 'Authentication failed!',
            loading: false
        });
    }
    onLoginSuccess() {
        this.setState({
            userEmail: '',
            password: '',
            loading: false,
            errorMsg: ''
        });
        this.props.navigator.push({
            component: Home,
            type: 'Normal',
            title: 'Home'
        });
    }
    onRegisterButtonPress() {
        this.props.navigator.push({
            component: Register,
            type: 'Normal',
            title: 'Registration'
        });
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        } else {
            return (
                <View style={{flex: 1, alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                    <Button whenPressed={this.onLoginButtonPress.bind(this)} style={styles.loginButton}>Login</Button>
                    <Button whenPressed={this.onRegisterButtonPress.bind(this) }>Register</Button>
                </View>



            );
        }
    }
}

const styles = {
    loginButton: {
        width: 80,
        backgroundColor: '#11abfe',
        color: '#fff'
    },
    card: {
    backgroundColor: '#fff',
    marginTop: 20,
    flexDirection: 'column',
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    elevation: 2,
    marginRight: 50,
    marginLeft: 50,
  },
    errorTextStyle: {
        fontSize: 12,
        alignSelf: 'center',
        color: 'red'
    },
    tempStyle: {
        marginTop: 100,
    },
};

export { Login };
