import * as React from 'react';
import RootNavigation from './src/navigations/RootNavigation';
import { Platform, StatusBar, View, StyleSheet } from 'react-native';
import { colors } from './src/theme/colors';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/toastConfig';

const HEADER_TOP = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor={colors.transparent}
        translucent={true} 
      />
      <RootNavigation />
        <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HEADER_TOP,
    backgroundColor: colors.background,
  },
});