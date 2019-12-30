import uuid from "uuid";
import { COMMON } from "@src/config";
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

export const getRandomFriend = (): IFriend => ({
    id: uuid(),
    name: Friends[Math.floor(Math.random() * 10)],
    avatarUrl: COMMON.AVATAR_URL,
});
