import React, { useState, useCallback, useEffect, ChangeEvent, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import DateFnsUtils from "@date-io/date-fns";
import { getRandomFriend } from "@src/utils/friends";
import { getTodayDate, getNextDayDate, getDaysDifference } from "@src/utils/dates";
import { IFriend } from "@src/types/common";
import { ICountry } from "@src/types/countries";
import { getCountriesList } from "@src/store/countries/selectors";
import { addTrip } from "@src/store/trips/actions";
import { COMMON } from "@src/config";

import { Autocomplete } from "@material-ui/lab";
import { TextField, Avatar, Grid, Box, Chip, Fab, Typography } from "@material-ui/core";
import {
    GpsFixedRounded as GpsFixedRoundedIcon,
    ForwardRounded as ForwardRoundedIcon,
    Add as AddIcon,
} from "@material-ui/icons";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

interface Props {
    onFormValid: (state: boolean) => void;
    saveForm: boolean;
    onClose: () => void;
}

const Form: React.FC<Props> = ({ onFormValid, saveForm, onClose }) => {
    const countriesList = useSelector(getCountriesList);
    const dispatchAddTrip = useDispatch<typeof addTrip>(addTrip);

    const [transitedCountries, setTransitedCountries] = useState<string[]>([]);
    const [chosenCountries, setChosenCountries] = useState<ICountry[]>([]);
    const [friendsList, setFriendsList] = useState<IFriend[]>([]);
    const [tripNameValue, setTripNameValue] = useState<string>("");
    const [startedDateValue, setStartedDateValue] = useState<Date>(getTodayDate());
    const [finishedDateValue, setFinishedDateValue] = useState<Date>(getNextDayDate(getTodayDate()));
    const [descriptionValue, setDescriptionValue] = useState<string>("");

    const isCountryTransited = useCallback((id: string) => transitedCountries.indexOf(id) > -1, [transitedCountries]);
    const isFormValid = useCallback(
        () =>
            !!tripNameValue.length &&
            !!chosenCountries.length &&
            !!descriptionValue.length &&
            finishedDateValue.getDate() > startedDateValue.getDate(),
        [tripNameValue, chosenCountries, descriptionValue, finishedDateValue, startedDateValue],
    );

    const handleAddFriend = useCallback(() => setFriendsList([...friendsList, getRandomFriend()]), [
        friendsList,
        setFriendsList,
    ]);
    const handleDeleteFriend = useCallback(
        (id: string) => setFriendsList([...friendsList.filter((friend: IFriend) => friend.id !== id)]),
        [friendsList, setFriendsList],
    );
    const handleTransitTrigger = useCallback(
        (id: string, event: MouseEvent) => {
            event.stopPropagation();
            setTransitedCountries(
                isCountryTransited(id)
                    ? transitedCountries.filter(filteredId => filteredId !== id)
                    : [...transitedCountries, id],
            );
        },
        [transitedCountries, setTransitedCountries, isCountryTransited],
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

    useEffect(() => onFormValid(isFormValid()), [onFormValid, isFormValid]);
    useEffect(() => {
        if (chosenCountries.length) setTransitedCountries([]);
    }, [chosenCountries, setTransitedCountries]);
    useEffect(() => {
        if (saveForm) {
            dispatchAddTrip({
                name: tripNameValue,
                visitedCountries: chosenCountries.map(country => country.id),
                started: startedDateValue,
                finished: finishedDateValue,
                duration: getDaysDifference(startedDateValue, finishedDateValue),
                description: descriptionValue,
                friends: friendsList,
                transitedCountries: transitedCountries,
            });
            onClose();
        }
    }, [
        saveForm,
        dispatchAddTrip,
        onClose,
        tripNameValue,
        chosenCountries,
        startedDateValue,
        finishedDateValue,
        descriptionValue,
        friendsList,
        transitedCountries,
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
                        renderTags={(value: ICountry[], getTagProps) =>
                            value.map(({ id, name }: ICountry, index: number) => (
                                <Chip
                                    key={id}
                                    label={name}
                                    {...getTagProps({ index })}
                                    icon={isCountryTransited(id) ? <ForwardRoundedIcon /> : <GpsFixedRoundedIcon />}
                                    color={isCountryTransited(id) ? "default" : "primary"}
                                    onClick={(event: MouseEvent) => {
                                        handleTransitTrigger(id, event);
                                    }}
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
    );
};

export default Form;
