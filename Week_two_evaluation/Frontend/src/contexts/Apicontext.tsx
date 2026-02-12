import { useState,createContext,type ReactNode, useContext } from "react";


type ApiTypes = "" | "openWeather" | "weatherApi";

type ApiContextType = {
    selectedApi : ApiTypes,
    setSelectedApi : React.Dispatch<React.SetStateAction<ApiTypes>>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function ApiProvider({children} : {children : ReactNode}){
    const [selectedApi,setSelectedApi] = useState<ApiTypes>("openWeather");

    return (
        <ApiContext.Provider value={{selectedApi,setSelectedApi}}>
            {children}
        </ApiContext.Provider>
    )
}

export function useApi(){
    const context = useContext(ApiContext);

    if(!context){
        throw new Error("useApi must be inside ApiProvider");
    }

    return context;
}
