// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import { BottomTabNavigation } from './TabNavigation';
import AuthStack from './AuthStack';


const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator  initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        </Stack.Navigator>
    );
}

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
}