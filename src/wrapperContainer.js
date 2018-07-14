/**
 * Created by piyush on 7/10/18.
 */
import React from 'react';
import {View,Text} from 'native-base';
const WrapperContainer = (props) => {
    let {navigation} = props;
    navigation.navigate('SignInContainer');
    return (
        <View>
            <Text>Logging you in...</Text>
        </View>
    );
}

export default WrapperContainer;