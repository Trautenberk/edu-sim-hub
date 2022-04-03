import { ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { useMemo } from "react";
import { convertToVisibility } from "../UtilMethodsAndTypes";
import { useDragable } from "./useDraggable";
import { useSelectable } from "./useSelectable";
import { selectedObjectId } from "Editor/Feature/SimObjectManagementSlice";
import { EditorObject, IEditorObject } from "Editor/Model/EditorObject";
import { useStoreHooks } from "./useStoreHooks";


type UseComponentUtilsParams = {
    id : string
    initialCoordinates : ICoordinates
}

export const useComponentUtils = <T extends IEditorObject,>(params : UseComponentUtilsParams) => {
    const { dispatch, useSelector } = useStoreHooks();

    const { onMouseDown } = useSelectable(params.id);
    const { coordinates, onMouseDownHandler, onMouseUpHandler } = useDragable({initialCoordinates: params.initialCoordinates, onMouseDown: onMouseDown});

    const selectedVisible = convertToVisibility(useSelector(state => selectedObjectId(state) === params.id));
    const obj = useSelector(state => state.simObjectManagement.objects[params.id]) as T;    // TODO tady to pretypovani vyresit
    
    const values = {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        useSelector,
        dispatch,
        selectedVisible,
        obj
    }

    return values
} 