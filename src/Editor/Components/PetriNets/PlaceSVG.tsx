import { FunctionComponent, useCallback } from "react";
import { Direction, INITIAL_COORDINATES} from "Editor/Components/Utilities/UtilMethodsAndTypes"
import { ObjectSVGProps } from "App"
import { EndPointType, IEndPointBrief, IPoint } from "Editor/Model/UtilClasses/Point";
import { IPlace } from "Editor/Model/PetriNets/Place";
import { addEdgeObject } from "Editor/Feature/SimObjectManagementSlice";
import { InputArch } from "Editor/Model/PetriNets/Arch";
import { useSVGComponentUtils } from "../Utilities/CustomHooks/useSVGComponentUtils";
import styles from "Editor/Styles/PetriNetsStyle.module.scss";

const placeEndPointsBrief : IEndPointBrief[] =  [
    { coords : {x : 30, y: 0}, type: EndPointType.Infinite, arrowDirection : Direction.Right},
    { coords : {x : -30, y: 0}, type: EndPointType.Infinite, arrowDirection : Direction.Left},
    { coords : {x : 0, y: 30}, type: EndPointType.Infinite, arrowDirection : Direction.Down},
    { coords : {x : 0, y: -30}, type: EndPointType.Infinite, arrowDirection : Direction.Top},
]

export const PlaceSVG : FunctionComponent<ObjectSVGProps> = (props) => {

    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        dispatch,
        selectedVisible,
        obj,
        mapEndPoints
    } 
    = useSVGComponentUtils<IPlace>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: placeEndPointsBrief});

    const addInputArch = useCallback(
        (firstPoint : IPoint, secondPoint : IPoint) => {
            const inputArch = new InputArch({objId: obj.id, pointId: firstPoint.id});
            inputArch.pointsId = [firstPoint.id, secondPoint.id];
            dispatch(addEdgeObject({point : secondPoint, obj : inputArch.toSerializableObj()}))
        },[obj]
    )

    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <circle className={styles.spot} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} r="30"/>
            <circle visibility={selectedVisible} className={styles.selected} r="30"/>
            {mapEndPoints(addInputArch)}
            <text className={styles.text} x="-50" y="-50">{obj.label}</text>
            <text x="-10" y="5">{obj.tokenCount > 0 ? `${obj.tokenCount} x` : ""}</text>
        </g>
    )
}


