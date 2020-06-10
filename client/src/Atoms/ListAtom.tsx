import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteDownloads } from "../Actions/mainAction";
import { styles } from '../Styles';
import { colors } from '../Styles/Colors';

interface Props {
    item: any;
}

const ListAtom: React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch();
    const deleteLink = () => {
        dispatch(deleteDownloads(item.id));
    }
    return (
        <View style={[styles.listContainer, { 
            borderColor: (item.status === 'in-progress') ? colors.primary
             : (item.status === 'done') ? colors.green : colors.lightGray 
        }]}>
            <View style={styles.rowSpaceBetween}>
                <Text style={styles.listText}>{moment(item.createdAt).format('Do MMM, hh:mm A')}</Text>
                {
                    (item.status === 'in-progress') &&
                    <ActivityIndicator color={colors.primary} size={"small"} />
                }
                {
                    (item.status === 'done') &&
                    <TouchableOpacity onPress={deleteLink}>
                        <Image 
                        source={require('../assets/close.png')}
                        style={styles.closeIcon}
                        />
                    </TouchableOpacity>
                }
            </View>
            <Text style={styles.listText}>{item.url}</Text>
            <View style={styles.listStatusView}>
                <Text>
                    {item.status === 'done' ? 
                    'Ready!' : item.status === 'in-progress' ? 'Downloading...' : 'Queued'}
                </Text>
            </View>
        </View>
    )
}

export default ListAtom;