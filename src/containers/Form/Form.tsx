import React, { useState, useCallback } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";
import { getRandomFriend } from "@src/utils/friends";
import { IFriend } from "@src/types/common";
import { ICountry } from "@src/types/countries";
import { COMMON } from "@src/config";

import { TextField, Avatar, Grid, Box, Chip, Fab, Typography } from "@material-ui/core";
import {
    GpsFixedRounded as GpsFixedRoundedIcon,
    ForwardRounded as ForwardRoundedIcon,
    Add as AddIcon,
} from "@material-ui/icons";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

interface Props {
    // TODO get props form store
}

type FormData = {
    // firstName: string;
    // lastName: string;
};

// TODO connect here, it is smart component
const Form: React.FC<Props> = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [countriesList, setCountriesList] = useState<ICountry[]>([
        { id: "sdsd", code: "PL", name: "Poland", transited: false },
        { id: "qweqw", code: "RU", name: "Russian", transited: false },
    ]);
    const [friendsList, setFriendsList] = useState<IFriend[]>([]);

    const handleFormSubmit = (data: any) => console.log(data);
    const handleAddFriend = useCallback(() => setFriendsList([...friendsList, getRandomFriend()]), [friendsList]);
    const handleDeleteFriend = useCallback(
        (id: string) => setFriendsList([...friendsList.filter((friend: IFriend) => friend.id !== id)]),
        [friendsList],
    );
    const handleTransitedTrigger = useCallback(
        (id: string) =>
            setCountriesList(
                countriesList.map((country: ICountry) =>
                    country.id === id ? { ...country, transited: !country.transited } : country,
                ),
            ),
        [countriesList],
    );

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="tripName"
                            label="Trip name *"
                            inputRef={register({ required: true })}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="visitedCountries"
                            label="Visited countries *"
                            inputRef={register({ required: true })}
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
                                <Box mr={1} display="inline-block">
                                    <Chip
                                        key={country.id}
                                        label={country.name}
                                        icon={country.transited ? <ForwardRoundedIcon /> : <GpsFixedRoundedIcon />}
                                        color={country.transited ? "inherit" : "primary"}
                                        onClick={() => handleTransitedTrigger(country.id)}
                                        onDelete={() => {}}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <KeyboardDatePicker
                            fullWidth
                            disableToolbar
                            name="startedDate"
                            variant="inline"
                            inputVariant="outlined"
                            label="Started Date *"
                            format="MM/dd/yyyy"
                            value={new Date("2014-08-18T21:11:54")}
                            onChange={() => {}}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <KeyboardDatePicker
                            fullWidth
                            disableToolbar
                            name="finishedDate"
                            variant="inline"
                            inputVariant="outlined"
                            label="Finished Date *"
                            format="MM/dd/yyyy"
                            value={new Date("2014-08-18T21:11:54")}
                            onChange={() => {}}
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
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            onClick={handleAddFriend}
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
