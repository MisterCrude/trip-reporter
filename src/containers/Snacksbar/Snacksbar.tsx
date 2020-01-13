import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import { IAlertState } from "@src/store/alerts";
import { setHideAlert } from "@src/store/alerts/actions";
import { getAlertState } from "@src/store/alerts/selectors";
import { AlertTypes } from "@src/types/common";

import { Box, Snackbar, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { Done as IconDone } from "@material-ui/icons";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Snacksbar: React.FC = () => {
    const alertState: IAlertState = useSelector(getAlertState);

    const dispatchHideAlert = useDispatch<typeof setHideAlert>(setHideAlert);

    const isOpen = useMemo(() => alertState.showAlert === AlertTypes.ALERT_SHOWN, [alertState]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(dispatchHideAlert, 3000);
        }
    }, [isOpen, dispatchHideAlert]);

    return (
        <Box>
            <Snackbar
                open={isOpen}
                message={
                    <Box display="flex" alignItems="center">
                        <IconDone /> &nbsp; {alertState.message}
                    </Box>
                }
                TransitionComponent={Transition}
            />
        </Box>
    );
};

export default Snacksbar;
