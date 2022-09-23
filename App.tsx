import * as React from 'react';
import {View,Text} from 'react-native'
import MainContainer from './navigation/MainContainer';
import forgroundService from './background-geoLocations/forgroundService';

const App = ()=>{

  const restaurants = [ 
    {
        title:'Store 1 : Quality Bakers,kochi',
        location:{latitude:10.013309,longitude:76.330606},
        description:"Stay work"
    },
    {
        title:'Store 2: Mens fashion dress shop,near bbk mark,kochi',
        location:{latitude:10.013225,longitude: 76.329297},
        description:"Stay happy to work" 
    }
  ];
  forgroundService.shopsAddress = restaurants;
  
  return (
    <MainContainer/>
  )
}

export default App;