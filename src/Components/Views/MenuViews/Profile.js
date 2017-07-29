import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import { Card } from '../../Common';
import firebaseApp from 'firebase';

class Profile extends Component {
  
    componentWillMount() {
                var user = firebaseApp.auth().currentUser;
        var name, email, photoUrl, uid;

        if (user != null) {
           alert('Displayname' + user.displayName);
           alert('email' + user.email);
           alert('photourl' + user.photoURL);
           alert('uid:' + user.uid);
        }
    }
    render() {
        return (
            <Card>
                <Text>This is the User Profile Page</Text>
            </Card>
        );
    }
}

export { Profile };
