import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import styles from "./SearchCity.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import {asyncTimeout} from "../components/AsyncTimeout";

export default function SearchCity() {
    const [cityName, setCityName] = useState("");
    const BASE_URL = "https://api.api-ninjas.com/v1/geocoding?city=";
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        function () {
            (async function () {
                if (error) {
                    await asyncTimeout(4000);
                    setError(false);
                }
            })();
        },
        [error]
    );

    function handleSubmit(e) {
        e.preventDefault();
        setError(false);
        setIsLoading(true);

        try {
            fetch(`${BASE_URL}${cityName}`, {
                method: "GET",
                headers: {
                    "X-Api-Key": "98NpyWogpa5xv1s8r7o1aA==0eM4pc7KXNewMnOq",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    return navigate(
                        `form?lat=${data[0].latitude}&lng=${data[0].longitude}`
                    );
                })
                .catch((err) => setError(true));
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <form className={styles.searchBox} onSubmit={handleSubmit}>
                <button className={styles.btnSearch}>
                    <i className="bx bx-search bx-lg bx-flashing"></i>
                </button>
                <input
                    type="text"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    className={styles.inputSearch}
                    placeholder="Select City by name"
                />
            </form>
            {isLoading && <Spinner />}
            {error && <Message message={"No city Found. Try another"} />}
        </>
    );
}
