import uuid from "uuid";

export const setState = <T>(storeState: T): boolean => {
    if (!localStorage) {
        return false;
    }

    try {
        const serializedState = JSON.stringify(storeState);
        localStorage.setItem(uuid(), serializedState);
        return true;
    } catch (error) {
        console.error("Store serialization failed");
        return false;
    }
};

export const getState = <T>(stateId: string): T | undefined => {
    if (!localStorage) {
        return;
    }

    try {
        const serializedState = localStorage.getItem(stateId);
        if (serializedState == null) {
            return;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Store deserialization failed");
        return;
    }
};
