import * as React from 'react';
import {View,Text} from 'react-native';

const PunchDetails = ({navigation}) =>{
    return(
        <View Style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text 
            onPress = {()=>alert('this is home screen')}
            style = {{fontSize:26,fontWeight:'bold'}}
            >
                Punch Details
            </Text>
        </View>
    )
}

export default PunchDetails;