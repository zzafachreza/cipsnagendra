import { Image, Linking, SafeAreaView, StyleSheet, Text, Modal, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import { Icon } from 'react-native-elements'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function PageDataFormUpload({ navigation }) {

    const [kirim, setKirim] = useState({
        keterangan: '',
        img: 'https://zavalabs.com/nogambar.jpg'
    });

    const sendServer = () => {
        axios.post(apiURL + 'upload_form', kirim).then(res => {
            console.log(res.data);
            showMessage({
                type: 'success',
                message: 'Upload formulir ' + kirim.keterangan + ' Berhasi !'
            });
            navigation.goBack();
        })
    }

    return (
        <SafeAreaView style={{
            backgroundColor: colors.white,
            flex: 1,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => {
                    launchImageLibrary({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 400,
                        maxHeight: 400
                    }, response => {
                        // console.log('All Response = ', response);

                        setKirim({
                            ...kirim,
                            img: `data:${response.type};base64, ${response.base64}`,
                        })

                    })
                }}>
                    <View style={{
                        width: windowWidth,
                        height: windowWidth,

                    }}>
                        <Image source={{
                            uri: kirim.img
                        }} style={{
                            width: windowWidth,
                            height: windowWidth,

                        }} />


                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    padding: 20,
                    flex: 1,
                }}>
                    <MyInput label="Keterangan" multiline onChangeText={x => {
                        setKirim({
                            ...kirim,
                            keterangan: x
                        })
                    }} />
                    <MyGap jarak={20} />
                    <MyButton onPress={sendServer} title="Upload Formulir" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})