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
import { Home, SolutionFeed, StatsFeed, HashtagDetail } from './index';

class HashtagFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            newTitle: '',

        }

        this.itemsRef = firebaseApp.database().ref('hashtag/');
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    hashtag: child.key,
                    numDesc: child.val().numDesc,
                });
            });

            this.setState({
                loading: false,
                dataSource: this.state.dataSource.cloneWithRows(items),
                descDataSource: this.state.dataSource.cloneWithRows(items),
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
                        <TouchableOpacity style={styles.btnNav} onPress={ () => this.goToSolutionFeed() }><Icon name="lightbulb-outline" size={30} color="#fff" style={styles.btnIcon} /><Text style={styles.btnLabel}>Ideas</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnNav, { backgroundColor: '#098e70' }]}><Icon3 name="hashtag" size={30} color="#fff" style={styles.btnIcon} /><Text style={styles.btnLabel}>Hashtag</Text></TouchableOpacity>
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
                <View style={{ flex: 1, marginTop: 20, alignItems: 'center' }}>
                    <Spinner />
                    <Text>Fetching Data..</Text>
                </View>
            );
        } else {
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) =>
                        <TouchableOpacity style={styles.card} onPress={() => this.goToHashtagDetail(
                            'Normal',
                            data.hashtag,
                            data.numDesc,
                        ) }>
                            <View style={{ flexDirection: 'row', flex: 0 }}>
                                <View style={{ flexDirection: 'column', flex: 0.3, paddingLeft: 20, paddingRight: 10, paddingTop: 10 }}>
                                    <TouchableOpacity>
                                        <Icon2 name="md-arrow-dropup" size={20} color="#263238" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon2 name="md-arrow-dropdown" size={20} color="#263238" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text style={[styles.titleText, { marginBottom: 8 }]} ellipsizeMode="tail" numberOfLines={2}>
                                        #{data.hashtag}
                                    </Text>
                                    <View style={styles.info}>
                                        <Icon3 name="hashtag" size={11} color="#38B69A" />
                                        <Text style={styles.infoText}>Number of Tweets: {data.numDesc}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>}
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
    goToSolutionFeed() {
        this.props.navigator.resetTo({
            component: SolutionFeed,
            title: 'Solutions'
        });
    }
    goToStatsFeed() {
        this.props.navigator.resetTo({
            component: StatsFeed,
            title: 'Statistics'
        });
    }

    goToHashtagDetail(type = 'Normal', hashtag, numDesc) {
        this.props.navigator.push({
            component: HashtagDetail,
            title: 'Hashtag Detail',
            passProps: {
                hashtag: hashtag,
                numDesc: numDesc,
            },

            type: type,
            onPress: this.onPress,
            rightText: 'ALERT!'
        })
    }
}

export { HashtagFeed };
