import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Container } from "@material-ui/core";
import ModalBox from "@src/components/ModalBox";
import TripList from "@src/containers/TripList";

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Container>
                <main>
                    <TripList />
                </main>
            </Container>
            <ModalBox />
        </>
    );
};

export default App;
