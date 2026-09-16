import React,{useEffect,useState}from 'react';
import{Alert,View,Text,FlatList,StyleSheet}from 'react-native';
import{TouchableOpacity}from  'react-native'; 

import AsyncStorage from '@react-native-async-storage/async-storage';
import {events} from '../data/events';

function MyRegistrationsScreen({navigation}:any){

    const [registrations,setRegistrations]=useState<any[]>([]);
    const [cancellationTarget,setCancellationTarget]=useState<string|null>(null);

    useEffect(()=>{
        loadRegistrations();
    },[]);

    const loadRegistrations=async()=>{
        try{
            const data=await AsyncStorage.getItem('registrations');


            if(data){
                setRegistrations(JSON.parse(data));
            }

        } catch(error){
            console.log('Error loading registrations:',error);
        }
    };

    const cancelRegistration=(registration:any)=>{
        setCancellationTarget(registration.registrationDate);
    };
    const removeRegistration=async(registration:any)=>{
        try{
            const storedRegistrations=await AsyncStorage.getItem('registrations');
            const currentRegistrations=storedRegistrations
                ? JSON.parse(storedRegistrations):[];
            const updatedRegistrations=currentRegistrations.filter((savedRegistration:any)=>(
                savedRegistration.registrationDate!==registration.registrationDate
            ));

            const storedEvent=await AsyncStorage.getItem(`event_${registration.event.id}`);
            const currentEvent=storedEvent
                ? JSON.parse(storedEvent)
                : registration.event;
            const currentAvailableSeats=Number(currentEvent.availableSeats);
            const maximumParticipants=Number(currentEvent.maximumParticipants);
            const updatedEvent={
                ...currentEvent,
                availableSeats:Math.min(
                    maximumParticipants,
                    currentAvailableSeats+1
                ),
            };

            const storedEvents=await AsyncStorage.getItem('events');
            const eventList=storedEvents ? JSON.parse(storedEvents):events;
            const updatedEvents=eventList.map((event:any)=>(
                event.id===updatedEvent.id ? updatedEvent : event
            ));

            await AsyncStorage.setItem('registrations',JSON.stringify(updatedRegistrations));
            await AsyncStorage.setItem(`event_${updatedEvent.id}`,JSON.stringify(updatedEvent));
            await AsyncStorage.setItem('events',JSON.stringify(updatedEvents));

            setRegistrations(updatedRegistrations);
            setCancellationTarget(null);
        }catch(error){
            Alert.alert('Cancellation failed','Unable to cancel this registration. Please try again.');
        }
    };

    const renderRegistration=({item}:any)=>{
        return(
            <View style={styles.card}>


                <Text style={styles.eventName}>
                {item.event.name}
                </Text>

            {/* <Text style={styles.info}>
                    Date:{item.event.date}
                </Text> */}
                <Text style={styles.info}>
                    Date:{item.event.date}
                </Text>


                <Text style={styles.info}>
                    Venue:{item.event.venue}
                </Text>
                <Text style={styles.info}>
                    Registration Date:{item.registrationDate}
                </Text>
                <Text style={styles.status}>
                    Status:{item.status}
                </Text>

                <TouchableOpacity
    style={styles.detailsButton}
    onPress={()=>
        navigation.navigate('EventDetails',{
            event:item.event
    })
}
>
    <Text style={styles.detailsButtonText}>
        View Details
    </Text>
</TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={()=>cancellationTarget===item.registrationDate
                        ? removeRegistration(item)
                        : cancelRegistration(item)}
                >
                    <Text style={styles.cancelButtonText}>
                        {cancellationTarget===item.registrationDate
                            ? 'Confirm Cancellation'
                            : 'Cancel Registration'}
                    </Text>
                </TouchableOpacity>

                {cancellationTarget===item.registrationDate && (
                    <TouchableOpacity
                        style={styles.keepButton}
                        onPress={()=>setCancellationTarget(null)}
                    >
                        <Text style={styles.keepButtonText}>Keep Registration</Text>
                    </TouchableOpacity>
                )}

            </View>
        );
};

    return(
        <View style={styles.container}>

            <Text style={styles.title}>
                My Registrations
            </Text>

            <FlatList
            data={registrations}
            renderItem={renderRegistration}
            keyExtractor={(item,index)=> index.toString()}
        />

        </View>
    );
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#f5f7fa',
        padding:20,
},

    title:{
        fontSize:26,
        fontWeight:'700',
        color:'#333333',
        marginBottom:20,
},

//     card:{
//         backgroundColor:'#333333',
//         padding:25,
//         borderRadius:25,
//         marginBottom:20,
// },

    eventName:{
        fontSize:19,
        fontWeight:'600',
        color:'#333333',
        marginBottom:10,
},

    info:{
        fontSize:15,
        color:'#555555',
        marginBottom:6,
},
detailsButton:{
    cursor:'pointer',
    backgroundColor:'#dbeafe',
    padding:10,
    borderRadius:6,
    alignItems:'center',
    marginTop:12,
},
card:{
        backgroundColor:'#ffffff',
        padding:15,
        borderRadius:8,
        marginBottom:15,
},

detailsButtonText:{
    color:'#2f5d8a',
    fontWeight:'600',
},
cancelButton:{
    cursor:'pointer',
    backgroundColor:'#fee2e2',
    padding:10,
    borderRadius:6,
    alignItems:'center',
    marginTop:8,
},

cancelButtonText:{
    color:'#b91c1c',
    fontWeight:'600',
},
keepButton:{
    cursor:'pointer',
    backgroundColor:'#f3f4f6',
    padding:10,
    borderRadius:6,
    alignItems:'center',
    marginTop:8,
},

keepButtonText:{
    color:'#4b5563',
    fontWeight:'600',
},
    status:{
        fontSize:15,
        fontWeight:'600',
        color:'#2e7d32',
        marginTop:5,
},

});

export default MyRegistrationsScreen;