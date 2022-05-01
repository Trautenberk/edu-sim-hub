import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { useEffect, useMemo, useState } from "react";
import { convertToVisibility } from "../UtilMethodsAndTypes";
import { useDragable } from "./useDraggable";
import { useSelectable } from "./useSelectable";
import { changeObject, registerEndPoint, selectedObjectId, unregisterEndPoint, updatePointCoords, selectObj } from "Editor/Feature/SimObjectManagementSlice";
import { EditorObject, IEditorObject, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { useStoreHooks } from "./useStoreHooks";
import { EndPoint, IEndPointBrief, IPoint } from "Editor/Model/UtilClasses/Point";
import { EndPointSVG } from "../UtilComponents";


type UseSVGComponentUtilsParams = {
    id : string
    initialCoordinates : ICoordinates
    endPointsBrief : IEndPointBrief[]
}

export const useSVGComponentUtils = <T extends IEditorObjectWithEndPoints,>(params : UseSVGComponentUtilsParams) => {
    const { dispatch, useSelector } = useStoreHooks();
    const obj = {...useSelector(state => selectObj(state, params.id))} as T;    // TODO tady to pretypovani vyresit

    const { onMouseDown } = useSelectable(params.id);
    const { coordinates, onMouseDownHandler, onMouseUpHandler } = useDragable({initialCoordinates: obj.coordinates, onMouseDown: onMouseDown});

    const selectedVisible = convertToVisibility(useSelector(state => selectedObjectId(state) === params.id));
    
    const [endPoints, setEndPoints] = useState<EndPoint[]>([]);

    const mapEndPoints = (onAddObject? : (firstPoint : IPoint, secondPoint : IPoint) => void) => {
        return endPoints.map((item, index) => <EndPointSVG onAddObject={onAddObject} key={item.id} coordinates={params.endPointsBrief[index].coords}  endPointId={item.id}/> )
    }

    useEffect(
        () => {
            if (obj.endPointIds.length == 0) {
                const endPoints = params.endPointsBrief.map((item, index) => new EndPoint(new Coordinates(item.coords).add(coordinates), params.id, item.type, item.maxSpawnedObj ,item.arrowDirection, item.connectable))
                setEndPoints(endPoints);
                endPoints.forEach(item => dispatch(registerEndPoint(item.toSerializableObj())));
                endPoints.forEach(item => obj.endPointIds = [...obj.endPointIds, item.id]);
                dispatch(changeObject(obj));
            } else {
                const endPoints = params.endPointsBrief.map((item, index) => {
                    const endPoint = new EndPoint(new Coordinates(item.coords).add(coordinates), params.id, item.type, item.maxSpawnedObj ,item.arrowDirection, item.connectable)
                    endPoint.id = obj.endPointIds[index];
                    return endPoint;
                })
                setEndPoints(endPoints);
            }
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
                item.coords =  new Coordinates(params.endPointsBrief[index].coords).add(coordinates);
                return item;
            }))
        }
        ,[coordinates]
    )

    useEffect(
        () => {
            endPoints.forEach(item => dispatch(updatePointCoords({id: item.id,  newCoords: item.coords.toSerializableObj()})));
            const tmpObj = {...obj};
            tmpObj.coordinates = {x: coordinates.x, y: coordinates.y};
            dispatch(changeObject(tmpObj));
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
        endPoints,
        mapEndPoints
    }

    return values
} 