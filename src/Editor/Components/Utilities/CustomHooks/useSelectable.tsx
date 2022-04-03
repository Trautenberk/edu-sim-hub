import { selectObject } from "Editor/Feature/SimObjectManagementSlice";
import {useAppDispatch, useAppSelector} from "Editor/Store/Hooks";
import React, { useCallback, useMemo } from "react";

export const useSelectable = (id : string, onMouseDownHandler? : (e : React.MouseEvent | MouseEvent) => void)  => {
        const dispatch = useAppDispatch();

        const onMouseDown =  useCallback((e : React.MouseEvent | MouseEvent) => {
            onMouseDownHandler && onMouseDownHandler(e);
            dispatch(selectObject(id));
        },[dispatch, onMouseDownHandler ])
    
        const value = useMemo(
            () => ({onMouseDown})
        ,[onMouseDown])

        return value;
}