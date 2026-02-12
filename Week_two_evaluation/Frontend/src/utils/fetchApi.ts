import ApiError from "../classes/ApiError";

async function fetchApi<T>(url : string):Promise<T>{
    const response = await fetch(url);
    if(!response.ok){
        throw new ApiError(response.status,response.statusText);
    }

    const result : T = await response.json();
    return result;
}

export default fetchApi;