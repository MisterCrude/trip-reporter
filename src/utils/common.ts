import { COMMON } from "@src/config";

export const getFlagUrlByCode = (code: string): string => `https://www.countryflags.io/${code}/flat/64.png`;

export const cutLargeText = (text: string): string =>
    text.split(" ").length > COMMON.TRIP_SHORT_DESCRIPTION_LEN
        ? `${text
              .split(" ")
              .slice(0, COMMON.TRIP_SHORT_DESCRIPTION_LEN)
              .join(" ")}...`
        : text;
