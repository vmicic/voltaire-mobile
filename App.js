import React from 'react';
import { LogBox } from 'react-native'

import Navigation from './navigation/Navigation'

export default function App() {

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  return (
    <Navigation />
  );
}
