import { useNavigate, Outlet } from "react-router-dom";



function Home(){

  const navigate = useNavigate();

  return <>
    <div onClick={()=>{
      navigate("/current")
    }}>
      Current Weather
    </div>
    <div onClick={()=>{
      navigate("/forecast")
    }}>
      Forecast
    </div>
    <Outlet/>
  </>
}

export default Home;