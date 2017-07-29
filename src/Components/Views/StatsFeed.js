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
import { Card, Spinner, CardSection } from '../Common';
import { SolutionFeed, HashtagFeed, Home } from './index';

class StatsFeed extends Component {
   constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
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
                        <TouchableOpacity style={styles.btnNav}><Icon3 name="hashtag" size={30} color="#fff" style={styles.btnIcon} /><Text style={styles.btnLabel}>Hashtag</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btnNav, { backgroundColor: '#098e70' }]}><Icon name="star" size={30} color="#fff" style={styles.btnIcon} /><Text style={styles.btnLabel}>Stats</Text></TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {this.listviewLoader() }
                </ScrollView>
            </View>
        );
    }
    listviewLoader() {
    
            return (
                <Card>
                    <CardSection>
                        <Text>Statistic</Text>
                    </CardSection>
                </Card>
            );
        
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
    goToHashtagFeed() {
        this.props.navigator.resetTo({
            component: HashtagFeed,
            title: '#HashTexts'
        });
    }
}

export { StatsFeed };
