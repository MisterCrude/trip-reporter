import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@src/hooks/dispatch";
import CssBaseline from "@material-ui/core/CssBaseline";

import { getShowModal } from "@src/store/app/selectors";
import { setShowModal } from "@src/store/app/actions";
import { Container, Box } from "@material-ui/core";
import ModalBox from "@src/components/ModalBox";
import TripList from "@src/containers/TripList";
import Filters from "@src/containers/Filters";

const App: React.FC = () => {
    const showModal = useSelector(getShowModal);
    const triggerModal = useDispatch<typeof setShowModal>(setShowModal);

    return (
        <Box px={2} py={4} component="main">
            <CssBaseline />
            <Container>
                <main>
                    <Filters />
                    <TripList />
                </main>
            </Container>
            <ModalBox showModal={showModal} onShowModal={triggerModal} />
        </Box>
    );
};

export default App;
