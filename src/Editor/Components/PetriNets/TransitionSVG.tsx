import { FunctionComponent,  MouseEventHandler, useCallback, useMemo, useRef } from "react";
import styles from "./TransitionStyle.module.scss"
import {ALL_DIRECTIONS } from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { ObjectSVGProps } from "App"
import { ITransition, TransitionType } from "Editor/Model/PetriNets/Transition";
import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { GroupPoint, IPoint } from "Editor/Model/UtilClasses/Point";
import { EndPointSVG } from "Editor/Components/Utilities/UtilComponents";
import { addPointAndObject } from "Editor/Feature/SimObjectManagementSlice";
import { OutputArch } from "Editor/Model/PetriNets";
import { useComponentUtils } from "../Utilities/CustomHooks/useComponentUtils";


const width = 30;
const height = 80;


const endPointsInGroupCoords : ICoordinates[] = [
    {x : width, y: height / 2},
    {x : 0, y: height / 2},
    {x : width / 2, y: height},
    {x : width / 2, y: 0},
]

export const TransitionSVG : FunctionComponent<ObjectSVGProps> = (props) => {
    const {coordinates, onMouseDownHandler, onMouseUpHandler, dispatch, selectedVisible, obj} = useComponentUtils<ITransition>({id: props.id, initialCoordinates: {x: 30, y: 30}});

    const addOutputArch = useCallback(
        (firstPoint : IPoint, secondPoint : IPoint) => {
            const outputArch = new OutputArch(obj.id);
            outputArch.pointsId = [firstPoint.id, secondPoint.id];
            dispatch(addPointAndObject({obj: outputArch.toSerializableObj(), point: secondPoint}))
        },[]
    )

    const endPoints = useMemo (
        () => (endPointsInGroupCoords.map((item, index) => new GroupPoint({id : `${props.id}_${index}`, groupCoords:  item, coords: new Coordinates(item).add(coordinates)}))), 
        [coordinates]); 
    
    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <rect className={styles.transition} width={width} height={height} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}/>  
            <rect className={styles.transition_selected} visibility={selectedVisible} width={width} height={height}/> 
            {endPoints.map((item, index) => <EndPointSVG key={item.id}  parentElementID={props.id} point={item} arrowDirection={ALL_DIRECTIONS[index]} {...props} /> )}
            <text x="-10" y="-10">{obj.label}</text>
            {obj.type === TransitionType.Priority && <text x="0" y="100"> {obj.priority > 0 ? `p = ${obj.priority}` : ""} </text>  }
            {obj.type === TransitionType.Probability && <text x="0" y="100"> { `${obj.probability}%`} </text>}
            {obj.type === TransitionType.Timed && <text x="-15" y="100"> {`Time : ${obj.timeValue}`} </text>}
        </g>
        )
}




