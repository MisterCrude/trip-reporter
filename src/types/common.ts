export enum ModalTypes {
    MODAL_ADD = "MODAL_ADD",
    MODAL_EDIT = "MODAL_EDIT",
    MODAL_DETAILS = "MODAL_DETAILS",
    NONE = "NONE",
}

export interface IFriend {
    id: string;
    name: string;
    avatarUrl: string;
}
