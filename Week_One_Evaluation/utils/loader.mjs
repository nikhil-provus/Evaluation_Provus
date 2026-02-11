
//Loader function for console level loader animation.
import globalStates from "./globalStates.mjs";

function loader(){
    const spinner = ['_','\\','|','/','+','-','x',];
    let i = 0;
    const interval = setInterval(()=>{
        if(!globalStates.loadingState){
            clearInterval(interval);
            return;
        }
        process.stdout.write("\r"+spinner[i++ % spinner.length]);
    },100)
}

export default loader;
