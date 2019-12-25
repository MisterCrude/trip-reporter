import React, { memo, useCallback } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
    Card,
    CardContent,
    Box,
    Chip,
    Typography,
    Divider,
    Button,
    IconButton,
    Popover,
    List,
    ListItem,
} from "@material-ui/core";
import {
    QueryBuilder as QueryBuilderIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@material-ui/icons";
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

        // TODO move inside
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
        footer: {
            "&, &:last-child": {
                padding: theme.spacing(2),
            },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        popover: {
            padding: theme.spacing(2),
        },
        editIcon: {
            "& > svg": {
                marginRight: theme.spacing(2),
            },
            color: theme.palette.primary.main,
        },
        deleteIcon: {
            "& > svg": {
                marginRight: theme.spacing(2),
            },
            color: theme.palette.secondary.dark,
        },
        marginRight: {
            marginRight: theme.spacing(2),
        },
        // TODO env^
    }),
);

interface Props {
    showModal: boolean;
    onShowModal: (show?: boolean) => void;
}

const ModalBox: React.FC<Props> = memo(({ showModal, onShowModal }) => {
    const classes = useStyles();

    const handleCloseModal = useCallback(() => onShowModal(false), [onShowModal]);

    // TODO move inside
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleOpenPopover = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        },
        [setAnchorEl],
    );
    const handleClosePopover = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);
    const open = Boolean(anchorEl);
    // TODO end^

    return (
        <Modal
            className={classes.root}
            open={showModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 300,
            }}
        >
            <Fade in={showModal}>
                {/* TODO move inside */}
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Box display="flex" mb={2}>
                            <Typography variant="h4" component="h2">
                                Transition modal
                            </Typography>
                        </Box>
                        <Box>
                            <Chip
                                className={classes.marginRight}
                                icon={<QueryBuilderIcon />}
                                label={
                                    <>
                                        <strong>12.12.2019</strong> - <strong>01.01.2020</strong>
                                    </>
                                }
                                variant="outlined"
                            />
                            <Chip label="20 days" color="primary" />
                        </Box>

                        <p>react-transition-group animates me.</p>
                    </CardContent>
                    <Divider />
                    <CardContent className={classes.footer}>
                        <Button variant="outlined" onClick={handleCloseModal} size="large">
                            Close
                        </Button>
                        <IconButton color="primary" onClick={handleOpenPopover}>
                            <MoreVertIcon />
                        </IconButton>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            className={classes.popover}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <List>
                                <ListItem button className={classes.editIcon}>
                                    <EditIcon /> Eidt
                                </ListItem>
                                <ListItem button className={classes.deleteIcon}>
                                    <DeleteIcon /> Delete
                                </ListItem>
                            </List>
                        </Popover>
                    </CardContent>
                </Card>
                {/* TODO end^ */}
            </Fade>
        </Modal>
    );
});

export default ModalBox;
