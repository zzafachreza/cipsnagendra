import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default function AbsensiBerhasil({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);
    const item = route.params;



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: '#8E99A2',
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.black,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}


            {open &&
                <>
                    <MyHeader judul="Profile" onPress={() => navigation.goBack()} />
                    <View style={{
                        backgroundColor: colors.white,
                        margin: 10,
                    }}>

                        <View style={{ padding: 10, }}>
                            <Image source={{
                                uri: user.foto_user
                            }} style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                                marginVertical: 10,
                            }} />
                            <MyList label="Jenis Absensi" value={item.jenis} />
                            <MyList label="Username" value={user.username} />
                            <MyList label="Tanggal Absen" value={moment().format('dddd, DD MMMM YYYY')} />
                            <MyList label="Jam Absen" value={moment().format('HH:mm:ss')} />
                            <MyList label="Titik Koordinat" value={item.latitude + ', ' + item.longitude} />


                        </View>
                        {/* data detail */}
                    </View>
                </>
            }
            <View style={{
                padding: 10,
                flexDirection: 'row',
            }}>
                <View style={{
                    flex: 1,

                }}>
                    <MyButton onPress={() => {
                        navigation.goBack()
                    }} warna={colors.secondary} title="OK" iconColor={colors.white} colorText={colors.white} />
                </View>

            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
