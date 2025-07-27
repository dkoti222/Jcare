import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { colors } from '../theme/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import GlobalText from './GlobalText';
import { customFonts } from '../theme/fonts';

type GlobalButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const GlobalButton: React.FC<GlobalButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, containerStyle]}
      onPress={onPress}
    >
      <GlobalText style={[styles.buttonText, textStyle]}>
        {title}
      </GlobalText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.black,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderRadius: wp(2.5),
    alignItems: 'center',
    width: wp(90),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: hp(1.8),
    fontFamily:customFonts.interSemi_Bold,
  },
});

export default GlobalButton;
