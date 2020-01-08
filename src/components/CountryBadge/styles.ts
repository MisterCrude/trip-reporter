import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: `1px solid ${theme.palette.grey[400]}`,
        },
        chipWrapper: {
            "& > .MuiChip-root": {
                cursor: "pointer",
            },
        },
        avatarImage: {
            height: "160%",
        },
    }),
);

export default useStyles;
