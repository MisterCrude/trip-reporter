import { useCallback } from "react";
import { Maybe } from "true-myth";
import { useDispatch as useDispatchRedux } from "react-redux";

export const useDispatch = <T extends Function>(action: T) => {
    const dispatch = useDispatchRedux();

    return useCallback(
        (payload: any) => {
            dispatch(
                Maybe.of(payload)
                    .map((payloadData: any) => action(payloadData))
                    .unwrapOr(action()),
            );
        },
        [dispatch, action],
    );
};
