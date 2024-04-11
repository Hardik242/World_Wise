import {useEffect, useState} from "react";

export default function useLocalStorage(initialCities, key) {
    const [value, setValue] = useState(function () {
        const storedValue = localStorage.getItem("visitedCities");
        // console.log(storedValue?.length < 3);
        return storedValue && !(storedValue.length < 5)
            ? JSON.parse(storedValue)
            : initialCities;
    });

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [key, value]
    );

    return [value, setValue];
}
