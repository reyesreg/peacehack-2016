import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import firebase from 'firebase';
import { Card, Button, CardSection, NateInput, Spinner } from '../Common';
import {Home} from './index';

class Register extends Component {
    state = {
        userEmail: '',
        userPassword: '',
        userConfirmPass: '',
        errorMsg: '',
        loading: false
    }
    render() {
        return (
            <View style={styles.tempStyle}>
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
                        value={this.state.userPassword}
                        onChangeText={userPassword => this.setState({ userPassword }) } />
                </CardSection>
                <CardSection>
                    <NateInput
                        secureTextEntry
                        placeHolder="password"
                        label="Password"
                        value={this.state.userConfirmPass}
                        onChangeText={userConfirmPass => this.setState({ userConfirmPass }) } />
                </CardSection>
                <CardSection>
                    { this.renderButton() }

                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.errorMsg}
                </Text>

            </View>
        )
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        } else {
            return (
                <Button whenPressed={this.onRegisterButtonPress.bind(this) }>
                    Sign Up!
                </Button>
            );
        }
    }
    onRegisterButtonPress() {
        const {userEmail, userPassword, userConfirmPass} = this.state;
        this.setState({ errorMsg: '', loading: true });

        if (userPassword !== userConfirmPass) {
            this.setState({
                errorMsg: 'Passwords dont match!',
                loading: false
            });
        } else {
            firebase.auth().createUserWithEmailAndPassword(userEmail, userConfirmPass).then(() => {
                alert('Your account was created!');
                this.setState({
                    userEmail: '',
                    userPassword: '',
                })
                this.props.navigator.resetTo({
                    component: Home,
                })
            }).catch((error) => {
                this.setState({
                    errorMsg: error.message,
                    loading: false
                })

            });
        }


    }


}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    tempStyle: {
        marginTop: 100
    }
};

export {Register};