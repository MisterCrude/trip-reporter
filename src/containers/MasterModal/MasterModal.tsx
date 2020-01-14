import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import { getShowModal } from "@src/store/app/selectors";
import { ITrip } from "@src/types/trip";
import { getActiveTrip, getActiveTripData } from "@src/store/trips/selectors";
import { setShowModal } from "@src/store/app/actions";
import { setShowAlert } from "@src/store/alerts/actions";
import { removeTrip, setActiveTrip } from "@src/store/trips/actions";
import { ModalTypes, AlertTypes } from "@src/types/common";

import { Backdrop, Box, Modal, Fade } from "@material-ui/core";
import DetailsModal from "@src/components/DetailsModal";
import FormModal from "@src/components/FormModal";

const MasterModal: React.FC = () => {
    const activeTripData: ITrip = useSelector(getActiveTripData);
    const showModal: ModalTypes = useSelector(getShowModal);
    const activeTripId: string = useSelector(getActiveTrip);
    const dispatchModal = useDispatch<typeof setShowModal>(setShowModal);
    const dispatchRemoveTrip = useDispatch<typeof removeTrip>(removeTrip);
    const dispatchActiveTrip = useDispatch<typeof setActiveTrip>(setActiveTrip);
    const dispatchShowAlert = useDispatch<typeof setShowAlert>(setShowAlert);

    const handleClose = useCallback(() => dispatchModal(), [dispatchModal]);
    const handleEdit = useCallback(() => dispatchModal(ModalTypes.MODAL_EDIT), [dispatchModal]);
    const handleDelete = useCallback(
        (tripName: string) => {
            dispatchRemoveTrip(activeTripId);
            handleClose();
            dispatchShowAlert({
                showAlert: AlertTypes.ALERT_SHOWN,
                message: `Trip "${tripName}" was successfully deleted!`,
            });
        },
        [dispatchRemoveTrip, activeTripId, handleClose, dispatchShowAlert],
    );

    useEffect(() => {
        showModal === ModalTypes.NONE && dispatchActiveTrip("");
    }, [showModal, dispatchActiveTrip]);

    return (
        <Modal
            open={showModal !== ModalTypes.NONE}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 300,
            }}
        >
            <Fade in={showModal !== ModalTypes.NONE}>
                <Box>
                    {showModal === ModalTypes.MODAL_DETAILS && (
                        <DetailsModal
                            onCloseModal={handleClose}
                            onEditTrip={handleEdit}
                            onDeleteTrip={handleDelete}
                            activeTripData={activeTripData}
                        />
                    )}
                    {showModal === ModalTypes.MODAL_EDIT && (
                        <FormModal editModalData={activeTripData} onCloseModal={handleClose} />
                    )}
                    {showModal === ModalTypes.MODAL_ADD && <FormModal onCloseModal={handleClose} />}
                </Box>
            </Fade>
        </Modal>
    );
};

export default MasterModal;
