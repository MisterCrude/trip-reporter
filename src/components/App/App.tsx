import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./styles";

import { Container, Box } from "@material-ui/core";
import MasterModal from "@src/containers/MasterModal";
import TripList from "@src/containers/TripList";
import Filters from "@src/containers/Filters";

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <Box px={2} py={4} component="main">
            <CssBaseline />
            <Container>
                <main>
                    <Filters />
                    <TripList />
                </main>
            </Container>
            <MasterModal />
        </Box>
    );
};

export default App;
