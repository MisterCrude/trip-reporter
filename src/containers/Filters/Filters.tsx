import React, { useEffect, useState, useCallback, ChangeEvent } from "react";
import { useDispatch } from "@src/hooks/dispatch";

import { setFilters } from "@src/store/filters/actions";

import { TextField, Box } from "@material-ui/core";

const Filters: React.FC = () => {
    const dispatchFilters = useDispatch<typeof setFilters>(setFilters);

    const [queryString, setQueryString] = useState("");

    const handleQueryStringChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setQueryString(event.target.value);
        },
        [setQueryString],
    );

    useEffect(() => {
        dispatchFilters(queryString);
    }, [queryString, dispatchFilters]);

    return (
        <Box my={6}>
            <TextField
                fullWidth
                variant="outlined"
                label="Filter by name"
                style={{ background: "white" }}
                value={queryString}
                onChange={handleQueryStringChange}
            />
        </Box>
    );
};

export default Filters;
