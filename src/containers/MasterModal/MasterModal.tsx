import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import { getShowModal } from "@src/store/app/selectors";
import { setShowModal } from "@src/store/app/actions";
import { ModalTypes } from "@src/types/app";

import DetailsModal from "@src/components/DetailsModal";
import FormModal from "@src/components/FormModal";

const MasterModal: React.FC = () => {
    const showModal = useSelector(getShowModal);
    const triggerModal = useDispatch<typeof setShowModal>(setShowModal);
    const handleClose = useCallback(() => triggerModal(ModalTypes.NONE), [triggerModal]);

    // TODO Check in lifecicle id of edit trip

    return (
        <>
            <DetailsModal onCloseModal={handleClose} showModal={showModal === ModalTypes.MODAL_DETAILS} />
            <FormModal isEditModal onCloseModal={handleClose} showModal={showModal === ModalTypes.MODAL_EDIT} />
            <FormModal onCloseModal={handleClose} showModal={showModal === ModalTypes.MODAL_ADD} />
        </>
    );
};

export default MasterModal;
