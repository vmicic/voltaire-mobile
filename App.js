import React from 'react';
import BottomTabNavigator from './navigation/BottomTabNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <BottomTabNavigator />
  );
}
