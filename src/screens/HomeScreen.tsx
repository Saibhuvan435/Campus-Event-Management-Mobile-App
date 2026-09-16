import React from 'react';
import {useState} from 'react'
import {events} from '../data/events'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import {StyleSheet,TextInput,View,Text,FlatList} from 'react-native'
// import {Button} from 'react-natve';


function HomeScreen({navigation}:any){

    const[searchText,setSearchtext]=useState('');
    const[eventList,setEventList]=useState(events);
    const[selectedCategory,setSelectedCategory]=useState('All');
    const[isSortedByDate,setIsSortedByDate]=useState(false);
        useFocusEffect(
                React.useCallback(()=>{
                        loadEvents();
                },[])
        );

const loadEvents=async ()=>{
  try {
    const data=await AsyncStorage.getItem('events');
        const storedEvents=data?JSON.parse(data):events;
        const eventOverrides=await Promise.all(
            events.map(async (event)=>[
                event.id,
                await AsyncStorage.getItem(`event_${event.id}`)
            ] as const)
        );
        const overridesById=new Map(
            eventOverrides
                .filter(([,value])=>value!==null)
                .map(([,value])=>{
                    const event=JSON.parse(value as string);
                    return[event.id,event];
                })
        );

        setEventList(storedEvents.map((event:any)=>
            overridesById.get(event.id)??event
        ));
  } catch (error) {
    console.log('Error loading events:',error);
  }
};
    const categories=['All','Club','Seminar','Sports','Competition','Workshop','Cultural',]

    //
    const filteredEvents=eventList.filter((e)=>{
        const matchesSearch= e.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory=e.category===selectedCategory||selectedCategory==="All"
        return matchesCategory&&matchesSearch;
    });
    const displayedEvents=isSortedByDate
        ?[...filteredEvents].sort((firstEvent,secondEvent)=>
            parseEventDate(firstEvent.date)-parseEventDate(secondEvent.date)
        )
        : filteredEvents;

    

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Campus events</Text>
            <TextInput
                placeholder="Search events..."
                value={searchText}
                onChangeText={setSearchtext}
                style={styles.searchBox}
            />

            <View style={styles.categoryContainer}>
                {categories.map((category)=>(
            <TouchableOpacity
                key={category}
                style={[
                            styles.categoryButton,
                            selectedCategory===category &&
                                styles.selectedCategory
                        ]}
                        onPress={()=>setSelectedCategory(category)}
                    >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory===category &&
                                            styles.selectedCategoryText
                                    ]}
                                >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
    style={styles.myRegistrationsButton}
    onPress={()=>navigation.navigate('My Registrations')}
>
    <Text style={styles.myRegistrationsButtonText}>
        My Registrations
    </Text>
</TouchableOpacity>

            <TouchableOpacity
                style={styles.sortButton}
                onPress={()=> setIsSortedByDate((currentValue)=> !currentValue)}
            >
                <Text style={styles.sortButtonText}>
                    {isSortedByDate ?'Reset event order' : 'Sort by date'}
                </Text>
            </TouchableOpacity>

            <FlatList
    data={displayedEvents}
            keyExtractor={(item)=>item.id}
            renderItem={({ item })=>(
        <View style={styles.eventCard}>
            <Text style={styles.eventName}>
                {item.name}
            </Text>
            <Text style={styles.description}>
                {item.description}
            </Text>
            <Text style={styles.info}>
                Date:{item.date}
            </Text>
            <Text style={styles.info}>
                Time:{item.time}
            </Text>
            <Text style={styles.info}>
                Venue:{item.venue}
            </Text>
            <Text style={styles.info}>
                Category:{item.category}
            </Text>
            <Text style={styles.seats}>
                Available Seats:{item.availableSeats}
            </Text>
            <TouchableOpacity
    style={styles.detailsButton}
    onPress={()=>navigation.navigate('EventDetails',{event:item})}
>
    <Text style={styles.detailsButtonText}>
        View Details
    </Text>
</TouchableOpacity>
        </View>
    )}
/>

        </View>
    )
}

function parseEventDate(date:string) {
    const [day,month,year]=date.split('-').map(Number);
    return new Date(year,month-1,day).getTime();
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f7fa',
        padding:20,
    },

    title:{
        fontSize:26,
        fontWeight:'bold',
        color:'#333333',
        marginBottom:15,
    },
    searchBox:{
    backgroundColor:'#ffffff',
    borderWidth:1,
    borderColor:'#dddddd',
    borderRadius:8,
    padding:10,
    marginBottom:15,
    fontSize:16,
},
    detailsButton:{
        cursor:'pointer',
        marginTop:12,
        backgroundColor:'#dbeafe',
        padding:10,
        borderRadius:6,
        alignItems:'center',
    },

detailsButtonText:{
    color:'#2f5d8a',
    fontWeight:'bold',
},
categoryContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom:15,
},

    categoryButton:{
        cursor:'pointer',
        backgroundColor:'#ffffff',
        borderWidth:1,
        borderColor:'#cccccc',
        paddingVertical:8,
        paddingHorizontal:12,
        borderRadius:6,
        marginRight:8,
        marginBottom:8,
    },
myRegistrationsButton:{
    cursor:'pointer',
    backgroundColor:'#007AFF',
    padding:12,
    borderRadius:8,
    alignItems:'center',
    marginBottom:15,
},

        myRegistrationsButtonText:{
            color:'#FFFFFF',
            fontSize:16,
            fontWeight:'600',
        },

sortButton:{
    cursor:'pointer',
    backgroundColor:'#ffffff',
    borderWidth:1,
    borderColor:'#4a6fa5',
    padding:12,
    borderRadius:8,
    alignItems:'center',
    marginBottom:15,
},

sortButtonText:{
    color:'#2f5d8a',
    fontSize:16,
    fontWeight:'600',
},

selectedCategory:{
    backgroundColor:'#dbeafe',
    borderColor:'#4a6fa5',
},

categoryText:{
    color:'#444444',
},

selectedCategoryText:{
    color:'#2f5d8a',
    fontWeight:'bold',
},
    eventCard:{
        backgroundColor:'#ffffff',
        padding:15,
        marginBottom:12,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#dddddd',
    },

eventName:{
    fontSize:19,
    fontWeight:'bold',
    color:'#333333',
    marginBottom:8,
},

description:{
    fontSize:14,
    color:'#666666',
    marginBottom:10,
},

    info:{
        fontSize:14,
        color:'#444444',
        marginBottom:4,
    },

    seats:{
        fontSize:14,
        fontWeight:'bold',
        color:'#4a6fa5',
        marginTop:5,
    },
});

export default HomeScreen;