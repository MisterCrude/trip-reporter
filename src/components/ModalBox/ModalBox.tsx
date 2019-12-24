import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
            minWidth: "80vw",
            outline: "none",
        },
        content: {
            "&, &:last-child": {
                padding: theme.spacing(2, 3),
            },
        },
    }),
);

interface Props {}

const ModalBox: React.FC<Props> = () => {
    const classes = useStyles();
    const open = false;

    return (
        <Modal
            className={classes.root}
            open={open}
            onClose={() => {}}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 300,
            }}
        >
            <Fade in={open}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <h2>Transition modal</h2>
                        <p>react-transition-group animates me.</p>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    );
};

export default ModalBox;