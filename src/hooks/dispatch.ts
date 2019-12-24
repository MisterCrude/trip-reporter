import { useCallback } from "react";
import { useDispatch as useDispatchRedux } from "react-redux";

export const useDispatch = (action: any) => {
    const dispatch = useDispatchRedux();

    return useCallback(
        (payload?: any) => {
            // TODO true-myths here
            dispatch(payload !== undefined ? action(payload) : action());
        },
        [dispatch, action],
    );
};
