import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { CheckCircle, FavoriteBorder, Favorite } from "@material-ui/icons";
import { Container, Card, CardContent, Typography, Divider, Grid, Chip, IconButton } from "@material-ui/core";

const Trips = [
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

const favoriteTrips = ["1", "2"];

// TODO move this function to select in redux layer
const isFavoriteTrip = (tripId: string) => favoriteTrips.includes(tripId);

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

const TripComponent: React.FC<{ tripData: any }> = ({ tripData }) => {
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
                        {isFavoriteTrip(id) ? <Favorite color="error" /> : <FavoriteBorder />}
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
                        <Chip key={countryName} icon={<CheckCircle />} label={countryName} className={classes.chip} />
                    ))}
            </CardContent>
        </Card>
    );
};

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Container>
                <main>
                    <Grid container spacing={2} direction="column">
                        {Trips.map(tripData => (
                            <Grid item key={tripData.id}>
                                <TripComponent tripData={tripData} />
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </Container>
        </>
    );
};

export default App;
