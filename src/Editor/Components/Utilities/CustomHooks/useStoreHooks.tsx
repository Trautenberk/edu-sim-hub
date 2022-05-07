import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";


/**
 * Pomocný Reac Custom Hook , který vrací funkce pro odebírání dat ze skladu a vysílání akcí
 */
export const useStoreHooks= () => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    return {
        dispatch,
        useSelector
    }
}