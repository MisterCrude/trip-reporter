import React, { memo } from "react";
import { Maybe } from "true-myth";
import useStyles from "./styles";

import { Card, CardContent, Fade, Backdrop, Modal, Button, Divider, Box, Typography } from "@material-ui/core";
import Form from "@src/containers/Form";

interface Props {
    showModal: boolean;
    onCloseModal: () => void;
    isEditModal?: boolean;
}

const FormModal: React.FC<Props> = memo(({ onCloseModal, showModal, isEditModal }) => {
    const classes = useStyles();

    const isEditModalType = Maybe.of(isEditModal);

    return (
        // TODO try to move it to MasterModal
        <Modal
            className={classes.root}
            open={showModal}
            onClose={onCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 300,
            }}
        >
            <Fade in={showModal}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Box display="flex" mb={3}>
                            <Typography variant="h5" component="h2" className={classes.title}>
                                {isEditModalType.map(() => "Edit").unwrapOr("Create new")} trip
                            </Typography>
                        </Box>
                        <Form />
                    </CardContent>
                    <Divider />
                    <CardContent className={classes.footer}>
                        <Button variant="outlined" size="large" onClick={onCloseModal}>
                            Close
                        </Button>
                        <Button variant="contained" size="large" className={classes.saveButton}>
                            Save
                        </Button>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    );
});

export default FormModal;
