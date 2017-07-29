import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import styles from '../../Styles/SharedStyles';
import firebaseApp from '../../Helpers/FirebaseDB';
import { Card, Spinner } from '../Common';
import { StatsFeed, Home, AddIssuesPost, PostDetail, HashtagFeed } from './index';

class SolutionFeed extends Component {
   constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            newTitle: '',

        }

        this.itemsRef = firebaseApp.database().ref('issues/');
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    description: child.val().description,
                    points: child.val().points,
                    commentCount: child.val().commentCount,
                    city: child.val().location.city,
                    barangay: child.val().location.barangay,
                    img: child.val().img,
                    category: child.val().category,
                    _key: child.key
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
            <View style={styles.viewContainer}>
                <TouchableOpacity style={styles.floatingActionButton} onPress={() => this.goToAddIssuesPost() } activeOpacity={0.8}>
                    <Icon2 name="md-add" size={25} color="white" />
                </TouchableOpacity>
                <View style={styles.mainWrapper}>
                    <View style={styles.viewTabContainer}>
                        <TouchableOpacity style={styles.btnNav} onPress={ () => this.goToPostFeed() }><Icon name="home" size={30} color="#fff" style={styles.btnIcon} /><Text style={styles.btnLabel}>Home</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnNav, { backgroundColor: '#098e70' }]}><Icon name="lightbulb-outline" size={30} color="#fff" style={styles.btnIcon} /><Text style={styles.btnLabel}>Ideas</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnNav} onPress={ () => this.goToHashtagFeed() }><Icon3 name="hashtag" size={30} color="#fff" style={styles.btnIcon} /><Text style={styles.btnLabel}>Hashtag</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnNav} onPress={ () => this.goToStatsFeed() }><Icon name="star" size={30} color="#fff" style={styles.btnIcon} /><Text style={styles.btnLabel}>Stats</Text></TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {this.listviewLoader() }
                </ScrollView>
            </View>
        );
    }
    listviewLoader() {
        if (this.state.loading) {
            return (
                <View>
                    <Spinner />
                    <Text>Fetching Data..</Text>
                </View>
            );
        } else {
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) =>
                        <Card>
                            <View style={{ flex: 3 }}>
                                <Text style={[styles.titleText, { marginBottom: 8 }]} ellipsizeMode="tail" numberOfLines={2}>
                                    {data.title}
                                </Text>
                                <View style={styles.info}>
                                    <Icon2 name="ios-navigate" size={11} color="#38B69A" />
                                    <Text style={styles.infoText}>Location: {data.barangay}, {data.city}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Icon2 name="md-arrow-up" size={11} color="#38B69A" />
                                    <Text style={styles.infoText}>Points: {data.points}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Icon2 name="ios-chatboxes-outline" size={11} color="#38B69A" />
                                    <Text style={styles.infoText}>Comments: {data.commentCount}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginTop: 5, marginLeft: 5, marginRight: 5, height: 70 }}>
                                <Image style={{ height: 70, resizeMode: Image.resizeMode.cover, borderWidth: 1 }} source={{ uri: data.img }}/>
                            </View>
                        </Card>}
                    />
            );
        }
    }

    goToPostFeed() {
        this.props.navigator.resetTo({
            component: Home,
            title: 'Issues'
        });
    }

     goToAddIssuesPost() {
        this.props.navigator.push({
            component: AddIssuesPost,
            title: 'Add New Post'
        });
    }
    goToSolutionFeed() {
        this.props.navigator.resetTo({
            component: SolutionFeed,
            title: 'Solutions'
        });
    }
    goToHashtagFeed() {
        this.props.navigator.resetTo({
            component: HashtagFeed,
            title: '#HashTexts'
        });
    }
    goToStatsFeed() {
        this.props.navigator.resetTo({
            component: StatsFeed,
            title: 'Statistics'
        });
    }
    goToPostDetail(type = 'Normal', title, description, points, commentCount, city, barangay, img, category, _key, userID) {
        this.props.navigator.push({
            component: PostDetail,
            passProps: {
                title: title,
                description: description,
                points: points,
                commentCount: commentCount,
                city: city,
                barangay: barangay,
                img: img,
                category: category,
                _key: _key,
                userID: userID,
            },

            type: type,
            onPress: this.onPress,
            rightText: 'ALERT!'
        })
    }
}

export { SolutionFeed };
