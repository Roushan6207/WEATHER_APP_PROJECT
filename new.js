const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");


const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".Loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

//initially variables needed

let oldTab=userTab;
const API_KEY="cd844a7d27a8a05559b2d487fa3e3960";
oldTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab(newTab){ 
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        oldTab.classList.add("current-tab");


        if(!searchForm.classList.contains("active")){
            //kya search form baal container invisisble .if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }

        else{
            //mai phle search pr tha an yours weather bala vissible krna h
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");

            //ab main your weather tab me aaya hu,to weather bhi visible krna hoga,so let check local storage first for coordinates,if we have  them there
            getfromSessionStorage();
        }

    }

}


userTab.addEventListener("click",() =>{
    //pass clicked tab as input parameter
    switchTab(userTab);

});

searchTab.addEventListener("click",() =>{
    //pass clicked tab as input parameter
    switchTab(searchTab);

});

//check if  coordinates are already present in session storage
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // agr local coordinates nhi mile 
        grantAccessContainer.classList.add("active"); 
    }

    else{
       const coordinates=JSON.parse(localCoordinates);
       fetchUserWeatherInfo(coordinates);
    }

}


async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;
    // make grant-container invisible
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try{
        const response=await fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data=await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(err){
        console.error(err);
        loadingScreen.classList.remove("active");

    }

}




function renderWeatherInfo(weatherInfo){
    //firstly we have to fetch the element

    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=documet.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");


    //fetch values from weatherInfo object and put it UI elements
    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

    temp.innerText=weatherInfo?.main?.temp;
    windspeed.innerText=weatherInfo?.wind?.speed;
    humidity.innerText=weatherInfo?.main?.humidity;
    cloudiness.innerText=weatherInfo?.clouds?.all;
   

}


function getLocation(){
    if(navigator.geolocation){
        console.log("requesting geolocation---");
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{
        console.log("No geolocation Support");
    }
 }


function showPosition(position){
 const userCoordinates={
    lat:position.coords.latitude,
    lon:position.coords.longitude,
 }

 sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
 fetchUserWeatherInfo(userCoordinates);
}

function showError(error){
    console.log(error);
}

const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);

 
const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName === "")
         return;
    else
     fetchSearchWeatherInfo(cityName);
})

 async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{

        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
    
        const data=await response.json();
          loadingScreen.classList.remove("active");
          userInfoContainer.classList.add("active");
          renderWeatherInfo(data);

    }
    catch(err){
        console.log(error);
        
    }
}










