import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

//controller Auto Zoom for marked location in Map sheet
//import MapMarkerAutoZoom from './AutoMapZoom';
import forgroundService from '../background-geoLocations/forgroundService';

const myCurrentMovPos = { key:777,title:'Navani', location:{latitude:10.013352,longitude: 76.329984},description:'I am here'}
const restaurants = [ 
    {
        title:'Store 1 : Quality Bakers,kochi',
        location:{laitude:10.013309,longitude:76.330606},
        description:"Stay work"
    },
    {
        title:'Store 2: Mens fashion dress shop,near bbk mark,kochi',
        location:{latitude:10.013225,longitude: 76.329297},
        description:"Stay happy to work" 
    }
];

const Map = ()=>{
    const coords = {latitude:10.013352,longitude: 76.329984};
    const restaurants = forgroundService.shopsAddress;
    console.log("Getted Forground service address :: " , restaurants);
    return(
          <MapView style={styles.container}
            initialRegion={{
            latitude: 10.013352,
            longitude: 76.329984,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        >
       
         {
            restaurants.map((marker,index)=>(
                <Marker
                    key={(index+1)}
                    title ={marker.title}
                    coordinate ={marker.location}
                    description={marker.description}
                />
            ))
        }

         <Marker
           key = {8}
           coordinate={coords}
           title={"I am here"}
           description={"Hello,"}
         />
         </MapView>
    )

}

const styles = StyleSheet.create({
    container:{
        padding:500
    }
})

export default Map;

