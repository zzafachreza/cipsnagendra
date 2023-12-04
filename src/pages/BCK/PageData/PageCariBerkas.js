import { Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyInput } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native'




export default function PageCariBerkas({ navigation, route }) {

    const item = route.params;
    const [loading, setLoading] = useState(true);
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


            <View style={{
                flex: 1,
            }}>
                <WebView onLoad={() => {
                    setLoading(false)
                }} source={{ uri: 'https://sitanduk.okeadmin.com/pencarian' }} style={{ flex: 1 }} />
                {loading &&
                    <ActivityIndicator size="large" style={{ position: "absolute", top: windowHeight / 2.5, left: windowWidth / 2.25 }} color={colors.primary} />
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})