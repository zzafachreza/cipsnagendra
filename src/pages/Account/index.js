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

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



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
            backgroundColor: '#F4F6FF'
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
                            <MyList label="Username" value={user.username} />
                            <MyList label="Nama Lengkap" value={user.nama_lengkap} />
                            <MyList label="Nomor Telepon" value={user.telepon} />


                        </View>
                        {/* data detail */}
                    </View>
                </>
            }
            <View style={{
                padding: 20,
                flexDirection: 'row',
            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 5
                }}>
                    <MyButton onPress={() => {
                        navigation.navigate('AccountEdit', user)
                    }} warna={colors.primary} title="Edit Profile" Icons="create" iconColor={colors.white} colorText={colors.white} />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5
                }}>
                    <MyButton onPress={btnKeluar} warna={colors.black} title="Keluar" Icons="log-out" iconColor={colors.white} colorText={colors.white} />
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
