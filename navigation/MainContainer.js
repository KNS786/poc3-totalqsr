import * as React from 'react';
import { View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens 
import HomeSreen from './screens/HomeScreen';
import PunchDetails from './screens/PunchDetails';


const homeName = 'Home';
const punchDetails = "PunchDetails"
const settings = "setting"

const Tab = createBottomTabNavigator();


const MainContainer = ()=>{
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions = {({route})=>({
                tabBarIcon:({focused,color,size})=>{
                    let iconName;
                    let routeName = route.name;
                    if(routeName === homeName){
                        iconName = focused?'home':'home-outline'
                    }
                    else if(routeName === punchDetails){
                        iconName = focused ? 'list':'list-outline'
                    }
                    else if(routeName === settings){
                        iconName = focused ? 'settings':'settings-outline';
                    }
                    return (
                        <Ionicons
                        name = {iconName}
                        size = {size}
                        color = {color}
                        />
                    )
                },
                
            })}
            
            
            // tabBarOptions ={{
            //     activeTintColor:'tomoto',
            //     inactiveTintColor:'grey',
            //     labelStyle:{paddingBottom:10,fontSize:10},
            //     style:{padding:20,height:70}
            // }}
            tabBarOptions={{
                    "tabBarActiveTintColor": "tomoto",
                    "tabBarInactiveTintColor": "grey",
                    "tabBarLabelStyle": {
                      "paddingBottom": 20,
                      "fontSize": 20
                    }
                }     
            }
            
            >
            <Tab.Screen name ={homeName} component={HomeSreen}/>
            <Tab.Screen name ={punchDetails} component={PunchDetails}/>
          
            
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer;