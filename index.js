 console.log("hello jee roushan");

 const API_KEY="cd844a7d27a8a05559b2d487fa3e3960";

  function renderWeatherInfo(data){

     let newPara= document. createElement('p');
    newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`
    document.body.appendChild(newPara);

  }

 async function fetchWeatherDetails(){
    try{
        let city="bihar";
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
        const data=await response.json();
        console.log("weather data:->" ,data);   
    
    
    
    renderWeatherInfo(data);

    }
 
    catch(err){

    }

 }

 async function getCustomWeatherDetails(){

    try{
        let lat=25.609;
        let lon=85.1343;
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    let data=await result.json();
    console.log(data);

    }

    catch(err){
        console.log("ERROR FOUND",err);

    }


 }

 function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geolocation Support");
    }
 }

 function showPosition(position){
    let lat=  position.coords.latitude;
    let lon=position.coords.longitude;
    console.log(lat);
    console.log(lon);

 }