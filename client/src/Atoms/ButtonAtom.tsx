import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../Styles';

interface Props {
    onPress: any;
    text: string;
}

const ButtonAtom: React.FC<Props> = ({ onPress, text }) => {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={styles.buttonView}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ButtonAtom;