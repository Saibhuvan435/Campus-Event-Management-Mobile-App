import React from 'react'
import{StyleSheet}from 'react-native'
import{View, Text}from 'react-native'
import{TouchableOpacity}from 'react-native-gesture-handler'

function EventDetailsScreen({route, navigation}:any){
    const{event}=route.params;
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{event.name}</Text>
            <Text style={styles.description}>
            {event.description}
            </Text>
            <Text style={styles.info}>
                Date:{event.date}
            </Text>
        <Text style={styles.info}>
            Time:{event.time}
        </Text>
            <Text style={styles.info}>
                Venue:{event.venue}
            </Text>
    <Text style={styles.info}>
        Category:{event.category}
    </Text>
            <Text style={styles.info}>
                Maximum Participants:{event.maximumParticipants}
            </Text>
            <Text style={styles.info}>
                Available Seats:{event.availableSeats}
            </Text>
            <TouchableOpacity
    style={styles.registerButton}
onPress={()=>
        navigation.navigate('Registration',{ event:event })
    }
>
    <Text style={styles.registerButtonText}>
        Register Now
    </Text>
</TouchableOpacity>
        </View>
    )
}
    
const styles=StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#f5f7fa',
            padding:19,
        },
    description:{
        fontSize:16,
        color:'#666666',
        marginBottom:15,
    },
        info:{
            fontSize:15,
            color:'#444444',
            marginBottom:8,
        },
    title:{
        fontSize:25,
        fontWeight:"700",
        color:'#333333'
    },
    registerButton:{
    cursor:'pointer',
    backgroundColor:'#007AFF',
    padding:15,
    borderRadius:8,
    alignItems:'center',
    marginTop:20,
},
// registerButton:{
//     backgroundColor:'#333333',
//     padding:20,
//     borderRadius:10,
// },
    registerButtonText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'600',
    }
})
export default EventDetailsScreen