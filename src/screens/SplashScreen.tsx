import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation<any>();

    const text = "Jagan Cares".split("");
    const opacities = useRef(text.map(() => new Animated.Value(0))).current;
    const scales = useRef(text.map(() => new Animated.Value(0.5))).current;
    const rotations = useRef(text.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const fadeIn = opacities.map((opacity, i) =>
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                delay: i * 150,
                useNativeDriver: true,
            })
        );

        const scaleUp = scales.map((scale, i) =>
            Animated.timing(scale, {
                toValue: 1,
                duration: 200,
                delay: i * 150,
                useNativeDriver: true,
            })
        );

        const pulse = scales.map((scale) =>
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ])
        );

        const fadeOut = opacities.map((opacity, i) =>
            Animated.timing(opacity, {
                toValue: 0,
                duration: 100,
                delay: (text.length - i - 1) * 100,
                useNativeDriver: true,
            })
        );

        const rotateOut = rotations.map((rotation, i) =>
            Animated.timing(rotation, {
                toValue: 15,
                duration: 100,
                delay: (text.length - i - 1) * 100,
                useNativeDriver: true,
            })
        );

        Animated.sequence([
            Animated.parallel([...fadeIn, ...scaleUp]),
            Animated.parallel(pulse),
            Animated.delay(300),
            Animated.parallel([...fadeOut, ...rotateOut]),
        ]).start(() => {
            navigation.navigate('Auth');
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                resizeMode='contain'
                source={require('../assets/images/Splash.png')}
                style={{ width: wp(50), }}
            />
            <View style={styles.textContainer}>
                {text.map((letter, index) => (
                    <Animated.View
                        key={index}
                        style={{
                            opacity: opacities[index],
                            transform: [
                                { scale: scales[index] },
                                {
                                    rotate: rotations[index].interpolate({
                                        inputRange: [0, 15],
                                        outputRange: ['0deg', '15deg'],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Text style={styles.text}>{letter}</Text>
                    </Animated.View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    textContainer: {
        flexDirection: 'row',
        // marginTop: hp(4),
    },
    text: {
        fontSize: hp(4.2),
        color: 'green',
        fontWeight: '600',
        fontFamily: 'Outfit-SemiBold', // Optional: apply your custom font here
    },
});

export default SplashScreen;
