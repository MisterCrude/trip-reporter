import React, { useCallback } from "react";
import { useDispatch } from "@src/hooks/dispatch";
import { setShowModal } from "@src/store/app/actions";
import { ModalTypes } from "@src/types/app";
import uuid from "uuid/v1";

import { Button } from "@material-ui/core";

const Panel: React.FC = () => {
    const triggerModal = useDispatch<typeof setShowModal>(setShowModal);

    const handleAddClick = useCallback(() => triggerModal(ModalTypes.MODAL_ADD), [triggerModal]);

    return (
        <>
            <Button onClick={handleAddClick} size="large" variant="contained" color="primary">
                Create new trip
            </Button>
        </>
    );
};

export default Panel;
