import readline from "readline/promises";
import displayResults from "./displayResult.mjs";
import fetchFunction from "../utils/fetchFunction.mjs";
import { exit } from "process";
import aiAssistant from "./aiAssistant.mjs";

//using readline to take user's input.
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//using async await to perform asynchrononus tasks.
async function takeUserInputManually(){
    const cityName =await rl.question("Please Enter your City name : ");
    return cityName.trim().toLowerCase();
}


async function getUserLocationViaIP(){
    try {
        // API CALL 1 to get location via ISP.
        const {city} = await fetchFunction({
            url : "https://ipinfo.io/json/",
            httpMethod : "GET"
        }); //Destructuring city
        if(city){
            return city;
        }else{
            throw new Error("Something went wrong in getting location via IP");
        }
    } catch (error) {
        return error.message;
    }
}


async function userChoice(){
    //using let, as let can be initialized later.
    let userPreference; 
    let cityName;
    let aiResponse; 
    
    while(!userPreference || userPreference <= 0 || userPreference > 3 || !Number(userPreference)){
        userPreference = await rl.question("How would you like to proceed ?\n 1. Enter Location Manually.\n 2. Get Location via IP address (Location will be fetched based on ISP).\n 3. Chat with Ai Assistant.\n 4. Exit App. \n Enter Your Choice : ");
        //typeOf Operator to check datatype of vaiable.
        if(typeof(userPreference) === 'string' && Number(userPreference)){
            userPreference = Number.parseInt(userPreference); //converting string type to number
        }; 
        if(userPreference === 1){
            cityName =await takeUserInputManually();
        }else if(userPreference === 2){
            cityName =await getUserLocationViaIP();
        }else if(userPreference === 3){
            aiResponse = await aiAssistant(rl);
        }else if(userPreference === 4){
            console.log("=============== APP CLOSED ================");
            exit();
        }else{
            console.log("\nUh ho!, Please Select Valid choice.\n");
        }
    }
    rl.close();
    return {aiResponse,cityName};//Returning multiple values.
}


async function getWeatherDetails(cityName){
    try {
        //API CALL 2 to get weather details.
        const result = await fetchFunction({
            url : `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${process.env.WEATHER_API_KEY}`,
            httpMethod : "GET"
        });

        //error handling

        if(result == 400 || result == 404 ){  //using '==' loose equality operator as status code in result variable is in string Eg("400") so loose equality operator will perform type cohersion to check for equality.

            console.log("Invalid City, Please Enter Valid city.");
            
        }else if(Number.parseInt(result) === 401){  //Used parseInt to convert the string result into Integer and then check by strict equality operator '===' which does'nt perform type cohersion 

            console.log("API KEY is invalid.");

        }else if(result?.cod == 429){
            console.log("API request quota reached, Try after 24hrs.");
        }else if(result?.cod == 500){
            console.log("Internal Error Occured !, Try After Sometime.")
        }
        else if (result?.cod === 200){ //Optional CHaining
            return result;
        }
    } catch (error) {
        return error.message;
    }

}

async function start(){
    console.log("\n🌤️ ========== WELCOME TO WEATHERR CONSOLE APP ==========🌤️\n");
    try {
        const {cityName,aiResponse} = await userChoice();
        if(cityName){
            const weatherDetails = await getWeatherDetails(cityName);
            if(weatherDetails?.cod === 200){ //optional chaining
                displayResults(weatherDetails);
            }
        }else if(aiResponse){
            console.log(aiResponse);
        }
    } catch (error) {
        console.log("ERROR IN APP");
    }
}



export default start;