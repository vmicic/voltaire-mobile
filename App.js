import React from 'react';
import BottomTabNavigator from './navigation/BottomTabNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Navigation from './navigation/Navigation'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Navigation />
  );
}
