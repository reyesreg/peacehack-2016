import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import { SolutionFeed } from '../Views/';

class BottomTabNav extends Component {
    render() {
        return (
            <View style={styles.bottomTabNavWrap}>
                <Text>Post</Text>
                <Text onPress={ () => this.goToRegister()}>Solution</Text>
                <Text>Solved</Text>
                <Text>Stats</Text>
            </View>
        );
    }
    goToRegister() {
        this.props.navigator.push({
            component: SolutionFeed
        })
    }
}

const styles = {
    bottomTabNavWrap: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}

export {BottomTabNav}