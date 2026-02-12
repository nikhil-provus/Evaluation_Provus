import Home from "./pages/Home"
import Header from "./components/Header"
import { ApiProvider } from "./contexts/Apicontext"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import Forecast from "./pages/Forecast";

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-cyan-100 relative pt-20">
          
          <Header />

          <div className="pt-28">
            <Routes>
              <Route path="/" element={<Home/>}> 
                <Route path="current" element={<CurrentWeather/>}/>
                <Route path="forecast" element={<Forecast/>}/>
              </Route>
            </Routes>
          </div>

        </div>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App
