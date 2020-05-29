import React from 'react';
import {HomeScreen} from './screens/HomeScreen' ;
import {Marriage} from './screens/marriage' ;
import {Settings} from './screens/Settings' ;
import { createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer } from 'react-navigation'
import Feather from 'react-native-vector-icons/Feather';


export default class Example extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    "పంచాంగం": {
      screen : HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name="home" size={25} color={tintColor} />
        )
      }
    },
    "జాతకం మ్యాచింగ్":{
      screen : Marriage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name="command" size={25} color={tintColor} />
        )
      }
    },
    
  },
  {
    initialRouteName: 'పంచాంగం'
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);