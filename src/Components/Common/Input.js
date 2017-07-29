import React from 'react';
import { TextInput, View, Text } from 'react-native';

//We can now pass in a prop of Label and that should be displayed

const NateInput = ({ label, value, onChangeText, placeHolder, secureTextEntry }) => {
        const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={ containerStyle }>
             <Text style={ labelStyle }>{ label }</Text>
             <TextInput
                //If the boolean is true, in JSX we can just type secureTextEntry
                secureTextEntry={secureTextEntry}
                placeholder={ placeHolder }
                autoCorrect={false}//Not working?
                value={value}
                onChangeText={onChangeText}
                style={ inputStyle }/>
        </View>
    );
}

const styles = {
        inputStyle: {
            color: '#000',
            paddingRight: 5,
            paddingLeft: 5,
            fontSize: 14,
            //How much space inbetween each line of text (leave bit bigger than fontSize)
            lineHeight: 23,
            flex: 2
        },
        labelStyle: {
            fontSize: 14,
            paddingLeft: 20,
            flex: 1
        },
        containerStyle: {
            height: 40,
            flex: 1,
            flexDirection: 'row',
            //Ensure items are aligned vertically
            alignItems: 'center'
        }
    }

export { NateInput }