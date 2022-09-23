import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import calculateStoreDistance from './calculateStoreDistance';

// RNLocation.configure({
//     distanceFilter: 5, // Meters
//     desiredAccuracy: {
//       ios: "best",
//       android: "balancedPowerAccuracy"
//     },
//     // Android only
//     androidProvider: "auto",
//     interval: 10, // Milliseconds
//     maxWaitTime: 100, // Milliseconds
//     // iOS Only
//     activityType: "other",
//     allowsBackgroundLocationUpdates: false,
//     headingFilter: 1, // Degrees
//     headingOrientation: "portrait",
//     pausesLocationUpdatesAutomatically: false,
//     showsBackgroundLocationIndicator: false,
// })

// ReactNativeForegroundService.register();
// ReactNativeForegroundService.start({
//     id: 444,
//     title: 'totalQSR',
//     message: 'you are online!',
// });

// const getGrantedPermission = async()=>{   
//     const granted = await RNLocation.requestPermission({
//         android: {
//           detail: 'fine'
//         }
//       });
//       if (granted) {
//         console.log("PERMISSION GRANTED....");
//         const locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
//           console.log("LOCATIONS ::: ", locations[locations.length - 1]);
//           const getCurrentLocation = locations[locations.length - 1];
//           console.log("GET CURRENT LOCATIONS :: " , getCurrentLocation); 
//           //AsyncStorage.setItem("region_details_tqsr",JSON.stringify(getCurrentLocation));
//         })
//         return locationSubscription;
//     }
// }


class ForgroundService{
    constructor(){
        this.userLocations = {};
        this.shopsAddress = [];
        this.userReachedStore = false;
        this.shopCircumstancesMeters = 10;
        this.userMsg = "";
    }
    start(){
        ReactNativeForegroundService.register();
        ReactNativeForegroundService.start({
            id: 999,
            title: 'totalQSR',
            message: 'you are online!',
        });
    }
    stop(){
        ReactNativeForegroundService.stop();
    }
    async getBackgroundLocation(){

        RNLocation.configure({
            distanceFilter: 5, // Meters
            desiredAccuracy: {
              ios: "best",
              android: "balancedPowerAccuracy"
            },
            // Android only
            androidProvider: "auto",
            interval: 10, // Milliseconds
            maxWaitTime: 100, // Milliseconds
            // iOS Only
            activityType: "other",
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1, // Degrees
            headingOrientation: "portrait",
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
        })

        const granted = await RNLocation.requestPermission({
            android: {
              detail: 'fine'
            }
        });
          if (granted) {
            console.log("PERMISSION GRANTED....");
            const locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
              console.log("LOCATIONS ::: ", locations[locations.length - 1]);
              const getCurrentLocation = locations[locations.length - 1];
              this.userLocations = getCurrentLocation;
              console.log("GET CURRENT LOCATIONS :: " , getCurrentLocation); 
              //AsyncStorage.setItem("region_details_tqsr",JSON.stringify(getCurrentLocation));
            })
            return locationSubscription;
        }
    }
    startTask(){
        ReactNativeForegroundService.add_task(
            () => this.getBackgroundLocation(),
            {
                delay: 100,
                onLoop: true,
                taskId: 'taskid',
                onError: (e) => console.log(`Error logging:`, e),
            }
        );
    }
    checkUserReachedShop(){
        const distanceMeters = calculateStoreDistance(this.userLocations,this.shopsAddress);
        if( distanceMeters > shopCircumstancesMeters ){
            this.userMsg = "your outside the shop!";
            return false;
        }
        else{
            //User Has Reached shop
            this.userMsg = "your inside the shop!";
            return true;

        }

    }
    updateTask(){
        ReactNativeForegroundService.update({id:999,title:'totalQSR',message:this.userMsg});
        if(this.checkUserReachedShop()){
            this.stop();
            console.log("forground service stopped");
        }
    }

}

export default new ForgroundService();
