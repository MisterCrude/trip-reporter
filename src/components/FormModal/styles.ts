import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowY: "auto",
            paddingRight: theme.spacing(0, 3),
        },
        card: {
            boxShadow: theme.shadows[3],
            maxWidth: "80vw",
            width: "1000px",
            outline: "none",
            position: "absolute",
            top: theme.spacing(6),
            marginBottom: theme.spacing(6),
        },
        title: {
            textTransform: "uppercase",
            margin: theme.spacing(1, 0),
        },
        content: {
            "&, &:last-child": {
                padding: theme.spacing(4),
            },
        },
        saveButton: {
            backgroundColor: green[500],
            color: "white",
            "&:hover": {
                backgroundColor: green[600],
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
    }),
);

export default useStyles;
