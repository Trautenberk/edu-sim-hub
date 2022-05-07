import { selectObject } from "Editor/Feature/SimObjectManagementSlice";
import {useAppDispatch, useAppSelector} from "Editor/Store/Hooks";
import React, { useCallback, useMemo } from "react";

/**
 * Pomocný React Custom Hook přidávají komponentě prostředky, aby ji bylo možné vybrat v hlavní ploše
 */
export const useSelectable = (id : string, onMouseDownHandler? : (e : React.MouseEvent | MouseEvent) => void)  => {
        const dispatch = useAppDispatch();

        // Handler kliknutí na komponentu
        const onMouseDown =  useCallback((e : React.MouseEvent | MouseEvent) => {
            onMouseDownHandler && onMouseDownHandler(e);
            dispatch(selectObject(id));
        },[dispatch, onMouseDownHandler ])
    
        const value = useMemo(
            () => ({onMouseDown})
        ,[onMouseDown])

        return value;
}