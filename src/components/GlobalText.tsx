import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { customFonts } from '../theme/fonts';


type GlobalTextProps = TextProps & {
  children: React.ReactNode;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
};

const GlobalText: React.FC<GlobalTextProps> = ({
  children,
  color = '#000000',
  fontSize = 16,
  fontFamily = customFonts.interRegular,
  style = {},
  numberOfLines = 1,
  ...props
}) => {
  const getDynamicFontSize = (size?: number) => {
    if (!size) return wp(3); // fallback
    return wp(size / 3.8);   // responsive scaling
  };

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color,
          fontSize: getDynamicFontSize(fontSize),
          fontFamily,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default GlobalText;
