import React, { memo, useState, useCallback } from "react";
import { ITrip } from "@src/types/trip";
import { Maybe } from "true-myth";
import useStyles from "./styles";

import { Card, CardContent, Button, Divider, Box, Typography } from "@material-ui/core";
import Form from "@src/containers/Form";

interface Props {
    onCloseModal: () => void;
    editModalData?: ITrip;
}

const FormModal: React.FC<Props> = memo(({ onCloseModal, editModalData }) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [hasSaveForm, setHasSaveForm] = useState<boolean>(false);

    const classes = useStyles();

    const isEditModalType = Maybe.of<ITrip>(editModalData);

    const handleSave = useCallback(() => {
        setHasSaveForm(true);
    }, [setHasSaveForm]);

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Box display="flex" mb={3}>
                    <Typography variant="h5" component="h2" className={classes.title}>
                        {isEditModalType.map(() => "Edit").unwrapOr("Create new")} trip
                    </Typography>
                </Box>
                <Form
                    onFormValid={setIsFormValid}
                    saveForm={hasSaveForm}
                    onClose={onCloseModal}
                    initialData={editModalData}
                />
            </CardContent>
            <Divider />
            <CardContent className={classes.footer}>
                <Button variant="outlined" size="large" onClick={onCloseModal}>
                    Close
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    className={classes.saveButton}
                    disabled={!isFormValid}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </CardContent>
        </Card>
    );
});

export default FormModal;
