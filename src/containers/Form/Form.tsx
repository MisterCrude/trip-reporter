import React, { useState, useCallback, useEffect, ChangeEvent, MouseEvent } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import { getRandomFriend } from "@src/utils/friends";
import { getTodayDate, getDaysDifference } from "@src/utils/dates";
import { IFriend, AlertTypes } from "@src/types/common";
import { ICountry } from "@src/types/countries";
import { ITrip } from "@src/types/trip";
import { getCountriesList } from "@src/store/countries/selectors";
import { addTrip, editTrip } from "@src/store/trips/actions";
import { setShowAlert } from "@src/store/alerts/actions";
import { COMMON } from "@src/config";

import { Autocomplete } from "@material-ui/lab";
import { TextField, Avatar, Grid, Box, Chip, Fab, Typography, CircularProgress } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CountryBadge from "@src/components/CountryBadge";

interface Props {
    saveForm: boolean;
    onFormValid: (state: boolean) => void;
    onClose: () => void;
    initialData?: ITrip;
}

const Form: React.FC<Props> = ({ onFormValid, saveForm, onClose, initialData }) => {
    const countriesList: ICountry[] = useSelector(getCountriesList);
    const dispatchAddTrip = useDispatch<typeof addTrip>(addTrip);
    const dispatchEditTrip = useDispatch<typeof editTrip>(editTrip);
    const dispatchShowAlert = useDispatch<typeof setShowAlert>(setShowAlert);

    const [loadingFriendId, setLoadingFriendId] = useState<string>("");
    const [transitedCountriesId, setTransitedCountriesId] = useState<string[]>([]);
    const [chosenCountries, setChosenCountries] = useState<ICountry[]>([]);
    const [friendsList, setFriendsList] = useState<IFriend[]>([]);
    const [tripNameValue, setTripNameValue] = useState<string>("");
    const [startedDateValue, setStartedDateValue] = useState<Date>(getTodayDate());
    const [finishedDateValue, setFinishedDateValue] = useState<Date>(getTodayDate());
    const [descriptionValue, setDescriptionValue] = useState<string>("");

    const isCountryTransited = useCallback((id: string) => transitedCountriesId.indexOf(id) > -1, [
        transitedCountriesId,
    ]);
    const isFormValid = useCallback(
        () =>
            !!tripNameValue.length &&
            !!chosenCountries.length &&
            !!descriptionValue.length &&
            finishedDateValue.getDate() >= startedDateValue.getDate(),
        [tripNameValue, chosenCountries, descriptionValue, finishedDateValue, startedDateValue],
    );

    const handleAddFriend = useCallback(() => {
        const newFriend = getRandomFriend();

        setLoadingFriendId(newFriend.id);
        setFriendsList([...friendsList, newFriend]);
    }, [friendsList, setFriendsList, setLoadingFriendId]);
    const handleDeleteFriend = useCallback(
        (id: string) => setFriendsList([...friendsList.filter((friend: IFriend) => friend.id !== id)]),
        [friendsList, setFriendsList],
    );
    const handleTransitedTrigger = useCallback(
        (id: string, event: MouseEvent) => {
            event.stopPropagation();

            setTransitedCountriesId(
                isCountryTransited(id)
                    ? transitedCountriesId.filter(filteredId => filteredId !== id)
                    : [...transitedCountriesId, id],
            );
        },
        [transitedCountriesId, setTransitedCountriesId, isCountryTransited],
    );
    const handleTextFieldChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            switch (event.target.name) {
                case "tripName":
                    setTripNameValue(event.target.value);
                    break;

                case "description":
                    setDescriptionValue(event.target.value);
            }
        },
        [setTripNameValue, setDescriptionValue],
    );
    const handleChangeStartedDate = useCallback((date: any) => setStartedDateValue(date), [setStartedDateValue]);
    const handleChangeFinishedDate = useCallback((date: any) => setFinishedDateValue(date), [setFinishedDateValue]);
    const handleChangeChosenCountries = useCallback((event: any, value: ICountry[]) => setChosenCountries(value), [
        setChosenCountries,
    ]);

    useEffect(() => {
        if (initialData) {
            const { name, visitedCountries, transitedCountries, started, finished, description, friends } = initialData;

            setTripNameValue(name);
            setChosenCountries(visitedCountries);
            setTransitedCountriesId(transitedCountries);
            setStartedDateValue(new Date(started));
            setFinishedDateValue(new Date(finished));
            setDescriptionValue(description);
            setFriendsList(friends);
        }
    }, [initialData]);
    useEffect(() => onFormValid(isFormValid()), [onFormValid, isFormValid]);
    useEffect(() => {
        if (saveForm) {
            const tripData = {
                name: tripNameValue,
                visitedCountries: chosenCountries,
                transitedCountries: transitedCountriesId,
                started: startedDateValue.getTime(),
                finished: finishedDateValue.getTime(),
                duration: getDaysDifference(startedDateValue, finishedDateValue),
                description: descriptionValue,
                friends: friendsList,
            };

            initialData ? dispatchEditTrip({ id: initialData.id, ...tripData }) : dispatchAddTrip(tripData);

            dispatchShowAlert({
                showAlert: AlertTypes.ALERT_SHOWN,
                message: `Trip was successfully saved!`,
            });
            onClose();
        }
    }, [
        initialData,
        saveForm,
        dispatchEditTrip,
        dispatchAddTrip,
        onClose,
        tripNameValue,
        chosenCountries,
        startedDateValue,
        finishedDateValue,
        descriptionValue,
        friendsList,
        transitedCountriesId,
        dispatchShowAlert,
    ]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={4}>
                <Grid item md={12}>
                    <TextField
                        fullWidth
                        name="tripName"
                        variant="outlined"
                        label={
                            <>
                                Trip name
                                <Box color="secondary.main" display="inline" fontWeight="fontWeightBold">
                                    &nbsp;*
                                </Box>
                            </>
                        }
                        value={tripNameValue}
                        onChange={handleTextFieldChange}
                    />
                </Grid>
                <Grid item md={12}>
                    <Autocomplete
                        multiple
                        value={chosenCountries}
                        onChange={handleChangeChosenCountries}
                        options={countriesList}
                        getOptionLabel={(option: ICountry) => option.name}
                        renderTags={(countries: ICountry[], getTagProps) =>
                            countries.map((country: ICountry, index: number) => (
                                <CountryBadge
                                    key={country.id}
                                    countryData={country}
                                    isTransited={isCountryTransited(country.id)}
                                    tagProps={getTagProps({ index })}
                                    onClick={handleTransitedTrigger}
                                />
                            ))
                        }
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={
                                    <>
                                        Visited countries
                                        <Box color="secondary.main" display="inline" fontWeight="fontWeightBold">
                                            &nbsp;*
                                        </Box>
                                    </>
                                }
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    {!!chosenCountries.length && (
                        <Box my={1}>
                            <Typography variant="body2" component="p">
                                Click to country badge for changing to <strong>Transit</strong> status!
                            </Typography>
                        </Box>
                    )}
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
                        minDate={startedDateValue}
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
                        label={
                            <>
                                Description
                                <Box color="secondary.main" display="inline" fontWeight="fontWeightBold">
                                    &nbsp;*
                                </Box>
                            </>
                        }
                        value={descriptionValue}
                        onChange={handleTextFieldChange}
                    />
                </Grid>
                <Grid item md={12}>
                    <Box mb={2}>
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            onClick={() => handleAddFriend()}
                            disabled={friendsList.length > COMMON.FRINEDS_LIMIT || !!loadingFriendId}
                        >
                            {!!loadingFriendId ? (
                                <>
                                    <CircularProgress size={20} /> &nbsp; Waiting for response...
                                </>
                            ) : (
                                <>
                                    <AddIcon fontSize="small" /> &nbsp; Invite friend
                                </>
                            )}
                        </Fab>
                    </Box>
                    {friendsList.map((friend: IFriend) => (
                        <Box
                            display={friend.id === loadingFriendId ? "none" : "inline-block"}
                            mr={1}
                            mb={1}
                            key={friend.id}
                        >
                            <Chip
                                avatar={
                                    <Avatar
                                        alt={friend.name}
                                        src={friend.avatarUrl}
                                        onLoad={() => setLoadingFriendId("")}
                                    />
                                }
                                label={friend.name}
                                onDelete={() => handleDeleteFriend(friend.id)}
                            />
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
};

export default Form;
