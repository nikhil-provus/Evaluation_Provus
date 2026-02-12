import { useState,useEffect } from "react";
import { OPEN_WEATHER_API,OPEN_WEATHER_API_KEY, WEATHERAPI_API_KEY, WEATHERAPI_COM_API } from "../utils/constants";
import type { OpenWeatherApiResponse, WeatherApiResponse } from "../interfaces/interfaces";
import ApiError from "../classes/ApiError";
import fetchApi from "../utils/fetchApi";
import { useApi } from "../contexts/Apicontext";
import Loader from "../components/Loader";
import DisplayWeather from "../components/DisplayWeather";

function CurrentWeather(){

    const [loadingState,setLoadingState] = useState<boolean>();
    const [errorMessage,setErrorMessage] = useState<string>("");
    const [openWeatherData,setOpenWeatherData] = useState<OpenWeatherApiResponse|null>(null);
    const [weatherApiData,setWeatherApiData] = useState<WeatherApiResponse|null>(null);
    const [enteredLocation,setEnteredLocation] = useState<string>("");
    const {selectedApi} = useApi();

    useEffect(() => {
      setOpenWeatherData(null);
      setWeatherApiData(null);
      setErrorMessage("");
    }, [selectedApi]);

    const fetchWeatherData :(loc : string)=> Promise<void> = async (typeLocation : string)=>{
        setLoadingState(true);
        try {
            if(selectedApi === "openWeather"){
                const apiUrl = `${OPEN_WEATHER_API}weather?${typeLocation}&APPID=${OPEN_WEATHER_API_KEY}`
                const data = await fetchApi<OpenWeatherApiResponse>(apiUrl);
                setOpenWeatherData(data);
            }else if (selectedApi === "weatherApi"){
                const apiUrl = `${WEATHERAPI_COM_API}current.json${WEATHERAPI_API_KEY}${typeLocation}`;
                const data = await fetchApi<WeatherApiResponse>(apiUrl);
                setWeatherApiData(data);
            }
            setErrorMessage("");
            
        } catch (error) {
            if(error instanceof ApiError){
            let errMessage : string;
            switch(error.code){
                case 400:
                case 404:
                    errMessage = "Invalid City !, Please enter valid city";
                    break;
                case 401:
                    errMessage = "Invalid API key";
                    break;
                case 429:
                    errMessage = "Api fetching quota reached, try after 24 hrs";
                    break;
                case 500:
                    errMessage = "Internal Error!";
                    break;
                default:
                    errMessage = "Something went wrong in weather fetching !";
                    break;
            }
            setOpenWeatherData(null);
            setErrorMessage(errMessage);
            }
        } finally{
            setLoadingState(false);
        }
    }

    
    function getCurrentLocationViaGeoLocation():Promise<string>{
        return new Promise((resolve,reject)=>{
            if(!navigator.geolocation){
                reject(new Error("Your browser doesn't support navigator !"));
            }
            navigator.geolocation.getCurrentPosition((pos)=>{
                const {latitude,longitude} = pos.coords;
                const latLong : string = selectedApi === "openWeather" 
                    ? `lat=${latitude}&lon=${longitude}`
                    : `q=${latitude},${longitude}`;
                resolve(latLong);
            },(err)=>{
                reject(new Error(err.message));
            })

        })
    }

    useEffect(()=>{
        const load = async ()=>{
        setLoadingState(true);
        try {
            const locationQuery = await getCurrentLocationViaGeoLocation();
            await fetchWeatherData(locationQuery);
        } catch (error) {
                if (error instanceof Error) {
                    setOpenWeatherData(null);
                    setErrorMessage(error.message);
                }
        } finally {
            setLoadingState(false);
        }
        };
        load();
    },[])

return (
  <div className="px-4 pb-10">
    <div className="flex justify-center mb-8">
      <div className="flex gap-4 bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-sky-200 w-full max-w-xl">

        <input
          placeholder="Enter location to search"
          onChange={(e) => {
            setEnteredLocation(e.target.value);
          }}
          value={enteredLocation}
          className="
            flex-1
            px-4 py-3
            rounded-xl
            border border-sky-200
            focus:outline-none
            focus:ring-2 focus:ring-sky-400
            text-sky-800
            placeholder-gray-400
            bg-white
          "
        />

        <button
          disabled={!enteredLocation.trim()}
          onClick={() => {
            fetchWeatherData("q=" + enteredLocation);
            setEnteredLocation("");
          }}
          className="
            px-6 py-3
            rounded-xl
            bg-gradient-to-r from-sky-500 to-cyan-400
            text-white
            font-semibold
            shadow-md
            transition-all duration-300
            hover:shadow-lg
            hover:scale-105
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          🔍 Search
        </button>

      </div>
    </div>

    {errorMessage && (
      <div className="flex justify-center mb-6">
        <p className="bg-red-100 text-red-600 px-6 py-3 rounded-xl shadow-md">
          {errorMessage}
        </p>
      </div>
    )}

    {loadingState && 
      <Loader/>}

    {!loadingState && !errorMessage && selectedApi === "openWeather" && openWeatherData && (
      <DisplayWeather apiType="openWeather" weatherData={openWeatherData} />
    )}

    {!loadingState && !errorMessage && selectedApi === "weatherApi" && weatherApiData && (
      <DisplayWeather apiType="weatherApi" weatherData={weatherApiData} />
    )}
  </div>
);

}

export default CurrentWeather;

