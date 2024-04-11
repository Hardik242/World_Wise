import {Link} from "react-router-dom";
import styles from "./CityItem.module.css";
import {useCities} from "../contexts/CitiesContext";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

export default function CityItem({city}) {
    const {currentCity, ClearCity} = useCities();
    const {cityName, date, emoji, id, position} = city;

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${
                    id === currentCity.id && styles["cityItem--active"]
                }`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button
                    className={styles.deleteBtn}
                    onClick={async (e) => {
                        e.preventDefault();
                        await ClearCity(id);
                    }}>
                    &times;
                </button>
            </Link>
        </li>
    );
}
