import React from 'react';
import {
    View,
    TextInput,
    TextInputProps,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';

type GlobalTextInputProps = TextInputProps & {
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

const GlobalTextInput: React.FC<GlobalTextInputProps> = ({
    containerStyle,
    inputStyle,
    leftIcon,
    rightIcon,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
            <TextInput
                style={[styles.input, inputStyle]}
                placeholderTextColor={colors.gray}
                {...props}
            />
            {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray,
        width: wp(90),
        borderRadius: wp(2),
        paddingHorizontal: wp(3),
        paddingVertical: hp(1),
        backgroundColor: colors.transparent,
    },
    input: {
        flex: 1,
        fontSize: hp(1.8),
        color: colors.black,
        paddingVertical: 0,
    },
    icon: {
        marginHorizontal: wp(1.5),
    },
});

export default GlobalTextInput;
