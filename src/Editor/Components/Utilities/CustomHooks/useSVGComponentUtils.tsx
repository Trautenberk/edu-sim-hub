import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { useEffect, useMemo, useState } from "react";
import { convertToVisibility } from "../UtilMethodsAndTypes";
import { useDragable } from "./useDraggable";
import { useSelectable } from "./useSelectable";
import { changeObject, registerEndPoint, selectedObjectId, unregisterEndPoint, updatePointCoords, selectObj } from "Editor/Feature/SimObjectManagementSlice";
import { EditorObject, IEditorObject, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { useStoreHooks } from "./useStoreHooks";
import { EndPoint } from "Editor/Model/UtilClasses/Point";


type UseSVGComponentUtilsParams = {
    id : string
    initialCoordinates : ICoordinates,
    endPointsCoords : ICoordinates[]
}

export const useSVGComponentUtils = <T extends IEditorObjectWithEndPoints,>(params : UseSVGComponentUtilsParams) => {
    const { dispatch, useSelector } = useStoreHooks();

    const { onMouseDown } = useSelectable(params.id);
    const { coordinates, onMouseDownHandler, onMouseUpHandler } = useDragable({initialCoordinates: params.initialCoordinates, onMouseDown: onMouseDown});

    const selectedVisible = convertToVisibility(useSelector(state => selectedObjectId(state) === params.id));
    const obj = useSelector(state => selectObj(state, params.id)) as T;    // TODO tady to pretypovani vyresit
    
    const [endPoints, setEndPoints] = useState<EndPoint[]>([]);

    useEffect(
        () => {
            const endPoints = params.endPointsCoords.map((item, index) => new EndPoint(new Coordinates(item).add(coordinates), params.id))
            setEndPoints(endPoints);
            endPoints.forEach(item => dispatch(registerEndPoint(item.toSerializableObj())))
            endPoints.forEach(item => obj.endPointIds = [...obj.endPointIds, item.id]);
            dispatch(changeObject(obj));
        }
        ,[]
    )

    useEffect(() => {
        return (() => {
            endPoints.forEach(item => { 
                dispatch(unregisterEndPoint(item.id))
            })
        })
    },[])

    useEffect(
        () => {
            setEndPoints(endPoints => endPoints.map((item, index) => {
                item.coords =  new Coordinates(params.endPointsCoords[index]).add(coordinates);
                return item;
            }))
        }
        ,[coordinates]
    )

    useEffect(
        () => {
            endPoints.forEach(item => dispatch(updatePointCoords({id: item.id,  newCoords: item.coords.toSerializableObj()})));
        }
        ,[coordinates]
    )

    const values = {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        useSelector,
        dispatch,
        selectedVisible,
        obj,
        endPoints
    }

    return values
} 