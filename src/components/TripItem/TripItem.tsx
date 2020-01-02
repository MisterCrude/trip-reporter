import React, { memo } from "react";
import { ITrip } from "@src/types/trip";
import useStyles from "./styles";

import {
    GpsFixedRounded as GpsFixedRoundedIcon,
    QueryBuilder as QueryBuilderIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon,
} from "@material-ui/icons";
import { Card, CardContent, Typography, Divider, Chip, IconButton, Box } from "@material-ui/core";

const favoriteTrips = ["1", "2"];

// TODO move this function to select in redux layer
const isFavoriteTrip = (tripId: string) => favoriteTrips.includes(tripId);

interface Props {
    tripData: ITrip;
}

const Trip: React.FC<Props> = memo(({ tripData }) => {
    const classes = useStyles();
    const { id, name, visitedCountries, started, finished, description } = tripData;

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
                            <strong>{started}</strong> - <strong>{finished}</strong>
                        </>
                    }
                    variant="outlined"
                />

                <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                    {description}
                </Typography>
            </CardContent>
            <Divider />
            <CardContent className={classes.footer}>
                {Object.values(visitedCountries)
                    .slice(0, 8)
                    .map((countryName: any, i) => (
                        <Box mr={1} display="inline-block" key={countryName + i}>
                            <Chip label={countryName} icon={<GpsFixedRoundedIcon />} />
                        </Box>
                    ))}
            </CardContent>
        </Card>
    );
});

export default Trip;
