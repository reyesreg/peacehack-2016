import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import { Card } from '../../Common';


class About extends Component {
    render() {
        return (
            <Card>
                <Text>This is the About App Page</Text>
            </Card>
        );
    }
}

export { About };
