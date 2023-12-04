import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, Modal, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
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

import { WebView } from 'react-native-webview';

import ProgressCircle from 'react-native-progress-circle'
import { MyInput, MyButton, MyGap, MyPicker } from '../../components';
export default function Kategori({ navigation, route }) {

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({});
    const [kirim, setKirim] = useState({
        kode: '',
        fid_user: '',
    });
    const [open, setOpen] = useState(false);
    const [pengguna, setPengguna] = useState([]);

    useEffect(() => {
        __getTransaction();
    }, [])

    const [user, setUser] = useState({});
    const __getTransaction = () => {
        getData('user').then(uu => {




            axios.post(apiURL + 'arsip', {
                fid_user: uu.id
            }).then(res => {

                setData(res.data)
            })
        })
    }


    const __renderItem = ({ item }) => {
        return (

            <View style={{
                flex: 1,
                margin: 10,
                flexDirection: 'row',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black
                    }}>{item.nop}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.black
                    }}>{item.nm_wp_sppt}</Text>

                    <Text style={{

                        fontFamily: fonts.secondary[800],
                        color: colors.secondary
                    }}>Status :</Text>
                    <Text style={{
                        padding: 5,
                        marginBottom: 5,
                        backgroundColor: colors.black,
                        color: colors.white,

                    }}>  {item.status_sppt}  </Text>



                </View>
                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Text>Rp {new Intl.NumberFormat().format(item.pbb_yg_harus_dibayar_sppt)}</Text>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        textAlign: 'center',
                        fontSize: 10
                    }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')} {'\nPukul'} {item.jam} {'WIB'}</Text>

                    {/* <TouchableNativeFeedback onPress={() => navigation.navigate('Game', item)}>
                        <View style={{
                            marginTop: 10,
                            padding: 10,
                            backgroundColor: colors.secondary,
                            borderRadius: 20,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: fonts.secondary[600],
                                color: colors.white
                            }}>Lihat Detail</Text>
                        </View>
                    </TouchableNativeFeedback> */}
                </View>


            </View>

        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>


            <View style={{
                padding: 10,
                marginBottom: 10,
                backgroundColor: colors.white,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/logo.png')} style={{
                    width: windowWidth / 5,
                    resizeMode: 'contain',
                    height: 50,
                }} />

                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: 18,

                }}>Database</Text>
            </View>

            <View style={{
                flex: 1,
            }}>
                <WebView onLoad={() => {
                    setLoading(false)
                }} source={{ uri: 'https://sitanduk.okeadmin.com/draf' }} style={{ flex: 1 }} />
                {loading &&
                    <ActivityIndicator size="large" style={{ position: "absolute", top: windowHeight / 2.5, left: windowWidth / 2.25 }} color={colors.primary} />
                }
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})