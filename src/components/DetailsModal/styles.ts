import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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
        footer: {
            "&, &:last-child": {
                padding: theme.spacing(2, 4),
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
    }),
);

export default useStyles;
