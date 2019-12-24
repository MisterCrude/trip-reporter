import React, { useCallback } from "react";
import { useDispatch } from "@src/hooks/dispatch";

import { setShowModal } from "@src/store/app/actions";
import { ITrip } from "@src/types/trip";
import { Grid } from "@material-ui/core";
import Trip from "@src/components/Trip";

// TODO remove it from here
const Trips: Array<ITrip> = [
    {
        id: "1",
        name: "Trip one",
        visitedCountries: { BY: "Belarus", PL: "Poland" },
        started: "01.12.2020",
        finished: "01.12.2021",
        duration: 20,
        description:
            "Lorem ipsum, dolor sit amet consecteturstinctio explicabo illo at id non blanditiis quasi beatae ad nesciunt, aspernatur eius ab?",
        friends: ["Luk", "Grag"],
        transitCountries: ["BY"],
    },
    {
        id: "2",
        name: "Trip two",
        visitedCountries: {
            BY: "Belarus",
            PL: "Polands",
            PssL: "Polandss",
            PsL: "Polandsv",
            PfvL: "Polavnd",
            PvL: "Polavadnd",
            PLb: "Polsfvand",
            PfbL: "Povvdfvland",
        },
        started: "01.12.2020",
        finished: "01.12.2021",
        duration: 20,
        description:
            "Lorem ipsum, dolor sit amet consecteturstinctio explicabo illo at id non blanditiis quasi beatae ad nesciunt, aspernatur eius ab?",
        friends: ["Luk", "Grag"],
        transitCountries: ["BY"],
    },
    {
        id: "3",
        name: "Trip three",
        visitedCountries: { BY: "Belarus", PL: "Poland" },
        started: "01.12.2020",
        finished: "01.12.2021",
        duration: 20,
        description:
            "Lorem ipsum, dolor sit amet consecteturstinctio explicabo illo at id non blanditiis quasi beatae ad nesciunt, aspernatur eius ab?",
        friends: ["Luk", "Grag"],
        transitCountries: ["BY"],
    },
    {
        id: "4",
        name: "Trip four",
        visitedCountries: { BY: "Belarus", PL: "Poland" },
        started: "01.12.2020",
        finished: "01.12.2021",
        duration: 20,
        description:
            "Lorem ipsum, dolor sit amet consecteturstinctio explicabo illo at id non blanditiis quasi beatae ad nesciunt, aspernatur eius ab?",
        friends: ["Luk", "Grag"],
        transitCountries: ["BY"],
    },
];

const TripList: React.FC = () => {
    const triggerModal = useDispatch(setShowModal);

    const handleTripClick = useCallback((id: string) => triggerModal(true), [triggerModal]);

    return (
        <Grid container spacing={2} direction="column">
            {Trips.map(tripData => (
                <Grid item key={tripData.id} onClick={() => handleTripClick(tripData.id)}>
                    <Trip tripData={tripData} />
                </Grid>
            ))}
        </Grid>
    );
};

export default TripList;
