import React, { memo } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import { ITrip } from "@src/types/trip";
import {
    CheckCircle as CheckCircleIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon,
} from "@material-ui/icons";
import { QueryBuilder as QueryBuilderIcon } from "@material-ui/icons";
import { Card, CardContent, Typography, Divider, Chip, IconButton, Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            cursor: "pointer",
        },
        content: {
            "&, &:last-child": {
                padding: theme.spacing(3, 4),
            },
        },
        footer: {
            "&, &:last-child": {
                padding: theme.spacing(2, 4),
            },
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
        chipTick: {
            color: green[500],
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
                    .map((countryName: any) => (
                        <Chip
                            key={countryName}
                            icon={<CheckCircleIcon className={classes.chipTick} />}
                            label={countryName}
                            variant="outlined"
                            className={classes.chip}
                        />
                    ))}
            </CardContent>
        </Card>
    );
});

export default Trip;
