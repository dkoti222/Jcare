// toastConfig.js
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { colors } from '../theme/colors';

const baseStyle = {
  borderLeftColor: colors.black,
  backgroundColor: colors.black,
};

const textStyle = {
  color: 'white',
  fontSize: 14,
};

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={baseStyle}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={textStyle}
      text2Style={textStyle}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={baseStyle}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={textStyle}
      text2Style={textStyle}
    />
  ),
};
