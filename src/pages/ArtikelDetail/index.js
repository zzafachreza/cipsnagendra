import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { colors, fonts } from '../../utils'
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
export default function ArtikelDetail({ navigation, route }) {
    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{
                    uri: item.image
                }} style={{
                    width: '100%',
                    height: 220
                }} />
                <View style={{
                    padding: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.primary,
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderBottomWidth: 3,
                        borderBottomColor: colors.secondary,
                        fontSize: 20,
                    }}>{item.judul}</Text>
                    <RenderHtml

                        source={{
                            html: item.keterangan
                        }}
                    />


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})