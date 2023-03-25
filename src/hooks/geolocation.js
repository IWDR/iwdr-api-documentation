import {useEffect, useState} from "react";

export const useGeolocation = () => {

    const [location, setLocation] = useState(null);
    const requestPosition = () => {
        if (typeof navigator !== "undefined") {
            navigator.geolocation.getCurrentPosition((pos) => setLocation(pos), (error) => setLocation(error));
        }
    }

    useEffect(() => {
        requestPosition()
    }, []);

    return {
        location
    }
}