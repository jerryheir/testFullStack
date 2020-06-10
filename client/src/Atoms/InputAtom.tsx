import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { colors } from '../Styles/Colors';
import { styles } from '../Styles';

interface Props {
    onChange: ((text: string) => void) | undefined;
    value: string;
}

const InputAtom: React.FC<Props> = ({ onChange, value }) => {
    const [focus, setFocus] = useState(false);
    return (
        <View style={{}}>
            <TextInput
            placeholder={'Enter download link'}
            onChangeText={onChange}
            onFocus={()=>setFocus(true)}
            value={value}
            style={[styles.inputStyle, { borderBottomColor: focus ? colors.primary : colors.lightGray }]}
            />
        </View>
    )
}

export default InputAtom;
