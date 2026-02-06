/**
 * APP FLOW
 *                                       __-> takeUserInputManually() __
 *                                      |                               |
 * app.mjs -> start() -> userChoice() --                             cityName -> getWeatherDetails(ctyName) -> displayResults(weatherDetails)___
 *                                      |__-> getLocationViaIP() _______|                                                                       |
 *                                      |                                                                                                       _-> END
 *                                      |__-> aiAssistant()_____________->aiAssistant.mjs() -> logs(aiResponse) ________________________________|
 */
import 'dotenv/config';
import start from "./src/clientResponse.mjs";


start();