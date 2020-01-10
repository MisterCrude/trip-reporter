import { Maybe } from "true-myth";

export const setStateItem = <T>(name: string, storeState: T): boolean => {
    if (!localStorage) {
        return false;
    }

    try {
        const existingData = Maybe.of<T[]>(getState<T>(name))
            .map((state: T[]) => state)
            .unwrapOr([]);

        const serializedState = JSON.stringify([storeState, ...existingData]);

        localStorage.setItem(name, serializedState);
        return true;
    } catch (error) {
        console.error("Store serialization failed");
        return false;
    }
};

export const setState = <T>(name: string, storeState: T[]): boolean => {
    if (!localStorage) {
        return false;
    }

    try {
        if (storeState.length) {
            const serializedState = JSON.stringify(storeState);

            localStorage.setItem(name, serializedState);
        } else {
            removeState(name);
        }

        return true;
    } catch (error) {
        console.error("Store serialization failed");
        return false;
    }
};

export const getState = <T>(stateName: string): T[] | undefined => {
    if (!localStorage) {
        return;
    }

    try {
        const serializedState = localStorage.getItem(stateName);

        return JSON.parse(serializedState ? serializedState : "[]");
    } catch (error) {
        console.error("Store deserialization failed");
        return;
    }
};

export const removeState = (stateName: string): boolean => {
    if (!localStorage) {
        return false;
    }

    try {
        localStorage.removeItem(stateName);
        return true;
    } catch (error) {
        console.error("Store remove item failed");
        return false;
    }
};
