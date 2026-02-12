import logo from "./../assets/Provus_edited_logo.png";
import { useApi } from "../contexts/Apicontext";

function Header() {
  const { selectedApi, setSelectedApi } = useApi();

  return (
    <div className="absolute top-6 left-0 w-full flex justify-center z-20">
      <header
        className="
      w-full max-w-6xl
      bg-white/80
      backdrop-blur-lg
      shadow-2xl
      rounded-3xl
      border border-sky-200
        "
      >
        <div className="px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Provus edited logo"
              className="h-14 w-auto object-contain"
            />
            <h1 className="text-2xl font-bold text-sky-700 tracking-wide">
              Weather Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="api-select"
              className="text-sky-700 font-semibold text-lg"
            >
              Choose API:
            </label>

            <select
              id="api-select"
              value={selectedApi}
              onChange={(e) =>
                setSelectedApi(
                  e.target.value as "openWeather" | "weatherApi" | ""
                )
              }
              className="
                px-5 py-2.5
                rounded-xl
                bg-white/80
                backdrop-blur-md
                text-sky-800
                font-medium
                shadow-sm
                border border-sky-200
                focus:outline-none
                focus:ring-2 focus:ring-sky-400
                transition-all duration-300
                hover:shadow-md
                cursor-pointer
              "
            >
              <option value="" disabled hidden>
                -- Select API --
              </option>

              <option value="openWeather">
                🌤 OpenWeather API
              </option>

              <option value="weatherApi">
                ☁️ WeatherAPI
              </option>
            </select>
          </div>

        </div>
      </header>
    </div>
  );
}

export default Header;
