import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    TextInput,
    ScrollView
} from 'react-native';
import styles from '../../Styles/PostDetailStyle';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { CardSection } from '../Common';

import firebaseApp from '../../Helpers/FirebaseDB';

import comments from '../../Helpers/Comments';

class HashtagDetail extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            fakeDataSource: ds.cloneWithRows(comments),
            newComment: '',
        };

        this.items = [];
        this.itemsRef = firebaseApp.database().ref('hashtag/' + this.props.hashtag + '/descriptions/');
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    message: child.val().message,
                });
            });

            this.setState({
                loading: false,
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }
    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.viewContainer}>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 0.3, paddingLeft: 10, paddingRight: 10, }}>
                                <TouchableOpacity>
                                    <Icon2 name="md-arrow-dropup" size={20} color="#263238" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon2 name="md-arrow-dropdown" size={20} color="#263238" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, marginTop: 3, flexDirection: 'column' }}>
                                <Text style={{ color: '#000', fontFamily: 'museo', fontWeight: 'bold', fontSize: 16 }}>#{this.props.hashtag}</Text>
                                <View style={styles.info}>
                                    <Icon3 name="hashtag" size={11} color="#38B69A" />
                                    <Text style={styles.infoText}>Number of Retweets: {this.props.numDesc}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data) =>
                            <View style={{padding: 10,}}>
                                    <Text>{data.message}</Text>
                            </View>
                        }/>
                    </View>

                        
                    <Text style={{ fontFamily: 'museo', fontWeight: 'bold', color: 'gray', marginLeft: 18, marginTop: 15 }}>Leave a Comment </Text>
                    <View style={{ padding: 1, margin: 18, borderWidth: 1, borderColor: '#EEEEEE', backgroundColor: '#fff' }}>
                        <TextInput multiline={true} numberOfLines={1} style={{ backgroundColor: '#fff' }} onChangeText={(text) => this.setState({ newComment: text }) } value={this.state.newComment}/>
                    </View>


                    <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: '#38B69A', padding: 10, width: 120, elevation: 2, alignSelf: 'flex-end', marginRight: 18, marginTop: -5, marginBottom: 10 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', alignSelf: 'center' }}>Add Comment</Text>
                    </TouchableOpacity>



                    <ListView
                        dataSource={this.state.fakeDataSource}
                        renderRow={(data) =>
                            <View style={styles.cardComment}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column', paddingRight: 15 }}>
                                        <TouchableOpacity>
                                            <Icon2 name="md-arrow-dropup" size={20} color="#263238" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Icon2 name="md-arrow-dropdown" size={20} color="#263238" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'column' }} >
                                        <Text style={{ fontFamily: 'museo', marginTop: 3, color: 'black', marginBottom: 5 }}>{data.user}</Text>
                                        <View style={styles.info}>
                                            <Icon2 name="md-calendar" size={11} color="#38B69A" />
                                            <Text style={styles.infoText}>Posted On: {data.date}, {data.city}</Text>
                                        </View>
                                        <View style={styles.info}>
                                            <Icon2 name="md-arrow-up" size={11} color="#38B69A" />
                                            <Text style={styles.infoText}>Points: {data.points}</Text>
                                        </View>
                                        <Text style={{ fontSize: 12, marginTop: 5 }}>{data.comment}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                        />
                </View>
            </ScrollView>
        );
    }
}

export { HashtagDetail };

