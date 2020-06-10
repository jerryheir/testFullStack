import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client';
import { getDownloads, addDownloads, progressOrDone } from "../Actions/mainAction";
import { RouteComponentProps } from 'react-router-dom';
import { colors } from '../Styles/Colors';
import { styles } from '../Styles';
import * as constant from "../config/GlobalConstants.json";
import InputAtom from '../Atoms/InputAtom';
import ButtonAtom from '../Atoms/ButtonAtom';
import ListAtom from '../Atoms/ListAtom';

interface Props extends RouteComponentProps{}

const Main: React.FC<Props> = ({ history }) => {
    const dispatch = useDispatch();
    const [link, setLink] = useState('');
    const [height, setHeight] = useState(Dimensions.get('window').height);
    let processingList: any = useRef(null);
    let pendingList: any = useRef(null);
    const { processing, pending, downloads, loading } = useSelector((state: any) => state.main);
    useEffect(()=>{
        dispatch(getDownloads());
        const socket = io.connect(constant.Systems.SOCKET);
        socket.on('progress', (msg) => {
            dispatch(progressOrDone(msg.id, true, msg.createdAt));
        });
        socket.on('done', (msg) => {
            dispatch(progressOrDone(msg.id, false, msg.createdAt));
        });
        Dimensions.addEventListener('change', setDimensions)
        return ()=>Dimensions.removeEventListener('change', setDimensions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const addLink = async () => {
        await dispatch(addDownloads({
            "url": link,
        }));
        setLink('');
    }
    const setDimensions = ({ window, screen }) => {
        setHeight(window.height);
    }
    const renderItem = ({ item })=>(
        <ListAtom 
        item={item}
        />
    )
    const TEXT = processing.filter((item, key)=>item.status==='in-progress').length > 0 ? 'Processing (' : 'Processed (';
    const HEIGHT = height - 315;
    return (
        <View style={styles.container}>
            {
                (loading) && 
                <View style={styles.loadingScreen}>
                    <View style={styles.innerLoadingScreen}>
                        <ActivityIndicator color={colors.primary} size={"large"} />
                    </View>
                </View>
            }
            <Image 
            source={require('../assets/logo.png')}
            style={styles.logo}
            />
            <Text style={styles.text}>Stears Movie Downloader</Text>
            <InputAtom 
            onChange={(link)=>setLink(link)}
            value={link}
            />
            <ButtonAtom text={'GO'} onPress={addLink} />
            <Text style={styles.otherText}>{'Total '+downloads.length}</Text>
            <View style={styles.mainListRowView}>
                <View>
                    <Text style={styles.otherText}>{TEXT + processing.length +')'}</Text>
                    <FlatList 
                    style={{ height: HEIGHT, width: 300 }}
                    data={processing}
                    ref={(ref)=> processingList.current = ref}
                    onContentSizeChange={()=>{
                        if (processingList.current){
                            processingList.current.scrollToEnd()
                        }
                    }}
                    renderItem={renderItem}
                    />
                </View>
                <View>
                    <Text style={styles.otherText}>{'Queued Downloads (' + pending.length +')'}</Text>
                    <FlatList 
                    style={{ height: HEIGHT, width: 300 }}
                    data={pending}
                    ref={(ref)=> pendingList.current = ref}
                    onContentSizeChange={()=>{
                        if (pendingList.current){
                            pendingList.current.scrollToEnd()
                        }
                    }}
                    renderItem={renderItem}
                    />
                </View>
            </View>
        </View>
    )
}

export default Main;
