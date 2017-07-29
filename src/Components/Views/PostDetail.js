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

import firebaseApp from '../../Helpers/FirebaseDB';

import comments from '../../Helpers/Comments';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(comments),
      newComment: '',
    };

    this.items = [];
  }

  render() {
    return (
        <ScrollView>
            <View style={styles.viewContainer}>
                    <View style={styles.card}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{ flexDirection: 'column', flex: 0.3, paddingLeft: 10, paddingRight: 10, }}>
                            <TouchableOpacity>
                                <Icon2 name="md-arrow-dropup" size={20} color="#263238" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon2 name="md-arrow-dropdown" size={20} color="#263238" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3, marginTop: 3, flexDirection: 'column'}}>
                        <Text style={{color: '#000', fontFamily: 'museo', fontWeight: 'bold', fontSize: 16}}>{this.props.title}</Text>
                        <Text style={{fontSize: 12, marginTop: 5, marginBottom: 10, marginRight: 10}}>{this.props.description}</Text>
                        <View style={styles.info}>
                            <Icon2 name="ios-navigate" size={11} color="#38B69A" />
                            <Text style={styles.infoText}>Location: {this.props.barangay}, {this.props.city}</Text>
                        </View>
                        <View style={styles.info}>
                            <Icon2 name="md-arrow-up" size={11} color="#38B69A" />
                            <Text style={styles.infoText}>Points: {this.props.points}</Text>
                        </View>
                        <View style={styles.info}>
                            <Icon2 name="ios-chatboxes-outline" size={11} color="#38B69A" />
                            <Text style={styles.infoText}>Comments: {this.props.commentCount}</Text>
                        </View>
                        <View style={styles.info}>
                            <Icon2 name="ios-star" size={11} color="#38B69A" />
                            <Text style={styles.infoText}>Category: {this.props.category}</Text>
                        </View>
                        </View>
                        <View style={{ width: 70, height: 70 }}>
                        <Image style={{ width: 70, height: 70, resizeMode: Image.resizeMode.contain, borderWidth: 1, }} source={{ uri: this.props.img }}/>
                        </View>
                    </View>
                </View>
                <Text style={{fontFamily: 'museo', fontWeight: 'bold', color: 'gray', marginLeft: 18, marginTop: 15}}>Leave a Comment </Text>
                <View style={{padding: 1, margin: 18, borderWidth: 1, borderColor: '#EEEEEE', backgroundColor: '#fff'}}>
                    <TextInput multiline={true} numberOfLines={1} style={{backgroundColor: '#fff'}} onChangeText={(text) => this.setState({ newComment: text }) } value={this.state.newComment}/>
                </View>


                <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#38B69A', padding: 10, width: 120, elevation: 2, alignSelf: 'flex-end', marginRight: 18, marginTop: -5, marginBottom: 10}} onPress={() => this.addComment()}>
                    <Text style={{color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Add Comment</Text>
                </TouchableOpacity>
            

            
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) =>
                    <View style={styles.cardComment}>
                        <View style={{flexDirection: 'row'}}>
                        <View style={{ flexDirection: 'column', paddingRight: 15}}>
                            <TouchableOpacity>
                                <Icon2 name="md-arrow-dropup" size={20} color="#263238" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon2 name="md-arrow-dropdown" size={20} color="#263238" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'column'}} >
                            <Text style={{fontFamily: 'museo', marginTop: 3, color: 'black', marginBottom: 5}}>{data.user}</Text>
                            <View style={styles.info}>
                                <Icon2 name="md-calendar" size={11} color="#38B69A" />
                                <Text style={styles.infoText}>Posted On: {data.date}, {data.city}</Text>
                            </View>
                            <View style={styles.info}>
                                <Icon2 name="md-arrow-up" size={11} color="#38B69A" />
                                <Text style={styles.infoText}>Points: {data.points}</Text>
                            </View>
                            <Text style={{fontSize: 12, marginTop: 5}}>{data.comment}</Text>
                        </View>
                        </View>
                    </View>
                    }
                />
            </View>
        </ScrollView>
    );
  }

  addComment() {
    if (this.state.newComment !== '') {
            firebaseApp.database().ref('comments/').push({
                userID: 'dxQbiRnKHGVbP3Vh4kRBs9em8sd2',
                postID: this.props._key,
                comment: this.state.newComment,
                date: 'September 25, 2016',
            });
            this.setState({
                newComment: '',
            });
        }
  }
}

export { PostDetail };

