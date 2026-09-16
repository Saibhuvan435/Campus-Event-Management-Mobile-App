import React,{useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {events} from '../data/events';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';

function RegistrationScreen({ route,navigation }:any){
    const { event }=route.params;

    const [studentName,setStudentName]=useState('');
    const [rollNumber,setRollNumber]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [department,setDepartment]=useState('');
    const [year,setYear]=useState('');
    const [error,setError]=useState('');

    const handleRegister=async()=> {
    setError('');

    if(
        !studentName||!rollNumber||!email||!mobile||!department||!year){
        setError('All fields are required');
        return;
    }

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if(!emailPattern.test(email)){
    //     setError('Please enter a valid email address.');
    //     return;
    // }


    if(mobile.length!==10||isNaN(Number(mobile))){
        setError('enter a valid 10-digit number.');
        return;
    }

if(!emailPattern.test(email)){
        setError('enter a valid email address.');
        return;
    }


    if(event.availableSeats <=0){
        setError('This event is full.');
        return;
    }

    // navigation.navigate('Registration Success',{event:event,studentName:studentName,rollNumber:rollNumber,email:email,mobile:mobile,department:department,year:year,});
    const registration={event:event,studentName:studentName,rollNumber:rollNumber,email:email,mobile:mobile,department:department,year:year,registrationDate:new Date().toISOString(),status:'Registered'};
    const updatedEvent={
        ...event,
        availableSeats:event.availableSeats - 1};
try {
    const storedEvents=await AsyncStorage.getItem('events');
    const eventList=storedEvents ? JSON.parse(storedEvents):events;
    const updatedEvents=eventList.map((storedEvent:any)=>
        storedEvent.id===updatedEvent.id ? updatedEvent :storedEvent
    );
    const existingData=await AsyncStorage.getItem('registrations');
    const registrations=existingData
        ? JSON.parse(existingData)
        :[];

    const normalizedEmail=email.trim().toLowerCase();
    const alreadyRegistered=registrations.some((savedRegistration:any)=>
        savedRegistration.email?.trim().toLowerCase()===normalizedEmail &&
        savedRegistration.event?.id===event.id
    );
    if(alreadyRegistered){
        setError('You have already registered for this event with this email.');
        return;
    }
    registrations.push(registration);
    await AsyncStorage.setItem(
        'registrations',
        JSON.stringify(registrations)
    );
    await AsyncStorage.setItem(
        `event_${event.id}`,
        JSON.stringify(updatedEvent)
    );
    await AsyncStorage.setItem(
        'events',
        JSON.stringify(updatedEvents)
    );
    navigation.navigate('Registration Success',{
        ...registration,
        event:updatedEvent
    });

} catch(error){
    setError('Unable to save registration. Please try again.');
}
};

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Register for Event</Text>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.label}>Student Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={studentName}
                onChangeText={setStudentName}
            />
            {/* <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            /> */}
            <Text style={styles.label}>Roll Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter roll number"
                value={rollNumber}
                onChangeText={setRollNumber}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />


            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Department</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter department"
                value={department}
                onChangeText={setDepartment}
            />

            <Text style={styles.label}>Year</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter year"
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
            />

            {error !=='' &&(
    <Text style={styles.error}>
        {error}
    </Text>
)}

            <TouchableOpacity
    style={styles.registerButton}
    onPress={handleRegister}
>
    <Text style={styles.registerButtonText}>
        Register
    </Text>
</TouchableOpacity>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f7fa',
        padding:19,
    },

    title:{
        fontSize:26,
        fontWeight:'bold',
        color:'#333333',
        marginBottom:11,
    },
error:{
color:'#c0392b',
marginBottom:12,
fontSize:14,
},
input:{
        backgroundColor:'#ffffff',
        borderWidth:1,
        borderColor:'#dddddd',
        borderRadius:6,
        padding:10,
        fontSize:16,
        marginBottom:15,
    },

    eventName:{
        fontSize:17,
        color:'#4a6fa5',
        marginBottom:20,
    },

label:{
    fontSize:15,
    color:'#444444',
    marginBottom:5,
},

    // input:{
    //     backgroundColor:'#ffffff',
    //     borderWidth:1,
    //     borderColor:'#dddddd',
    //     borderRadius:6,
    //     padding:10,
    //     fontSize:16,
    //     marginBottom:15,
    // },

    registerButton:{
        cursor:'pointer',
        backgroundColor:'#dbeafe',
        padding:12,
        borderRadius:6,
        alignItems:'center',
        marginTop:5,
        marginBottom:25,
    },
// title:{
//     fontSize:26,
//     fontWeight:'bold',
//     color:'#333333',
//     marginBottom:11,
// },

    registerButtonText:{
        color:'#2f5d8a',
        fontWeight:'bold',
        fontSize:16,
    },
});

export default RegistrationScreen;