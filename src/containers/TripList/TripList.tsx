import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import { getFilters } from "@src/store/filters/selectors";
import { IFiltersState } from "@src/store/filters";
import { setShowModal } from "@src/store/app/actions";
import { setActiveTrip } from "@src/store/trips/actions";
import { getTripsList } from "@src/store/trips/selectors";
import { ModalTypes } from "@src/types/common";
import { ITrip } from "@src/types/trip";

import { Grid } from "@material-ui/core";
import TripItem from "@src/components/TripItem";

const TripList: React.FC = () => {
    const tripsList: ITrip[] = useSelector(getTripsList);
    const filtersData: IFiltersState = useSelector(getFilters);
    const dispatchModal = useDispatch<typeof setShowModal>(setShowModal);
    const dispatchActiveTrip = useDispatch<typeof setActiveTrip>(setActiveTrip);

    const [filteredTrips, setFilteredTrips] = useState(tripsList);

    const handleTripClick = useCallback(
        (id: string) => {
            dispatchActiveTrip(id);
            dispatchModal(ModalTypes.MODAL_DETAILS);
        },
        [dispatchModal, dispatchActiveTrip],
    );

    useEffect(
        () =>
            setFilteredTrips(
                tripsList.filter((trip: ITrip) => trip.name.toLocaleLowerCase().includes(filtersData.queryString)),
            ),
        [setFilteredTrips, tripsList, filtersData],
    );

    return (
        <Grid container spacing={2} direction="column">
            {filteredTrips.map(tripData => (
                <Grid item key={tripData.id} onClick={() => handleTripClick(tripData.id)}>
                    <TripItem tripData={tripData} />
                </Grid>
            ))}
        </Grid>
    );
};

export default TripList;
