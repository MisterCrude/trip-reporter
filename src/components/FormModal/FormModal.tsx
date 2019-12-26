import React, { memo } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, CardContent, Fade, Backdrop, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        card: {
            boxShadow: theme.shadows[3],
            minWidth: "70vw",
            outline: "none",
        },
        content: {
            "&, &:last-child": {
                padding: theme.spacing(3, 4),
            },
        },
    }),
);

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
