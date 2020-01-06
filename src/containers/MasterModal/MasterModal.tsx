import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import { getShowModal } from "@src/store/app/selectors";
import { setShowModal } from "@src/store/app/actions";
import { ModalTypes } from "@src/types/common";

import { Backdrop, Box, Modal, Fade } from "@material-ui/core";
import DetailsModal from "@src/components/DetailsModal";
import FormModal from "@src/components/FormModal";

const MasterModal: React.FC = () => {
    const showModal: ModalTypes = useSelector(getShowModal);
    const triggerModal = useDispatch<typeof setShowModal>(setShowModal);
    const handleClose = useCallback(() => triggerModal(ModalTypes.NONE), [triggerModal]);

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
                    {showModal === ModalTypes.MODAL_DETAILS && <DetailsModal onCloseModal={handleClose} />}
                    {showModal === ModalTypes.MODAL_EDIT && <FormModal isEditModal onCloseModal={handleClose} />}
                    {showModal === ModalTypes.MODAL_ADD && <FormModal onCloseModal={handleClose} />}
                </Box>
            </Fade>
        </Modal>
    );
};

export default MasterModal;
