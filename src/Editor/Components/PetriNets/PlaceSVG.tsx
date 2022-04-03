import { FunctionComponent, useCallback, useMemo } from "react";
import { EndPointSVG } from "../Utilities/UtilComponents";
import {ALL_DIRECTIONS, convertToVisibility} from "Editor/Components/Utilities/UtilMethodsAndTypes"
import { ObjectSVGProps } from "App"
import { GroupPoint, IGroupPoint, IPoint } from "Editor/Model/UtilClasses/Point";
import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { IPlace } from "Editor/Model/PetriNets/Place";
import styles from "./PlaceStyle.module.scss"
import { addPointAndObject } from "Editor/Feature/SimObjectManagementSlice";
import { InputArch } from "Editor/Model/PetriNets/Arch";
import { useComponentUtils } from "../Utilities/CustomHooks/useComponentUtils";

const placeEndPoints =  [
    {x : 30, y: 0},
    {x : -30, y: 0},
    {x : 0, y: 30},
    {x : 0, y: -30}
]

export const PlaceSVG : FunctionComponent<ObjectSVGProps> = (props) => {
    const {coordinates, onMouseDownHandler, onMouseUpHandler, dispatch, selectedVisible, obj} = useComponentUtils<IPlace>({id: props.id, initialCoordinates: {x: 30, y: 30}});

    const addInputArch = useCallback(
        (firstPoint : IPoint, secondPoint : IPoint) => {
            const inputArch = new InputArch(obj.id);
            inputArch.pointsId = [firstPoint.id, secondPoint.id];
            dispatch(addPointAndObject({point: secondPoint ,obj :inputArch.toSerializableObj()}))
        },[]
    )

    // TODO refaktorovat pro optimalizaci
    const endPoints = useMemo (
        () => (placeEndPoints.map((item, index) => new GroupPoint({id : `${props.id}_${index}`, groupCoords:  item, coords: new Coordinates(item).add(coordinates)}))), 
        [coordinates]); 

    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <circle className={styles.spot_foundation} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} r="30"/>
            <circle visibility={selectedVisible} className={styles.spot_selected} r="30"/>
            {endPoints.map((item, index) => <EndPointSVG onAddObject={addInputArch} key={item.id}  parentElementID={props.id} point={item} arrowDirection={ALL_DIRECTIONS[index]} {...props} /> )}
            <text x="-50" y="-50">{obj.label}</text>
            <text x="-10" y="5">{obj.tokenCount > 0 ? `${obj.tokenCount} x` : ""}</text>
        </g>
    )
}


