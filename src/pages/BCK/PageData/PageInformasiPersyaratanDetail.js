import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
export default function PageInformasiPersyaratanDetail({ navigation, route }) {

    const item = route.params;
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
                <RenderHtml
                    contentWidth={windowWidth}
                    source={{
                        html: item.keterangan
                    }}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})