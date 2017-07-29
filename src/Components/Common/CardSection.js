import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    const {containerStyle} = styles;
    return(
        <View style={containerStyle}>
            {props.children}
        </View>
    );
};

export default CardSection;

const styles = {
    containerStyle: {
        padding: 5,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }
}

export { CardSection };