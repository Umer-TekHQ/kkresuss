import 'react-native-reanimated';
import React, { useRef } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './src/navigators/RootNavigator';
import {StatusBar, View, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store';
import './src/i18n/i18n';
import {PostHogProvider} from 'posthog-react-native';
import { ScreenTrackingWrapper } from './src/components/ScreenTrackingWrapper';
import { posthog } from './src/utils/posthogClient';


export const navigationRef = createNavigationContainerRef();


const App = () => {
  const routeNameRef = useRef<string>();
  return (
    <Provider store={store}>
        <GestureHandlerRootView>
          <View style={styles.container}>
              <PostHogProvider
               client={posthog}
                autocapture={{
                captureScreens: false,
                captureTouches: true,
              }}
               >
              {/* apiKey="phc_OlIt0hcMMBiyUUEmefyFySOFNiTFLS1hcHxheyWQG4F"
              options={{
                host: 'https://us.i.posthog.com',
                enableSessionReplay: true,
              }}
              autocapture={{
                captureScreens: false,
                captureTouches: true,
              }}
                > 
                */}

                                {/* <NavigationContainer ref={navigationRef}>
                                  <ScreenTrackingWrapper>
                                  <RootNavigator />
                                  </ScreenTrackingWrapper>
                                </NavigationContainer> */}
             <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                routeNameRef.current = navigationRef.getCurrentRoute()?.name;
              }}
              onStateChange={() => {
                const prevRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.getCurrentRoute()?.name;

               if (currentRouteName && prevRouteName !== currentRouteName) {
                posthog.capture('$screen', {
                  screen_name: currentRouteName,
                });
              }

                routeNameRef.current = currentRouteName;
              }}
            >
              <RootNavigator />
            </NavigationContainer>
             </PostHogProvider>
          </View>
        </GestureHandlerRootView>
 
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#111',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default App;
