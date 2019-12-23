import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Container } from "@material-ui/core";
import TripList from "@src/components/TripList";

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Container>
                <main>
                    <TripList />
                </main>
            </Container>
        </>
    );
};

export default App;
