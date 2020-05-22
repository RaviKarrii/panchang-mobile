import React from 'react';
import {HomeScreen} from './screens/HomeScreen' ;
import {marriage} from './screens/marriage' ;
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
    Home: {
      screen : HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name="home" size={25} color={tintColor} />
        )
      }
    },
    గుణమేళనం:{
      screen : marriage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name="command" size={25} color={tintColor} />
        )
      }
    },
    Settings:{
      screen : Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name="settings" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);