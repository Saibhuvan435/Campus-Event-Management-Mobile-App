import React from 'react';
import{View,Text,StyleSheet}from 'react-native';
import{TouchableOpacity}from 'react-native-gesture-handler';

function RegistrationSuccessScreen({route,navigation}:any){

    const{event,studentName,rollNumber,email,mobile,department,year}=route.params;

    return (
        <View style={styles.container}>

            <Text style={styles.success}>
                Registration Successful!
            </Text>

            <Text style={styles.eventName}>

            {event.name}

            </Text>
             {/* <Text style={styles.eventName}>
            {event.name}
            </Text> */}

            <Text style={styles.label}>Student Name</Text>
            <Text style={styles.value}>{studentName}</Text>


            <Text style={styles.label}>Roll Number</Text>
            <Text style={styles.value}>{rollNumber}</Text>



            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
            <Text style={styles.label}>Mobile Number</Text>
            <Text style={styles.value}>{mobile}</Text>


            <Text style={styles.label}>Department</Text>
            {/* <Text style={styles.value}<{department}</Text> */}
            <Text style={styles.value}>{department}</Text>

            {/* <Text style={styles.label}>Year</Text>
            <Text style={styles.value}<{year}</Text> */}


            <Text style={styles.label}>Year</Text>
            <Text style={styles.value}>{year}</Text>

            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.popTo('Home')}
            >
                <Text style={styles.homeButtonText}>Back to Events</Text>
            </TouchableOpacity>

        </View>
    );
}



const styles=StyleSheet.create({

    container:{
        flex:1,
        // backgroundColor:'#ffffff',
        backgroundColor:'#f5f7fa',
        padding:20,
    },

    // success:{
    //     fontSize:20,
    //     fontWeight:'400',
    //     color:'#fffff',
    //     marginBottom:20,
    // },

    success:{
        fontSize:25,
        fontWeight:'700',
        color:'#2e7d32',
        marginBottom:20,
    },
    eventName:{
        fontSize:20,
        fontWeight:'600',
        color:'#4a6fa5',
        marginBottom:25,
    },



    label:{
        fontSize:14,
        color:'#666666',
        marginTop:10,
        marginBottom:3,
    },




    value:{
        fontSize:17,
        color:'#333333',
    },

    // homeButton:{
    //     backgroundColor:'#333333',
    //     padding:17,
    //     alignItems:'center',
    //     marginTop:15,
    // },
    homeButton:{
        cursor:'pointer',
        backgroundColor:'#007AFF',
        padding:12,
        borderRadius:8,
        alignItems:'center',
        marginTop:25,
    },
    homeButtonText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'600',
    },

});

export default RegistrationSuccessScreen;