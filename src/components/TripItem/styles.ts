import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
                transform: "scale(1.01)",
                boxShadow: theme.shadows[3],
            },
        },
        content: {
            "&, &:last-child": {
                padding: theme.spacing(3, 4),
            },
        },
        footer: {
            background: theme.palette.grey[50],
            "&, &:last-child": {
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(1),
                paddingLeft: theme.spacing(4),
                paddingRight: theme.spacing(4),
            },
        },
        description: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
        },
        chipTick: {
            color: green[500],
        },
    }),
);

export default useStyles;
