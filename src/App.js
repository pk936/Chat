import React from 'react';
import { StyleSheet} from 'react-native';
import { Root, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import SignIn from "./components/auth/signInForm";
import Expo from "expo";
import {Provider} from 'react-redux';
import store from './store';
import SignInContainer from "./components/auth/signInContainer";
import MainNavigator from './screens/mainNavigator';

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state={bar:0, loading:true}
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({loading:false});
    }

  render() {
      if(this.state.loading){
          return <Expo.AppLoading />;
      }

    return (
      <Provider store={store}>
            {/* Root is needed otherwise ActionSheet, Toast etc won't work . */}
            <Root>
                <MainNavigator/>
            </Root>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
