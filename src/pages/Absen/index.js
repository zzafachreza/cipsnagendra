import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import { MyHeader } from '../../components';
import { launchCamera } from 'react-native-image-picker';
import GetLocation from 'react-native-get-location'
import { showMessage } from 'react-native-flash-message';

export default function Absen({ navigation, route }) {

    const [open, setOpen] = useState(false);
    const user = route.params;
    const [lokasi, setLokasi] = useState({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log(location);
                setLokasi({
                    latitude: location.latitude,
                    longitude: location.longitude
                });
                setOpen(true)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })



    }, [])



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
        }}>
            <MyHeader judul="Absensi" />

            {open && <View style={{
                flex: 1,
                justifyContent: 'space-evenly',
                padding: 20,
            }}>
                <TouchableWithoutFeedback onPress={() => {

                    Alert.alert('ABSENSI MASUK', 'Apakah sudah yakin untuk absensi masuk ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'YA',
                            onPress: () => {
                                axios.post(apiURL + 'absen_add', {
                                    fid_user: user.id,
                                    latitude: lokasi.latitude,
                                    longitude: lokasi.longitude,
                                    jenis: 'Masuk'
                                }).then(res => {
                                    console.log(res.data);
                                    if (res.data.status == 200) {
                                        navigation.replace('AbsenBerhasil', {
                                            fid_user: user.id,
                                            latitude: lokasi.latitude,
                                            longitude: lokasi.longitude,
                                            jenis: 'Masuk'
                                        });
                                        showMessage({
                                            type: 'success',
                                            message: res.data.message
                                        })
                                    } else {
                                        showMessage({
                                            type: 'danger',
                                            message: res.data.message
                                        })
                                    }
                                })
                            }
                        }
                    ])
                }}>
                    <View style={{
                        height: windowHeight / 3,
                        borderBottomWidth: 5,
                        borderBottomColor: colors.white,

                        backgroundColor: colors.secondary,
                        padding: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Icon type='ionicon' name='log-in-outline' color={colors.white} size={50} />
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[800],
                            color: colors.white,
                            fontSize: 22,
                            marginTop: 10,
                        }}>Absensi Masuk</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert('ABSENSI KELUAR', 'Apakah sudah yakin untuk absensi keluar ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'YA',
                            onPress: () => {
                                axios.post(apiURL + 'absen_add', {
                                    fid_user: user.id,
                                    latitude: lokasi.latitude,
                                    longitude: lokasi.longitude,
                                    jenis: 'Keluar'
                                }).then(res => {
                                    console.log(res.data);
                                    if (res.data.status == 200) {
                                        navigation.replace('AbsenBerhasil', {
                                            fid_user: user.id,
                                            latitude: lokasi.latitude,
                                            longitude: lokasi.longitude,
                                            jenis: 'Keluar'
                                        });
                                        showMessage({
                                            type: 'success',
                                            message: res.data.message
                                        })
                                    } else {
                                        showMessage({
                                            type: 'danger',
                                            message: res.data.message
                                        })
                                    }
                                })
                            }
                        }
                    ])
                }}>
                    <View style={{
                        height: windowHeight / 3,
                        backgroundColor: colors.black,
                        borderBottomWidth: 5,
                        borderBottomColor: colors.white,
                        padding: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Icon type='ionicon' name='log-out-outline' color={colors.white} size={50} />
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[800],
                            color: colors.white,
                            fontSize: 22,
                            marginTop: 10,
                        }}>Absensi Keluar</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>}

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.secondary} size="large" />
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 12,
                    marginTop: 10,
                    color: colors.white
                }}>Mohon tunggu, sedang mengambil titik koordinat . . .</Text>
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})