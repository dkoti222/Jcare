import React from 'react';
import {
    View,
    Pressable,
    StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HomeScreen from '../screens/HomeScreen';
import ComplaintList from '../screens/ComplaintList';
import ProfileScreen from '../screens/ProfileScreen';
import GlobalText from '../components/GlobalText';
import { customFonts } from '../theme/fonts';
import { colors } from '../theme/colors';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Tab = createBottomTabNavigator();

// Get label for bottom tab
const getLabelFromRoute = (routeName: string) => {
    switch (routeName) {
        case 'complaint':
            return 'Complaints';
        case 'profileEdit':
            return 'Profile';
        default:
            return '';
    }
};

// Custom Tab Bar
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                // Middle tab — Home (floating button)
                if (route.name === 'home') {
                    return (
                        <Pressable
                            key="middle-button"
                            onPress={onPress}
                            style={styles.middleButton}
                        >
                            <GlobalText
                                children="G"
                                fontSize={20}
                                fontFamily={customFonts.interBold}
                                style={{ color: colors.white }}
                            />
                        </Pressable>
                    );
                }

                const label = getLabelFromRoute(route.name);

                return (
                    <View key={route.key} style={styles.tabItemWrapper}>
                        <Pressable onPress={onPress}>
                            <GlobalText
                                children={label}
                                fontSize={18}
                                fontFamily={
                                    isFocused
                                        ? customFonts.interSemi_Bold
                                        : customFonts.interRegular
                                }
                                style={{
                                    color: isFocused ? colors.white : colors.border,
                                    textAlign: 'center',
                                }}
                            />
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
};

// Bottom Tab Navigation
export const BottomTabNavigation = () => {
    const getTabBarVisibility = (route: any) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        const hiddenRoutes = [
            'HistroyDetails',
            'ProfileEditScreen',
            'UpdatePasswordScreen',
            'Payment',
            'PaymentStatus',
            'PaymentPromoCard',
            'DoctoroProfile',
            'BookAppoinment',
        ];
        return !hiddenRoutes.includes(routeName);
    };

    return (
        <Tab.Navigator
            initialRouteName={'home'}
            screenOptions={{ headerShown: false }}
            tabBar={(props) => {
                const route = props.state.routes[props.state.index];
                return getTabBarVisibility(route) ? <CustomTabBar {...props} /> : null;
            }}
        >
            <Tab.Screen name={'complaint'} component={ComplaintList} />
            <Tab.Screen name={'home'} component={HomeScreen} />
            <Tab.Screen name={'profileEdit'} component={ProfileEditScreen} />
        </Tab.Navigator>
    );
};

// Styles
const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: wp(3),
        marginVertical: hp(2.5),
        height: hp(7),
        borderRadius: wp(4),
        alignItems: 'center',
        backgroundColor: colors.gray,
        position: 'relative',
    },
    tabItemWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleButton: {

        top: -hp(3.5),
        alignSelf: 'center',
        width: hp(7),
        height: hp(7),
        borderRadius: hp(3.5),
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
