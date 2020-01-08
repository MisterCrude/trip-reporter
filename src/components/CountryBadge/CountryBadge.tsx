import React, { memo, MouseEvent } from "react";
import { ICountry } from "@src/types/countries";
import { getFlagUrlByCode } from "@src/utils/countries";
import useStyles from "./styles";

import { Chip, Avatar } from "@material-ui/core";

interface Props {
    countryData: ICountry;
    isTransited: boolean;
    tagProps?: any;
    onClick?: (id: string, event: MouseEvent) => void;
}

const CountryBadge: React.FC<Props> = memo(({ countryData, onClick, isTransited, tagProps }) => {
    const classes = useStyles();

    const renderChip = (): JSX.Element => (
        <Chip
            label={isTransited ? countryData.name : <strong>{countryData.name}</strong>}
            variant={isTransited ? "outlined" : "default"}
            classes={{ root: classes.root }}
            avatar={
                <Avatar
                    src={getFlagUrlByCode(countryData.code)}
                    alt={countryData.name}
                    classes={{ img: classes.avatarImage }}
                />
            }
            {...tagProps}
        />
    );

    return (
        <>
            {onClick ? (
                <span className={classes.chipWrapper} onClick={(event: MouseEvent) => onClick(countryData.id, event)}>
                    {renderChip()}
                </span>
            ) : (
                renderChip()
            )}
        </>
    );
});

export default CountryBadge;
