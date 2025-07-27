import React, { useState } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GlobalText from '../components/GlobalText';
import GlobalTextInput from '../components/GlobalTextInput';
import GlobalButton from '../components/GlobalButton';
import { customFonts } from '../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const LoginScreen = ({}) => {
  const navigation = useNavigation<any>();
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone Number',
        text2: 'Please enter a valid 10-digit mobile number',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    }

    // ✅ Show success toast
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: 'Login successful',
      position: 'top',
      visibilityTime: 1000,
      
    });

    // Navigate after short delay if you want
    setTimeout(() => {
      navigation.navigate('Otp',{
        phone:phone
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            paddingVertical: hp(10),
            gap: hp(4),
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            resizeMode="contain"
            source={require('../assets/images/Splash.png')}
            style={{ width: wp(60) }}
          />
          <GlobalText
            children={'Jagan Cares'}
            fontSize={32}
            fontFamily={customFonts.interRegular}
            color={'green'}
          />
          <GlobalTextInput
            placeholder="Enter 10 digit Phone number"
            keyboardType="numeric"
            maxLength={10}
            onChangeText={setPhone}
            value={phone}
          />
          <GlobalButton
            title="Proceed"
            containerStyle={{ marginTop: hp(5) }}
            onPress={handleLogin}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
