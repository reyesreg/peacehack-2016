import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

const Button = ( {whenPressed, children}) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={whenPressed}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: "600",
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#11abfe',
        borderColor: '#007AFF',
        margin: 5,
        minWidth: 190
    }
}

//export default Button;
export { Button};
//same as export { Button : Button}
//Key value pair export and object with a Key of Button and a a Value of the Component Button
//Sice key and Value are the same we can use ES6 as amove