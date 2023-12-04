import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { colors, fonts, windowHeight } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'



const MYListData = ({ item }) => {
    return (
        <View style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingVertical: 4,
        }}>




            <View style={{
                flex: 1,
            }}>
                <Text style={{

                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>{item.judul}</Text>
                <Text style={{

                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>{item.keterangan}</Text>
            </View>

            <View style={{
                flex: 0.4,
            }}>
                <MyButton warna={colors.danger} title="Lihat File" onPress={() => {
                    Linking.openURL(item.pdf)
                }} />
            </View>


        </View >
    )
}

export default function PageDasarHukum({ navigation, route }) {
    const item = route.params;
    console.log(item)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([]);

    const [statusUpdate, setstatusUpdate] = useState('MENUNGGU');



    const getDataTransaksi = () => {
        axios.post(apiURL + 'get_hukum').then(res => {
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