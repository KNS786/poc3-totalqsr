//Running Background Process Get location particular time wait period
//Get Constant Data Array of Stores address location

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

const userCurrentLocation = {
    latitude:10.013352,
    longitude: 76.329984
}

const calculateStoreDistance = (userCurrentLocation:any,shopAddress:Array<any>)=>{

    shopAddress.map((shop) =>{
        let shopLatitude = shop.location.latitude * (Math.PI / 180 );
        let shopLongitude = shop.location.longitude * (Math.PI / 180);
        let userLatitude = userCurrentLocation.location.latitude * (Math.PI / 180 );
        let userLongitude = userCurrentLocation.location.longitude * (Math.PI / 180 );

        //Haversine formula 
        const distanceOfLongitude = userLongitude - shopLongitude;
        const distanceOfLatitude = userLatitude - shopLatitude;
        const userLocation = Math.pow(Math.sin(distanceOfLatitude / 2),2 ) + 
        Math.cos(shopLatitude) * Math.cos(userLatitude) * Math.pow(Math.sin(distanceOfLongitude/2),2);

        const earthRadiusMiles = 6371;
        const distanceOfKM = 2 * Math.asin(Math.sqrt(userLocation)) * earthRadiusMiles;
        const distnaceOfMeters = distanceOfKM * 1000;
        if(!shop.distanceOfMeters){
            shop.distanceOfMeters = distnaceOfMeters;
            return shop;
        }
        shop.distanceOfMeters = distnaceOfMeters;
        return shop;
    })

}

export default calculateStoreDistance;