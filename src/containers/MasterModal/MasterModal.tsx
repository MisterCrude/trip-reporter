import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import { getShowModal } from "@src/store/app/selectors";
import { setShowModal } from "@src/store/app/actions";

import DetailsModal from "@src/components/DetailsModal";

const MasterModal: React.FC = () => {
    const showModal = useSelector(getShowModal);
    const triggerModal = useDispatch<typeof setShowModal>(setShowModal);
    const handleClose = useCallback(() => triggerModal(false), [triggerModal]);

    return <DetailsModal onCloseModal={handleClose} showModal={showModal} />;
};

export default MasterModal;
