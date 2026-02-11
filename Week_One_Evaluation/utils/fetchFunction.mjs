
import loader from "./loader.mjs";
import globalStates from "./globalStates.mjs";

//common fetch function as there are two API calls, One for weather details and Another for getting location via ISP. Both have same logic, so instead of calling async/await,fetch() twice, using a common function, achieving REUSABILITY.

                                //optional parameters
async function fetchFunction({url,httpMethod="GET",payloadBody}){
    try {
        globalStates.loadingState = true;
        loader();
        const response = await fetch(url,{
            method : httpMethod,
            headers : {
                'Content-Type' : 'application/json',
                'X-Api-Key' : process.env.WEATHER_API_KEY //Cannot use as it requires paid subscription.
            },
            ...(httpMethod === "POST" && {body:JSON.stringify(payloadBody)})
        });
        const result = await response.json();
        if(!response.ok){
            const error = new Error(result.message || "Failed to fetch");
            error.status = response.status;
            error.code = response.code;
            throw error;
        }else{
            return result 
        }
    }finally{
        globalStates.loadingState = false; //Using finally block bcoz if fetch throws error, loader can get stuck, and as finally block is executed regardless of success of failure, it will turn the loader off.
    }
}

export default fetchFunction;