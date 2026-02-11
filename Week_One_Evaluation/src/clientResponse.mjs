import readline from "readline/promises";
import displayResults from "./displayResult.mjs";
import fetchFunction from "../utils/fetchFunction.mjs";
import aiAssistant from "./aiAssistant.mjs";

//using readline to take user's input.
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//using async await to perform asynchrononus tasks.
async function takeUserInputManually(){
    const cityName =await rl.question("Please Enter your City name : ");
    return cityName;
}


async function getUserLocationViaIP(){
        // API CALL 1 to get location via ISP.
        const {city} = await fetchFunction({
            url : "https://ipinfo.io/json/",
            httpMethod : "GET"
        });
        if(!city){
            const error = new Error("City Not Found via IP");
            error.code = "CITY_NOT_FOUND";
            throw error;
        }
        return city;
    
}


async function userChoice(){
    let userPreference; 
    
    while(true){
        userPreference = await rl.question("How would you like to proceed ?\n 1. Enter location manually.\n 2. Get location via IP address (Location will be fetched based on ISP).\n 3. Chat with Ai Assistant.\n 4. Exit App. \n Enter your choice : ");

        userPreference = parseInt(userPreference);  
        if([1,2,3,4].includes(userPreference)){
            return userPreference;
        }else{
            console.log("\nUh ho!, Please select valid choice.\n");
            continue;
        }
    }
}


async function getWeatherDetails(cityName){
    try {
        //API CALL 2 to get weather details.
        const result = await fetchFunction({
            url : `http://api.openweathermap.org/data/2.5/weather?q=${cityName.trim().toLowerCase()}&units=metric&APPID=${process.env.WEATHER_API_KEY}`, //String Interpolation.
            httpMethod : "GET"
        });

        return result;
    } catch (error) {
        switch(error.status || error.code){
            case 400:
            case 404:
                console.log("Invalid City !, Please enter valid city");
                break;
            case 401:
                console.log("INVALID API KEY");
                break;
            case 429:
                console.log("Api fetching quota reached, try after 24 hrs");
                break;
            case 500:
                console.log("Internal Error!");
                break;
            default:
                console.log("Something went wrong in weather fetching !");
                break;
        }
        throw error
    }

}

async function start(){
    console.log("\n🌤️ ========== WELCOME TO WEATHERR CONSOLE APP ==========🌤️\n");
    try {
        let cityName;
        let aiResponse;
        const userPreference = await userChoice(); 
        if(userPreference === 1){
            cityName =await takeUserInputManually();
        }else if(userPreference === 2){
            cityName =await getUserLocationViaIP();
        }else if(userPreference === 3){
            aiResponse = await aiAssistant(rl);
        }else if(userPreference === 4){
            console.log("=============== APP CLOSED ================");
        }
        if(cityName){
            const weatherDetails = await getWeatherDetails(cityName);
            if(weatherDetails?.cod === 200){ //optional chaining
                displayResults(weatherDetails);
            }
        }else if(aiResponse){
            console.log(aiResponse);
        }
    } catch (error) {
        console.log("ERROR : "+error);
    } finally{
        rl.close();
    }
}



export default start;