import 'react-native-gesture-handler';
import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';
import defaultTheme from './styles/theme/default';
import Routes from './routes';

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent />
      <AppProvider>
        <View style={{ backgroundColor: '#312e38', flex: 1 }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  </ThemeProvider>
);

export default App;
