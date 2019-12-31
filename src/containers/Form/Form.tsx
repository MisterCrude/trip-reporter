import React, { useState, useCallback } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";
import { getRandomFriend } from "@src/utils/friends";
import { IFriend } from "@src/types/common";
import { COMMON } from "@src/config";

import { TextField, Avatar, Grid, Box, Chip, Fab } from "@material-ui/core";
import {
    GpsFixedRounded as GpsFixedRoundedIcon,
    ForwardRounded as ForwardRoundedIcon,
    Add as AddIcon,
} from "@material-ui/icons";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

interface Props {
    // TODO get props form store
}

// TODO connect here, it is smart component
const Form: React.FC<Props> = () => {
    const { register, handleSubmit } = useForm();
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [transitedCountries, setTransitedCountries] = useState([]);
    const [friendsList, setFriendsList] = useState<IFriend[]>([]);

    const handleFormSubmit = (data: any) => console.log(data);
    const handleAddFriend = useCallback(() => setFriendsList([...friendsList, getRandomFriend()]), [friendsList]);
    const handleDeleteFriend = useCallback(
        (id: string) => setFriendsList([...friendsList.filter((friend: IFriend) => friend.id !== id)]),
        [friendsList],
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
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="visitedCountries"
                            label="Visited countries *"
                            inputRef={register({ required: true })}
                        />
                        <Box mt={1} display="inline-block">
                            {/* {visitedCountries.map()} */}

                            <Box mr={1} display="inline-block">
                                <Chip label="Poland" icon={<GpsFixedRoundedIcon />} onDelete={() => {}} />
                            </Box>
                            <Box mr={1} display="inline-block">
                                <Chip label="Russia" icon={<GpsFixedRoundedIcon />} onDelete={() => {}} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="transitedCountries"
                            label="Transited countries"
                            inputRef={register}
                        />
                        <Box mt={1} display="inline-block">
                            {/* {visitedCountries.map()} */}

                            <Box mr={1} display="inline-block">
                                <Chip label="Poland" icon={<ForwardRoundedIcon />} onDelete={() => {}} />
                            </Box>
                            <Box mr={1} display="inline-block">
                                <Chip label="Russia" icon={<ForwardRoundedIcon />} onDelete={() => {}} />
                            </Box>
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
