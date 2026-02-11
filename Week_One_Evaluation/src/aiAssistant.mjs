import loader from "../utils/loader.mjs";
import globalStates from "../utils/globalStates.mjs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});


//const aiURL = `https://api.openweathermap.org/assistant/session/${globalStates.aiSessionId}`;

async function aiAssistant(rl){
    try {
        globalStates.loadingState = true;
        const prompt = await rl.question("(Only ask Weather related prompts)PROMPT : ");
        loader();

        const response = await ai.models.generateContent({
            model : "gemini-3-flash-preview",
            contents : `NOTE : ACT as a professional weather reporter and summarize the weather report, Don't entertain any other prompts which are not Weather related, ${prompt} ${new Date()} use following api to get details of specified date and add city name from promt http://api.openweathermap.org/data/2.5/weather?q=cityName&units=metric&APPID=${process.env.WEATHER_API_KEY}
            Display result in catchy yet summarized format suitable for terminal/console.`
        });
        globalStates.loadingState = false;
        return response?.text;

        // const payloadBody = {
        //     prompt
        // }
        // const result = await fetchFunction({
        //     url : aiURL,
        //     httpMethod : "POST",
        //     payloadBody
        // })
        // console.log(result);
        // if(result?.session_id){
        //     const {answer,session_id} = result
        //     globalStates.aiSessionId = session_id;
        //     console.log(answer);
        // }
    } catch (error) {
        console.log(error.message);
    }
}

export default aiAssistant;
