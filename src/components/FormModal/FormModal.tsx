import React, { memo } from "react";
import useStyles from "./styles";

import { Card, CardContent, Fade, Backdrop, Modal } from "@material-ui/core";

interface Props {
    showModal: boolean;
    onCloseModal: () => void;
}

const FormModal: React.FC<Props> = memo(({ onCloseModal, showModal }) => {
    const classes = useStyles();

    return (
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
                        <p>Edit modal</p>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    );
});

export default FormModal;
