import {useNavigate} from "react-router-dom";
import styles from "./Map.module.css";
import * as L from "leaflet";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext";
import {useGeolocation} from "../hooks/useGeolocation";
import {useUrlPosition} from "../hooks/useUrlPosition";
import Button from "./Button";

export default function Map() {
    const {cities} = useCities();
    const navigate = useNavigate();
    const {
        isLoading: isLoadingPosition,
        position: geoPosition,
        getPosition,
    } = useGeolocation();

    // const [mapPosition, setMapPosition] = useState([28.6448, 77.216721]);
    const [mapPosition, setMapPosition] = useState([28.611, 77.1875]);

    const [mapLat, mapLng] = useUrlPosition();

    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );

    useEffect(
        function () {
            if (geoPosition) {
                setMapPosition([geoPosition.lat, geoPosition.lng]);
                navigate(`form?lat=${geoPosition.lat}&lng=${geoPosition.lng}`);
            }
        },
        [geoPosition, navigate]
    );

    //  Create the Icon
    const LeafIcon = L.Icon.extend({
        options: {},
    });

    const greenIcon = new LeafIcon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        // "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
    });

    return (
        <div className={styles.mapContainer}>
            {!geoPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use Your Position"}
                </Button>
            )}

            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.name}</span>{" "}
                            <span>{city.notes}</span>
                        </Popup>
                    </Marker>
                ))}
                <Marker position={mapPosition} icon={greenIcon}>
                    <Popup>
                        <span>Current Position</span>
                    </Popup>
                </Marker>

                <ChangeFocusCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeFocusCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            return navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });
}
