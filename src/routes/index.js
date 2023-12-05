import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Account,
  AccountEdit,
  ArtikelDetail,
  Absen,
  AbsensiBerhasil,
  ScanBerhasil,




} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />




      <Stack.Screen name="ArtikelDetail" component={ArtikelDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Absen" component={Absen} options={{ headerShown: false }} />
      <Stack.Screen name="AbsenBerhasil" component={AbsensiBerhasil} options={{ headerShown: false }} />
      <Stack.Screen name="ScanBerhasil" component={ScanBerhasil} options={{ headerShown: false }} />





      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />







      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />










      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />




    </Stack.Navigator>
  );
}
