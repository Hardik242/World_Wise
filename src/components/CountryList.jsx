import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

export default function CountryList() {
    const {cities, isLoading} = useCities();

    if (isLoading) return <Spinner />;

    if (!cities.length)
        return (
            <Message message="Add your first city by clicking on a city on map" />
        );

    const countries = cities.reduce((arr, curr) => {
        if (!arr.map((el) => el.country).includes(curr.country))
            return [...arr, {country: curr.country, emoji: curr.emoji}];
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map(function (country) {
                return <CountryItem country={country} key={country.country} />;
            })}
        </ul>
    );
}
