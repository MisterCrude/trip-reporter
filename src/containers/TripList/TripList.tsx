import React, { useCallback } from "react";
import { useDispatch } from "@src/hooks/dispatch";
import { setShowModal } from "@src/store/app/actions";
import { ModalTypes } from "@src/types/common";
import { ITrip } from "@src/types/trip";

import { Grid } from "@material-ui/core";
import TripItem from "@src/components/TripItem";

// TODO remove it from here
const Trips: Array<ITrip> = [
    {
        id: "1",
        name: "Trip one",
        visitedCountries: ["BY", "PL"],
        started: "01.12.2020",
        finished: "01.12.2021",
        duration: 20,
        description:
            "Lorem ipsum, dolor sit amet consecteturstinctio explicabo illo at id non blanditiis quasi beatae ad nesciunt, aspernatur eius ab?",
        friends: ["Luk", "Grag"],
        transitedCountries: ["BY"],
    },
    {
        id: "2",
        name: "Trip two",
        visitedCountries: ["BY", "PL", "RU", "RF"],
        started: "01.12.2020",
        finished: "01.12.2021",
        duration: 20,
        description:
            "Lorem ipsum, dolor sit amet consecteturstinctio explicabo illo at id non blanditiis quasi beatae ad nesciunt, aspernatur eius ab?",
        friends: ["Luk", "Grag"],
        transitedCountries: ["BY"],
    },
    {
        id: "3",
        name: "Trip three",
        visitedCountries: ["BY", "PL", "RU", "RF", "BY", "PL", "RU", "RF"],
        started: "01.12.2020",
        finished: "01.12.2021",
        duration: 20,
        description:
            "Lorem ipsum, dolor sit amet consecteturstinctio explicabo illo at id non blanditiis quasi beatae ad nesciunt, aspernatur eius ab?",
        friends: ["Luk", "Grag"],
        transitedCountries: ["BY"],
    },
    {
        id: "4",
        name: "Trip four",
        visitedCountries: ["BY", "PL", "RU"],
        started: "01.12.2020",
        finished: "01.12.2021",
        duration: 20,
        description:
            "Lorem ipsum, dolor sit amet consecteturstinctio explicabo illo at id non blanditiis quasi beatae ad nesciunt, aspernatur eius ab?",
        friends: ["Luk", "Grag"],
        transitedCountries: ["BY"],
    },
];

const TripList: React.FC = () => {
    const triggerModal = useDispatch<typeof setShowModal>(setShowModal);

    const handleTripClick = useCallback((id: string) => triggerModal(ModalTypes.MODAL_DETAILS), [triggerModal]);

    return (
        <Grid container spacing={2} direction="column">
            {Trips.map(tripData => (
                <Grid item key={tripData.id} onClick={() => handleTripClick(tripData.id)}>
                    <TripItem tripData={tripData} />
                </Grid>
            ))}
        </Grid>
    );
};

export default TripList;
