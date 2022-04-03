import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";


export const useStoreHooks= () => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    return {
        dispatch,
        useSelector
    }
}