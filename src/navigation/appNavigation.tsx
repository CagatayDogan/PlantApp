import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';

import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type RootState = {
  onboarding: {
    isOnboardingComplete: boolean;
  };
};

const Main = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#28AF6E',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/Icon.png')}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? '#28AF6E' : '#BDBDBD',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Diagnose"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#28AF6E',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/Vector.png')}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? '#28AF6E' : '#BDBDBD',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={HomeScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
              }}>
              <Image
                source={require('../assets/ScanButton.png')}
                style={{height: 60, width: 60}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="My Garden"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#28AF6E',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/my-garden-fill.png')}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? '#28AF6E' : '#BDBDBD',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#28AF6E',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/profile.png')}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? '#28AF6E' : '#BDBDBD',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  const isOnboardingComplete: boolean = useSelector(
    (state: RootState) => state.onboarding.isOnboardingComplete,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isOnboardingComplete && (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
