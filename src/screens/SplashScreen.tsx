import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Auth');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container} >
            <Image
                resizeMode='contain'
                source={require('../assets/images/Splash.png')}
                style={{ width: wp(90), height: hp(50) }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default SplashScreen;