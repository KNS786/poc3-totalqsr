import * as React from 'react';
import {useState,useEffect} from 'react';

import {View,Text} from 'react-native';


//DropDown Component for select store
//import {DropDown} from '../../components/DropDownBar'
import DropDown from '../../UI/DropDown';
import Map from '../../UI/Map';

const HomeScreen = ({navigation}) =>{

    return(
        <>
        <DropDown/>
        <Map/>
        </>
    )
}

export default HomeScreen;