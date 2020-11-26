import React from 'react';

import Navigation from './navigation/Navigation'

import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios/lib/axios';

export default function App() {


  return (
    <Navigation />
  );
}
