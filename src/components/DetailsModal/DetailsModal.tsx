import React, { memo, useCallback, MouseEvent } from "react";
import { Maybe } from "true-myth";
import { ITrip } from "@src/types/trip";
import { IFriend } from "@src/types/common";
import { ICountry } from "@src/types/countries";
import { convertTimeStamp } from "@src/utils/dates";
import useStyles from "./styles";

import {
    Card,
    CardContent,
    Box,
    Chip,
    Typography,
    Divider,
    Button,
    IconButton,
    Popover,
    List,
    ListItem,
    Avatar,
} from "@material-ui/core";
import {
    QueryBuilder as QueryBuilderIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@material-ui/icons";
import CountryBadge from "@src/components/CountryBadge";

interface Props {
    activeTripData: ITrip | null;
    onCloseModal: () => void;
    onEditTrip: () => void;
    onDeleteTrip: (tripName: string) => void;
}

const DetailsModal: React.FC<Props> = memo(({ onCloseModal, onEditTrip, onDeleteTrip, activeTripData }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const classes = useStyles();

    const handleEditClick = useCallback(() => {
        onEditTrip();
        setAnchorEl(null);
    }, [onEditTrip, setAnchorEl]);

    const handleDeleteClick = useCallback(
        (tripName: string) => {
            onDeleteTrip(tripName);
            setAnchorEl(null);
        },
        [onDeleteTrip, setAnchorEl],
    );

    const handleOpenPopover = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        },
        [setAnchorEl],
    );
    const handleClosePopover = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const isCountryTransited = (transited: string[], id: string) => transited.indexOf(id) > -1;
    const daysPluration = (duration: number) => (duration > 1 ? `${duration} days` : `${duration} day`);

    return (
        <Card className={classes.root}>
            {Maybe.of<ITrip>(activeTripData)
                .map((data: ITrip) => (
                    <>
                        <CardContent className={classes.content}>
                            <Box display="flex" mb={3}>
                                <Typography variant="h5" component="h2" className={classes.title}>
                                    {data.name}
                                </Typography>
                            </Box>

                            <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
                                <Chip
                                    className={classes.marginRight}
                                    icon={<QueryBuilderIcon />}
                                    label={
                                        <>
                                            <strong>{convertTimeStamp(data.started)}</strong>
                                            <> - </>
                                            <strong>{convertTimeStamp(data.finished)}</strong>
                                        </>
                                    }
                                    variant="outlined"
                                />
                                <Typography variant="body1" component="p">
                                    <strong>Duration:</strong> {daysPluration(data.duration)}
                                </Typography>
                            </Box>

                            <Box my={4}>
                                <Typography variant="body1" component="p">
                                    {data.description}
                                </Typography>
                            </Box>

                            {!!data.visitedCountries.length && (
                                <Box mt={4}>
                                    <Box display="flex" alignItems="center" mb={3}>
                                        <Typography variant="h6" component="h3">
                                            Visited countries
                                        </Typography>
                                        <Divider className={classes.divider} />
                                    </Box>

                                    {data.visitedCountries.map((country: ICountry) => (
                                        <Box display="inline-block" mr={1} mb={1} key={country.id}>
                                            <CountryBadge key={country.id} countryData={country} isTransited={false} />
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            {!!data.transitedCountries.length && (
                                <Box mt={4}>
                                    <Box display="flex" alignItems="center" mb={3}>
                                        <Typography variant="h6" component="h3">
                                            Transites countries
                                        </Typography>
                                        <Divider className={classes.divider} />
                                    </Box>

                                    {data.visitedCountries.map((country: ICountry) => (
                                        <Box key={country.id} display="inline-block">
                                            {isCountryTransited(data.transitedCountries, country.id) && (
                                                <Box display="inline-block" mr={1} mb={1} key={country.id}>
                                                    <CountryBadge countryData={country} isTransited={true} />
                                                </Box>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            {!!data.friends.length && (
                                <Box mt={4}>
                                    <Box display="flex" alignItems="center" mb={3}>
                                        <Typography variant="h6" component="h3">
                                            Friends list
                                        </Typography>
                                        <Divider className={classes.divider} />
                                    </Box>

                                    {data.friends.map((friend: IFriend) => (
                                        <Box display="inline-block" mr={1} mb={1} key={friend.id}>
                                            <Chip
                                                avatar={<Avatar alt={friend.name} src={friend.avatarUrl} />}
                                                label={friend.name}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                        <Divider />
                        <CardContent className={classes.footer}>
                            <Button variant="outlined" onClick={onCloseModal} size="large">
                                Close
                            </Button>
                            <IconButton color="primary" onClick={handleOpenPopover}>
                                <MoreVertIcon />
                            </IconButton>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClosePopover}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                className={classes.popover}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                <List>
                                    <ListItem button className={classes.editIcon} onClick={handleEditClick}>
                                        <EditIcon /> Eidt
                                    </ListItem>
                                    <ListItem
                                        button
                                        className={classes.deleteIcon}
                                        onClick={() => handleDeleteClick(data.name)}
                                    >
                                        <DeleteIcon /> Delete
                                    </ListItem>
                                </List>
                            </Popover>
                        </CardContent>
                    </>
                ))
                .unwrapOr(
                    <Typography variant="h5" component="h2" className={classes.title}>
                        No any data!
                    </Typography>,
                )}
        </Card>
    );
});

export default DetailsModal;
