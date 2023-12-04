import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colors, fonts, windowHeight } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'





export default function PageVerifikasiBerkas({ navigation, route }) {
    const item = route.params;
    console.log(item)
    const [open, setOpen] = useState(false)
    const [kirim, setKirim] = useState({
        nm_wp_sppt: '',
        alamat_wp: '',
        nop: '',
    });

    const [statusUpdate, setstatusUpdate] = useState('MENUNGGU');

    const updaBerkas = () => {
        axios.post(apiURL + 'update_berkas', {
            status_sppt: statusUpdate,
            id_sppt: data.id_sppt
        }).then(res => {
            setData(res.data.data);
            setOpen(true)
            showMessage({
                type: 'success',
                message: 'Status SPPT berhasil di update !'
            })


        })
    }
    const [data, setData] = useState({
        id_sppt: 0
    });


    const MYListData = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PageInformasiPersyaratanDetail', item)}>
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingVertical: 4,
                }}>

                    <Image source={{
                        uri: item.image
                    }} style={{
                        width: 100,
                        height: 100
                    }} />
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                    }}>{item.judul}</Text>

                </View>
            </TouchableWithoutFeedback>
        )
    }


    const getDataTransaksi = () => {
        axios.post(apiURL + 'informasi_persyaratan', kirim).then(res => {
            console.log(res.data);
            setData(res.data)


        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            // padding: 10,
        }}>
            <View style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.primary,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',

            }}>

                <Image source={{
                    uri: item.image
                }} style={{
                    // flex: 1,
                    width: 40,
                    height: 40,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 18,
                    color: colors.secondary,
                    textAlign: 'center'
                }}>{item.judul}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 10,
            }}>

                <FlatList data={data} renderItem={MYListData} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})