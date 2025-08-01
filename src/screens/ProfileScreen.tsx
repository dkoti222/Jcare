import { Keyboard, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import GlobalText from '../components/GlobalText';
import GlobalTextInput from '../components/GlobalTextInput';
import { customFonts } from '../theme/fonts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import GlobalButton from '../components/GlobalButton';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { supabase } from '../supabaseClient';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [panchayat, setPanchayat] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false); // loading state

  const validateInputs = () => {
    if (!name.trim() || !email.trim() || !panchayat.trim() || !pincode.trim()) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required!',
        position: 'top',
        visibilityTime: 2000,
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email format!',
        position: 'top',
        visibilityTime: 2000,
      });
      return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
      Toast.show({
        type: 'error',
        text1: 'Pincode must be 6 digits!',
        position: 'top',
        visibilityTime: 2000,
      });
      return false;
    }

    return true;
  };

  const goToHome = async () => {
    if (!validateInputs()) return;

    setLoading(true); // Start loading

    const { error } = await supabase
      .from('profiles')
      .insert([
        {
          name,
          email,
          panchayat,
          pincode,
        },
      ]);

    setLoading(false); 

    if (error) {
      console.log(error, 'kkkkk');
      Toast.show({
        type: 'error',
        text1: 'Failed to save profile!',
        text2: error.message,
        position: 'top',
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Profile saved successfully!',
      position: 'top',
      visibilityTime: 1200,
    });

    setTimeout(() => {
      navigation.navigate('BottomTab',);
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, alignItems: 'center', paddingVertical: wp(5) }}>
        <GlobalText
          children='Jagan Cares'
          fontSize={28}
          fontFamily={customFonts.interRegular}
          color='green'
          style={{ marginVertical: hp(2) }}
        />

        <View style={{ gap: hp(1), marginTop: hp(4) }}>
          <GlobalTextInput placeholder='Name' value={name} onChangeText={setName} />
          <GlobalTextInput placeholder='Email id' value={email} onChangeText={setEmail} />
          <GlobalTextInput placeholder='Panchayat' value={panchayat} onChangeText={setPanchayat} />
          <GlobalTextInput
            placeholder='Pincode'
            value={pincode}
            onChangeText={setPincode}
            keyboardType='number-pad'
          />
        </View>

        {loading ? (
          <ActivityIndicator size='large' color='green' style={{ marginTop: hp(10) }} />
        ) : (
          <GlobalButton
            title='Continue'
            containerStyle={{ marginTop: hp(15) }}
            onPress={goToHome}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;
