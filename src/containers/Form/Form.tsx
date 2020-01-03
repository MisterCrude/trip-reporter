import React, { useState, useCallback, useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { getRandomFriend } from "@src/utils/friends";
import { getTodayDate, getNextDayDate } from "@src/utils/common";
import { IFriend } from "@src/types/common";
import { ICountry } from "@src/types/countries";
import { fetchCountries } from "@src/store/countries/actions";
import { getCountriesList } from "@src/store/countries/selectors";
import { useDispatch } from "@src/hooks/dispatch";
import { COMMON } from "@src/config";

import { TextField, Avatar, Grid, Box, Chip, Fab, Typography } from "@material-ui/core";
import {
    GpsFixedRounded as GpsFixedRoundedIcon,
    ForwardRounded as ForwardRoundedIcon,
    Add as AddIcon,
} from "@material-ui/icons";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

interface Props {
    onFormValid: (state: boolean) => void;
}

const Form: React.FC<Props> = ({ onFormValid }) => {
    const countriesList = useSelector(getCountriesList);
    const dispatchCountries = useDispatch(fetchCountries);

    const [chosenCountries, setChosenCountries] = useState([
        { id: "sdsd", code: "PL", name: "Poland", transited: false },
        { id: "qweqw", code: "RU", name: "Russian", transited: false },
    ]);
    const [friendsList, setFriendsList] = useState<IFriend[]>([]);
    const [tripNameValue, setTripNameValue] = useState<string>("");
    const [visitedCountriesValue, setVisitedCountriesValue] = useState<string>("");
    const [startedDateValue, setStartedDateValue] = useState<Date>(getTodayDate());
    const [finishedDateValue, setFinishedDateValue] = useState<Date>(getNextDayDate(getTodayDate()));
    const [descriptionValue, setDescriptionValue] = useState<string>("");

    const handleAddFriend = useCallback(() => setFriendsList([...friendsList, getRandomFriend()]), [
        friendsList,
        setFriendsList,
    ]);
    const handleDeleteFriend = useCallback(
        (id: string) => setFriendsList([...friendsList.filter((friend: IFriend) => friend.id !== id)]),
        [friendsList, setFriendsList],
    );
    const handleCountryStatusTrigger = useCallback(
        (id: string) =>
            setChosenCountries(
                chosenCountries.map((country: ICountry) =>
                    country.id === id ? { ...country, transited: !country.transited } : country,
                ),
            ),
        [chosenCountries, setChosenCountries],
    );

    const handleTextFieldChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            switch (event.target.name) {
                case "tripName":
                    setTripNameValue(event.target.value);
                    break;
                case "visitedCountries":
                    setVisitedCountriesValue(event.target.value);
                    break;
                case "description":
                    setDescriptionValue(event.target.value);
            }
        },
        [setTripNameValue, setVisitedCountriesValue, setDescriptionValue],
    );
    const handleChangeStartedDate = useCallback((date: any) => setStartedDateValue(date), [setStartedDateValue]);
    const handleChangeFinishedDate = useCallback((date: any) => setFinishedDateValue(date), [setFinishedDateValue]);

    const isFormValid = useCallback(
        () =>
            !!tripNameValue.length &&
            !!countriesList.length &&
            !!descriptionValue.length &&
            finishedDateValue.getDate() > startedDateValue.getDate(),
        [tripNameValue, countriesList, descriptionValue, finishedDateValue, startedDateValue],
    );

    useEffect(() => {
        dispatchCountries();
        onFormValid(isFormValid());
    }, [onFormValid, isFormValid, dispatchCountries]);

    return (
        <form onSubmit={() => {}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            name="tripName"
                            variant="outlined"
                            label="Trip name"
                            value={tripNameValue}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            name="visitedCountries"
                            variant="outlined"
                            label="Visited countries"
                            value={visitedCountriesValue}
                            onChange={handleTextFieldChange}
                        />
                        <Box mt={1} display="inline-block">
                            {!!countriesList.length && (
                                <Box mb={1}>
                                    <Typography variant="body2" component="p">
                                        Click to country badge for changing to <strong>Transit</strong> status!
                                    </Typography>
                                </Box>
                            )}
                            {countriesList.map((country: ICountry) => (
                                <Box mr={1} display="inline-block" key={country.id}>
                                    <Chip
                                        label={country.name}
                                        icon={country.transited ? <ForwardRoundedIcon /> : <GpsFixedRoundedIcon />}
                                        color={country.transited ? "default" : "primary"}
                                        onClick={() => handleCountryStatusTrigger(country.id)}
                                        onDelete={() => {}}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <DatePicker
                            fullWidth
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            label="Started Date"
                            format={COMMON.DATE_FORMAT}
                            value={startedDateValue}
                            onChange={handleChangeStartedDate}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <DatePicker
                            fullWidth
                            disableToolbar
                            minDate={getNextDayDate(startedDateValue)}
                            variant="inline"
                            inputVariant="outlined"
                            label="Finished Date"
                            format={COMMON.DATE_FORMAT}
                            value={finishedDateValue}
                            onChange={handleChangeFinishedDate}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows="4"
                            variant="outlined"
                            name="description"
                            label="Description"
                            value={descriptionValue}
                            onChange={handleTextFieldChange}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            onClick={() => handleAddFriend()}
                            disabled={friendsList.length > COMMON.FRINEDS_LIMIT}
                        >
                            <AddIcon fontSize="small" /> &nbsp; Invite friend
                        </Fab>
                        {!!friendsList.length && (
                            <Box mt={2}>
                                {friendsList.map((friend: IFriend) => (
                                    <Box display="inline-block" mr={1} mb={1} key={friend.id}>
                                        <Chip
                                            avatar={<Avatar alt={friend.name} src={friend.avatarUrl} />}
                                            label={friend.name}
                                            onDelete={() => handleDeleteFriend(friend.id)}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </form>
    );
};

export default Form;
