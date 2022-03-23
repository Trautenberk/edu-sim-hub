import { elementClicked } from "Editor/Feature/PointEdgeSelectionSlice";
import {useAppDispatch, useAppSelector} from "Editor/Store/Hooks";
import React, { useCallback, useMemo } from "react";

export const useSelectable = (id : string, onMouseDownHandler? : (e : React.MouseEvent) => void)  => {
        const dispatch = useAppDispatch();

        const onMouseDown =  useCallback((e : React.MouseEvent) => {
            onMouseDownHandler && onMouseDownHandler(e);
            dispatch(elementClicked(id));
        },[dispatch])
    
        const value = useMemo(
            () => ({onMouseDown})
        ,[])

        return value;
}