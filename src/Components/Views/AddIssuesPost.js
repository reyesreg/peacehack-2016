import React, { Component } from 'react';
import {
    View,
    TextInput,
    Picker,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import styles from '../../Styles/AddPostStyle';
import ImagePicker from 'react-native-image-picker';
import firebaseApp from '../../Helpers/FirebaseDB';

class AddIssuesPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
        newTitle: '',
        newDescription: '',
        newCategory: '',
        newCity: '',
        newLocation: '',
        newPhoto: '',
        avatarSource: null,
        };

        this.items = [];
    }

    selectPhotoTapped() {
        const options = {
            quality: 1,
            maxWidth: 70,
            maxHeight: 70,
            storageOptions: {
            skipBackup: true
        }
    };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };

                // Or:
                // if (Platform.OS === 'android') {
                //   source = {uri: response.uri, isStatic: true};
                // } else {
                //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // }

                this.setState({
                    avatarSource: source,
                    newPhoto: 'data:image/jpeg;base64,' + response.data,
                });
            }
        });
    }

    addPost() {
        if (this.state.newTitle !== '') {
            firebaseApp.database().ref('solutions/').push({
                title: this.state.newTitle,
                description: this.state.newDescription,
                category: this.state.newCategory,
                location: {
                    city: this.state.newCity,
                    barangay: this.state.newLocation
                },
                points: 0,
                commentCount: 0,
                img: this.state.newPhoto,
            });
            this.setState({
                newTitle: '',
                newDescription: '',
                newCategory: '',
                newCity: '',
                newLocation: '',
                newPhoto: ''
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <TextInput
                        style={{ height: 40, margin: 10 }}
                        placeholder="Title"
                        onChangeText={(text) => this.setState({ newTitle: text }) } value={this.state.newTitle}
                    />
                    <TextInput
                        placeholder="Description"
                        multiline = {true}
                        numberOfLines = {4}
                        style={{ maxHeight: 80, height: 40, margin: 10  }}
                        onChangeText={(text) => this.setState({ newDescription: text }) } value={this.state.newDescription}
                        />
                    <View>
                        <Picker style={{ height: 40, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10, }}
                            selectedValue={this.state.newCity}
                            onValueChange={(text) => this.setState({ newCity: text })}>
                            <Picker.Item label="Choose a City" value="category" color="gray"/>
                            <Picker.Item label="Mandaluyong" value="Mandaluyong" color="gray"/>
                            <Picker.Item label="Makati" value="Makati" color="gray"/>
                            <Picker.Item label="Paranaque" value="Paranaque" color="gray"/>
                            <Picker.Item label="Manila" value="Manila" color="gray"/>
                        </Picker>
                    </View>
                    <TextInput
                        style={{ height: 40, margin: 10 }}
                        placeholder="Additional Location (e.g. barangay)"
                        onChangeText={(text) => this.setState({ newLocation: text }) } value={this.state.newLocation}
                    />
                    <View>
                        <Picker style={{ height: 40, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10, }}
                            selectedValue={this.state.newCategory}
                            onValueChange={(text) => this.setState({ newCategory: text })}>
                            <Picker.Item label="Choose a Category" value="category" color="gray"/>
                            <Picker.Item label="Violation of Law" value="Violation of Law" color="gray"/>
                            <Picker.Item label="Education" value="Education" color="gray"/>
                        </Picker>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this) }>
                            <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                                { this.state.avatarSource === null ? <Text style={styles.text}>Select a Photo</Text> :
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.submit} onPress={() => this.addPost() }>
                            <Text style={{color: '#fff'}}>Submit Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export { AddIssuesPost };
