import React, { memo } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { ITrip } from "@src/types/trip";
import {
    CheckCircle as CheckCircleIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon,
} from "@material-ui/icons";
import { Card, CardContent, Typography, Divider, Chip, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            cursor: "pointer",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
        },
        description: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
        chip: {
            "&:not(:first-of-type)": {
                marginLeft: theme.spacing(1),
            },
        },
        favoriteButton: {
            marginLeft: theme.spacing(2),
        },
    }),
);

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
            <CardContent>
                <div className={classes.header}>
                    <Typography component="h5" variant="h5">
                        {name}
                    </Typography>
                    <IconButton className={classes.favoriteButton}>
                        {isFavoriteTrip(id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
                <Typography variant="subtitle1" color="textSecondary">
                    From <strong>{started}</strong> to <strong>{finished}</strong>
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                    {description}
                </Typography>
            </CardContent>
            <Divider />
            <CardContent>
                {Object.values(visitedCountries)
                    .slice(0, 8)
                    .map((countryName: any) => (
                        <Chip
                            key={countryName}
                            icon={<CheckCircleIcon />}
                            label={countryName}
                            className={classes.chip}
                        />
                    ))}
            </CardContent>
        </Card>
    );
});

export default Trip;
