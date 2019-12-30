import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";

import { TextField, Chip, Grid, Box } from "@material-ui/core";
import { GpsFixedRounded as GpsFixedRoundedIcon, ForwardRounded as ForwardRoundedIcon } from "@material-ui/icons";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

interface Props {
    // TODO get props form store
}

// TODO connect here, it is smart component
const Form: React.FC<Props> = () => {
    const { register, handleSubmit } = useForm();
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [transitedCountries, setTransitedCountries] = useState([]);

    const handleFormSubmit = (data: any) => console.log(data);

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
                </Grid>
            </MuiPickersUtilsProvider>
        </form>
    );
};

export default Form;
