import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import GlobalButton from '../components/GlobalButton';
import GlobalText from '../components/GlobalText';
import GlobalTextInput from '../components/GlobalTextInput';
import { customFonts } from '../theme/fonts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import Toast from 'react-native-toast-message';

const OtpScreen = ({ route }) => {
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      navigation.navigate('Profile');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter 6 digit OTP',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  const handleRightIconPress = () => {
    navigation.navigate('Login');
  };

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === "") {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else if (text === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ✅ Dismiss keyboard on touch outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: wp(5),
          }}
          keyboardShouldPersistTaps="handled"
        >
          <GlobalText
            children={'Jagan Cares'}
            fontSize={32}
            fontFamily={customFonts.interRegular}
            color={'green'}
          />

          <View style={{ width: '100%', marginTop: hp(4) }}>
            <GlobalTextInput
              placeholder={route.params.phone}
              keyboardType="numeric"
              containerStyle={{ paddingRight: wp(1) }}
              rightIcon={
                <TouchableOpacity onPress={handleRightIconPress}>
                  <MaterialIcons name="edit" size={wp(5)} color={colors.gray} />
                </TouchableOpacity>
              }
            />
            <GlobalText
              children={'Resend OTP'}
              fontSize={12}
              fontFamily={customFonts.interRegular}
              color={colors.gray}
              style={{ textAlign: 'right', marginVertical: hp(0.5) }}
            />
          </View>

          <View style={{ width: '100%', marginTop: hp(2) }}>
            <GlobalText
              children={'Enter 6 digit OTP'}
              fontSize={12}
              fontFamily={customFonts.interRegular}
              color={colors.gray}
              style={{ textAlign: 'left', marginBottom: hp(1) }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.gray,
                    borderRadius: wp(2),
                    width: wp(12),
                    height: wp(12),
                    textAlign: 'center',
                    fontSize: hp(2),
                    color: colors.black,
                    fontFamily: customFonts.interRegular,
                  }}
                />
              ))}
            </View>
          </View>

          <GlobalButton
            title="Verify"
            containerStyle={{ marginTop: hp(25) }}
            onPress={handleOtp}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;
