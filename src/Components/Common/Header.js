import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

export { Header }


const styles = {
    viewStyle: {
        backgroundColor: '#38B69A',
        justifyContent: 'center',
        alignItems: 'center',
        height:65,
    },
    textStyle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    }
};
