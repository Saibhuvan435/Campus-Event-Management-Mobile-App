import React from 'react';
import HomeScreen from '../screens/HomeScreen';

import RegistrationScreen from '../screens/RegistrationScreen';
import RegistrationSuccessScreen from '../screens/RegistrationSuccessScreen';
import MyRegistrationsScreen from '../screens/MyRegistrationsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack =  createNativeStackNavigator();



function AppNavigator() {
    return (
        <Stack.Navigator


            screenOptions={{
                headerStyle:{
                    backgroundColor:'#ffffff'
                },
                headerTitleStyle:{
                    fontWeight:'600',
                    fontSize:20
                },

                headerTintColor:'#333333',

            }}
            >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{title:'Event Details'}} />
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{title:'Event Registration'}} />
            {/* <Stack.Screen name="Registration" component={RegistrationScreen} options={{title:'Event Registration'}} /> */}
            <Stack.Screen name="Registration Success" component={RegistrationSuccessScreen} options={{title:'Registration Success'}} />
            <Stack.Screen name="My Registrations" component={MyRegistrationsScreen} options={{title:'My Registrations'}} />
            {/* <Stack.Screen name="My Registrations" component={MyRegistrationsScreen} options={{title:'My Registrations'}} /> */}
        </Stack.Navigator>

        
    );
}

export default AppNavigator;