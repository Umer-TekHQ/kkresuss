import 'react-native-reanimated';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message'; 
import { Provider } from 'react-redux';

import RootNavigator from './src/navigators/RootNavigator';
import { store } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <Toast /> 
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
