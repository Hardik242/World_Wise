import CityItem from "./CityItem";
import Spinner from "./Spinner.jsx";
import styles from "./CityList.module.css";
import Message from "./Message.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

export default function CityList() {
    const {cities, isLoading} = useCities();
    if (isLoading) return <Spinner />;

    if (!cities?.length)
        return (
            <Message message="Add your first city by clicking on a city on map" />
        );

    return (
        <ul className={styles.cityList}>
            {cities.map(function (city) {
                return <CityItem city={city} key={city.id} />;
            })}
        </ul>
    );
}
