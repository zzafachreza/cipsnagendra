import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
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
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import ZavalabsScanner from 'react-native-zavalabs-scanner'
import { showMessage } from 'react-native-flash-message';
import GetLocation from 'react-native-get-location'
import { getDistance, convertDistance } from 'geolib';


export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});
  const [lokasi, setLokasi] = useState({
    latitude: 0,
    longitude: 0,
  })

  const _getTransaction = async () => {

    getData('user').then(u => {
      setUser(u);
    })

    axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

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


  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flexDirection: 'row',
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          margin: 5,
          height: windowHeight / 8,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            flex: 0.35,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }} />
          <Text style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            fontSize: 18,
            color: colors.secondary,
            // textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.primary,
      position: 'relative'
    }}>






      <View style={{
        paddingHorizontal: 10,
        backgroundColor: colors.primary
      }}>

        <View style={{
          padding: 10,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>

            <View style={{
              flex: 1,
            }}>
              <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: 15,
                color: colors.white
              }}>Selamat datang,  </Text>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                color: colors.white
              }}>{user.nama_lengkap}</Text>
              <Text style={{
                fontFamily: fonts.secondary[800],
                color: colors.white,
                fontSize: 16,
              }}>CIPS NAGENDRA</Text>
            </View>
            <Image source={require('../../assets/logo.png')} style={{
              width: 80,
              resizeMode: 'contain',
              height: 80,
            }} />
          </View>


        </View>
      </View>
      <MyCarouser />
      <View style={{
        flex: 1,
        padding: 10,
        justifyContent: 'space-evenly'
      }}>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Absen', user)}>
          <View style={{
            height: windowHeight / 6,
            borderBottomWidth: 5,
            borderBottomColor: colors.white,

            backgroundColor: colors.secondary,
            padding: 20,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' name='map' color={colors.white} size={30} />
            <Text style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: fonts.secondary[800],
              color: colors.white,
              fontSize: 22,
            }}>Absensi</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => {
          ZavalabsScanner.showBarcodeReader(result => {


            if (result !== null) {
              axios.post(apiURL + 'cek_scan', {
                barcode: result,
                fid_user: user.id
              }).then(res => {
                console.log(res.data);

                if (res.data.status == 404) {
                  showMessage({
                    type: 'danger',
                    message: res.data.message
                  })
                } else if (res.data.status == 200) {

                  let resUser = JSON.parse(res.data.data);


                  const ProsesJarak = getDistance(
                    { latitude: parseFloat(resUser.latitude), longitude: parseFloat(resUser.longitude) },
                    { latitude: lokasi.latitude, longitude: lokasi.longitude },
                    1,
                  );
                  console.log(ProsesJarak);
                  if (ProsesJarak > 50) {
                    showMessage({
                      type: 'danger',
                      message: `Anda tidak berada di lokasi patroli, saat ini Anda berada ${ProsesJarak} meter dari posisi lokasi`
                    })
                  } else {
                    axios.post(apiURL + 'scan_add', {
                      barcode: result,
                      fid_user: user.id,
                      jarak: ProsesJarak
                    }).then(res => {
                      navigation.navigate('ScanBerhasil', {
                        fid_user: user.id,
                        barcode: result,
                        jarak: ProsesJarak
                      });
                      showMessage({
                        type: 'success',
                        message: res.data.message
                      })
                    })
                  }

                }
              })
            }

          });
        }}>
          <View style={{
            height: windowHeight / 6,
            backgroundColor: colors.secondary,
            borderBottomWidth: 5,
            borderBottomColor: colors.white,
            padding: 20,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' name='location' color={colors.white} size={30} />
            <Text style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: fonts.secondary[800],
              color: colors.white,
              fontSize: 22,
            }}>Checkpoint Patroli</Text>
          </View>
        </TouchableWithoutFeedback>


      </View>
      {/* navigation bottom */}
      <View style={{
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: colors.secondary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home' color={colors.white} size={20} />
        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='person' color={colors.white} size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})