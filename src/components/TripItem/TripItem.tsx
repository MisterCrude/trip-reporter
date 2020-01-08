import React, { memo, useCallback } from "react";
import { ITrip } from "@src/types/trip";
import { ICountry } from "@src/types/countries";
import { convertTimeStamp } from "@src/utils/dates";
import { cutLargeText } from "@src/utils/common";
import useStyles from "./styles";

import {
    QueryBuilder as QueryBuilderIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon,
} from "@material-ui/icons";
import { Card, CardContent, Typography, Divider, Chip, IconButton, Box } from "@material-ui/core";
import CountryBadge from "@src/components/CountryBadge";

// TODO remove this
const favoriteTrips = ["1", "2"];

interface Props {
    tripData: ITrip;
}

const Trip: React.FC<Props> = memo(({ tripData }) => {
    const classes = useStyles();
    const { id, name, visitedCountries, started, finished, description, transitedCountries } = tripData;

    const isFavoriteTrip = useCallback((tripId: string) => favoriteTrips.includes(tripId), [favoriteTrips]);
    const isTransitedCountry = useCallback((countryId: string) => transitedCountries.includes(countryId), [
        transitedCountries,
    ]);

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography component="h2" variant="h4">
                        {name}
                    </Typography>
                    <IconButton className={classes.favoriteButton}>
                        {isFavoriteTrip(id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>
                <Chip
                    icon={<QueryBuilderIcon />}
                    label={
                        <>
                            <strong>{convertTimeStamp(started)}</strong> - <strong>{convertTimeStamp(finished)}</strong>
                        </>
                    }
                    variant="outlined"
                />

                <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                    {cutLargeText(description)}
                </Typography>
            </CardContent>
            <Divider />
            <CardContent className={classes.footer}>
                {visitedCountries.slice(0, 8).map((country: ICountry) => (
                    <Box mr={1} display="inline-block" key={country.id}>
                        <CountryBadge countryData={country} isTransited={isTransitedCountry(country.id)} />
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
});

export default Trip;
