import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';

const Card = (props) => {
    const { containerStyle } = styles;
    return (
        <TouchableOpacity>
            <View style={containerStyle}>
                <View style={{ flexDirection: 'row', flex: 0 }}>
                    <View style={{ flexDirection: 'column', flex: 0.3, paddingLeft: 20, paddingRight: 10, paddingTop: 10 }}>
                        <TouchableOpacity>
                            <Icon2 name="md-arrow-dropup" size={20} color="#263238" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon2 name="md-arrow-dropdown" size={20} color="#263238" />
                        </TouchableOpacity>
                    </View>
                    {props.children}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    containerStyle: {
        backgroundColor: '#fff',
        marginTop: 10,
        flexDirection: 'column',
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    }
}

export { Card };