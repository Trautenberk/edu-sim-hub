import { FunctionComponent, useCallback } from "react";
import { Direction, INITIAL_COORDINATES } from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { ObjectSVGProps } from "App"
import { ITransition, TransitionType } from "Editor/Model/PetriNets/Transition";
import { EndPointType, IEndPointBrief, IPoint } from "Editor/Model/UtilClasses/Point";
import { addEdgeObject } from "Editor/Feature/SimObjectManagementSlice";
import { OutputArch } from "Editor/Model/PetriNets";
import { useSVGComponentUtils } from "../Utilities/CustomHooks/useSVGComponentUtils";
import styles from "Editor/Styles/PetriNetsStyle.module.scss";


const width = 30;
const height = 80;


const transitionEndPointsBrief : IEndPointBrief[] = [
    {coords : {x : width, y: height / 2}, type: EndPointType.Infinite, arrowDirection: Direction.Right },
    {coords : {x : 0, y: height / 2}, type: EndPointType.Infinite, arrowDirection: Direction.Left },
    {coords : {x : width / 2, y: height}, type: EndPointType.Infinite, arrowDirection: Direction.Down },
    {coords : {x : width / 2, y: 0}, type: EndPointType.Infinite, arrowDirection: Direction.Top },
]

export const TransitionSVG : FunctionComponent<ObjectSVGProps> = (props) => {
    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        dispatch,
        selectedVisible,
        obj,
        mapEndPoints
    } = useSVGComponentUtils<ITransition>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: transitionEndPointsBrief });

    const addOutputArch = useCallback(
        (firstPoint : IPoint, secondPoint : IPoint) => {
            const outputArch = new OutputArch({ objId: obj.id, pointId: firstPoint.id});
            outputArch.pointsId = [firstPoint.id, secondPoint.id];
            dispatch(addEdgeObject({obj: outputArch.toSerializableObj(), point: secondPoint}))
        },[obj]
    )
    
    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <rect className={styles.transition} width={width} height={height} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}/>  
            <rect className={styles.selected} visibility={selectedVisible} width={width} height={height}/> 
            {mapEndPoints(addOutputArch)}
            <text x="-10" y="-10">{obj.label}</text>
            {obj.type === TransitionType.Immediate && <text x="0" y="100"> {obj.priority > 0 ? `p = ${obj.priority}` : ""} </text>  }
            {obj.type === TransitionType.Constant && <text x="0" y="100"> { `D(${obj.timeValue})`} </text>}
            {obj.type === TransitionType.Exponential && <text x="-15" y="100"> {`Exp(${obj.timeValue})`} </text>}
        </g>
        )
}




