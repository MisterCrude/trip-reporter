import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Container, Box } from "@material-ui/core";
import ModalBox from "@src/components/ModalBox";
import TripList from "@src/containers/TripList";
import Filters from "@src/containers/Filters";

interface Props {
    // TODO get props form store
}

// TODO connect here, it is smart component
const App: React.FC = () => {
    return (
        <Box px={2} py={4} component="main">
            <CssBaseline />
            <Container>
                <main>
                    <Filters />
                    <TripList />
                </main>
            </Container>
            <ModalBox />
        </Box>
    );
};

export default App;
