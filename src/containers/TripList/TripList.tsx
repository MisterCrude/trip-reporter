import React, { useCallback } from "react";
import { useDispatch } from "@src/hooks/dispatch";
import { setShowModal } from "@src/store/app/actions";
import { ModalTypes } from "@src/types/common";
import { ITrip } from "@src/types/trip";

import { Grid } from "@material-ui/core";
import TripItem from "@src/components/TripItem";

// TODO remove it from here
const Trips: Array<ITrip> = [];

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
