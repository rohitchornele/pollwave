import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import tripService from "../../services/tripService";

const ItineraryView = () => {

    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            const data = await tripService.getTripById(tripId);
            console.log("data-trip : ", data)

            setTrip(data?.trip);
            setRole(data?.members.role);
        };

        fetchTrip();
    }, []);

    if (!trip) return <div>Loading...</div>;

    return (
        <div>
            <Outlet context={{ trip, role }} />
        </div>
    );
};

export default ItineraryView;