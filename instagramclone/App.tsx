import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import colors from './src/styles/colors';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.headerBackground}
      />
      <Routes />
    </>
  );
};

export default App;
