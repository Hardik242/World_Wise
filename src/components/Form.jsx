import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import BackButton from "./BackButton";
import {useNavigate} from "react-router-dom";
import {useUrlPosition} from "../hooks/useUrlPosition";
import Message from "./Message";
import DatePicker from "react-datepicker";
import Spinner from "./Spinner";
import {useCities} from "../contexts/CitiesContext";
import {useAuth} from "../contexts/AuthContext";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [mapLat, mapLng] = useUrlPosition();
    const [isLoadingForm, setIsLoadingForm] = useState();
    const [emoji, setEmoji] = useState("");
    const [geoCodingError, setGeoCodingError] = useState();
    const {CreateCity, isLoading} = useCities();
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const BASE_URL =
        "https://api.bigdatacloud.net/data/reverse-geocode-client?";

    useEffect(
        function () {
            if (!mapLat && !mapLng) return;
            async function fetchCityData() {
                try {
                    setIsLoadingForm(true);
                    setGeoCodingError();
                    const res = await fetch(
                        `${BASE_URL}latitude=${mapLat}&longitude=${mapLng}`
                    );
                    const data = await res.json();
                    // console.log(data);

                    if (!data.countryCode)
                        throw new Error(
                            "This doesn't seem to be a city/country. Click somewhere else 😉"
                        );

                    setCityName(data.city || data.locality || "Not Available");
                    setCountry(data.countryName || "Not Available");
                    setEmoji(convertToEmoji(data.countryCode));
                } catch (error) {
                    setGeoCodingError(error.message);
                } finally {
                    // document.getElementById("notes").focus();
                    setIsLoadingForm(false);
                }
            }
            fetchCityData();
        },
        [mapLat, mapLng]
    );

    function getId() {
        const number = Date.now();
        return number % 100000000;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat: mapLat, lng: mapLng},
            id: getId(),
        };

        await CreateCity(newCity);
        navigate("/app/cities");
    }

    if (!isAuthenticated)
        return (
            <Message
                message={
                    "Kindly authenticate your account to access the full suite of features offered by this platform"
                }>
                <Button
                    type={"primary"}
                    onClick={() => {
                        navigate("/login");
                    }}>
                    Login
                </Button>
            </Message>
        );

    if (geoCodingError) return <Message message={geoCodingError} />;

    if (!mapLng && !mapLat)
        return <Message message={"Start by clicking on the map"} />;

    return (
        <>
            {isLoadingForm && <Spinner />}

            {!isLoadingForm && (
                <form
                    className={`${styles.form} ${
                        isLoading ? styles.loading : ""
                    }`}
                    onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <label htmlFor="cityName">City name</label>
                        <input
                            id="cityName"
                            onChange={(e) => setCityName(e.target.value)}
                            value={cityName}
                        />
                        <span className={styles.flag}>{emoji}</span>
                    </div>

                    <div className={styles.row}>
                        <label htmlFor="date">
                            When did you go to {cityName}?
                        </label>
                        {/* <input
                            id="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        /> */}
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className={styles.row}>
                        <label htmlFor="notes">
                            Notes about your trip to {cityName}
                        </label>
                        <textarea
                            id="notes"
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                            autoFocus
                        />
                    </div>

                    <div className={styles.buttons}>
                        <Button onClick={onclick} type="primary">
                            Add
                        </Button>
                        <BackButton />
                    </div>
                </form>
            )}
        </>
    );
}

export default Form;
