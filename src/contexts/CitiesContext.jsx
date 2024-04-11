import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import citiesData from "../data/cities.json";
import useLocalStorage from "../hooks/useLocalStorage";
import {asyncTimeout} from "../components/AsyncTimeout";
import {useNavigate} from "react-router-dom";
// import {useNavigate} from "react-router-dom";

const CitiesContext = createContext();

function CitiesProvider({children}) {
    const [cities, setCities] = useLocalStorage(
        citiesData.cities,
        "visitedCities"
    );
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const navigate = useNavigate();

    useEffect(
        function () {
            const val = window.screen.width < 769 || window.screen.height < 300;
            setIsSmallScreen(val);
            val && navigate("/");
        },
        [navigate]
    );

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            await asyncTimeout(1000);

            setIsLoading(false);
        }

        fetchData();
    }, []);

    async function CreateCity(newCity) {
        setIsLoading(() => true);

        await asyncTimeout(400);

        setCities((cities) => [...cities, newCity]);

        setIsLoading(() => false);
    }

    const GetCity = useCallback(
        function GetCity(id) {
            if (Number(id) === currentCity.id) return;
            setCurrentCity(
                () => cities.filter((city) => city.id === Number(id))[0]
            );
        },
        [cities, currentCity]
    );

    async function ClearCity(id) {
        setIsLoading(() => true);

        await asyncTimeout(300);

        setCities(cities.filter((city) => city.id !== Number(id)));

        setIsLoading(() => false);
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                isSmallScreen,
                GetCity,
                CreateCity,
                ClearCity,
            }}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error(
            "Cities Context was used out of the bound of CitiesProvider"
        );
    }
    return context;
}

export {CitiesProvider, useCities};
