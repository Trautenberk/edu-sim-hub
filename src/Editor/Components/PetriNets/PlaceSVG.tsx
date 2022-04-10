import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { EndPointSVG } from "../Utilities/UtilComponents";
import {ALL_DIRECTIONS, convertToVisibility, Direction} from "Editor/Components/Utilities/UtilMethodsAndTypes"
import { ObjectSVGProps } from "App"
import { EndPoint, GroupPoint, IEndPoint, IEndPointBrief, IGroupPoint, IPoint, Point } from "Editor/Model/UtilClasses/Point";
import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { IPlace } from "Editor/Model/PetriNets/Place";
import styles from "./PlaceStyle.module.scss"
import { addPointAndObject } from "Editor/Feature/SimObjectManagementSlice";
import { InputArch } from "Editor/Model/PetriNets/Arch";
import { useSVGComponentUtils } from "../Utilities/CustomHooks/useSVGComponentUtils";

const placeEndPointsBrief : IEndPointBrief[] =  [
    { coords : {x : 30, y: 0}, inputOnly : false, arrowDirection : Direction.Right},
    { coords : {x : -30, y: 0}, inputOnly : false, arrowDirection : Direction.Left},
    { coords : {x : 0, y: 30}, inputOnly : false, arrowDirection : Direction.Down},
    { coords : {x : 0, y: -30}, inputOnly : false, arrowDirection : Direction.Top},
]

export const PlaceSVG : FunctionComponent<ObjectSVGProps> = (props) => {
    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        dispatch,
        selectedVisible,
        obj,
        endPoints
    } 
    = useSVGComponentUtils<IPlace>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: placeEndPointsBrief});

    const addInputArch = useCallback(
        (firstPoint : IPoint, secondPoint : IPoint) => {
            const inputArch = new InputArch({objId: obj.id, pointId: firstPoint.id});
            inputArch.pointsId = [firstPoint.id, secondPoint.id];
            dispatch(addPointAndObject({point : secondPoint, obj : inputArch.toSerializableObj()}))
        },[obj]
    )

    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <circle className={styles.spot_foundation} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} r="30"/>
            <circle visibility={selectedVisible} className={styles.spot_selected} r="30"/>
            {endPoints.map((item, index) => <EndPointSVG onAddObject={addInputArch} key={item.id} coordinates={placeEndPointsBrief[index].coords}  endPoint={item.toSerializableObj()}/> )}
            <text x="-50" y="-50">{obj.label}</text>
            <text x="-10" y="5">{obj.tokenCount > 0 ? `${obj.tokenCount} x` : ""}</text>
        </g>
    )
}


