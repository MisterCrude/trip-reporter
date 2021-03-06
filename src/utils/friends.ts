import uuid from "uuid";
import { RESOURCES } from "@src/config";
import { IFriend } from "@src/types/common";

export const Friends = [
    "Evan Sullivan",
    "Arnold Perry",
    "Monica Fowler",
    "Cindy Harvey",
    "Zoey Carter",
    "Manuel Hill",
    "Roy Walters",
    "Andy Robertson",
    "Felix Ferguson",
    "Bryan Miles",
];

export const getRandomFriend = (): IFriend => {
    const uuId = uuid();

    return { id: uuId, name: Friends[Math.floor(Math.random() * 10)], avatarUrl: `${RESOURCES.AVATAR}${uuId}` };
};
