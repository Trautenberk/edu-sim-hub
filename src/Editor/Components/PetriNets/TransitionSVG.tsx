import { FunctionComponent,  MouseEventHandler, useCallback, useMemo, useRef } from "react";
import styles from "./TransitionStyle.module.scss"
import { selectedObjectId } from "Editor/Feature/PointEdgeSelectionSlice"
import {ALL_DIRECTIONS, convertToVisibility} from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { ObjectSVGProps } from "Editor/Components/Canvas";
import { ITransition, TransitionType } from "Editor/Model/PetriNets/Transition";
import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { GroupPoint } from "Editor/Model/UtilClasses/Point";
import { DraggableRefGroupSVG, EndPointSVG, SelectableAndDraggableGroupSVG } from "Editor/Components/Utilities/UtilComponents";
import { useDragRef, useSelectable } from "../Utilities";
import { addObject } from "Editor/Feature/SimObjectManagementSlice";
import { InputArch } from "Editor/Model/PetriNets";

export const TransitionSVG : FunctionComponent<ObjectSVGProps> = (props) => {
    const dispatch = useAppDispatch()
    const useSelector = useAppSelector;

    const width = 30;
    const height = 80;

    const visible = convertToVisibility(useSelector(state => selectedObjectId(state) === props.id));
    const obj = useSelector(state => state.simObjectManagement.objects[props.id]) as ITransition;    // TODO tady to pretypovani vyresit
    const {dragRef, setRef} = useDragRef()

    const {onMouseDown} = useSelectable(props.id)

    const onEdgeSpawn = useCallback(
        () => {
            dispatch(addObject(new InputArch(obj.id).toSerializableObj()))
        },[]
    )

    const endPointsInGroupCoords : ICoordinates[] = useMemo(() => ([
        {x : width, y: height / 2},
        {x : 0, y: height / 2},
        {x : width / 2, y: height},
        {x : width / 2, y: 0},
    ]), [])
    
    const absoluteCoords = props.groupAbsoluteCoordinates;
    const endPoints = useMemo (
        () => (endPointsInGroupCoords.map((item, index) => new GroupPoint({id : `${props.id}_${index}`, groupCoords:  item, coords: new Coordinates(item).add(absoluteCoords)}))), 
        [props.groupAbsoluteCoordinates]); 
    
    return(
        <SelectableAndDraggableGroupSVG refObj={dragRef} coords={props.groupAbsoluteCoordinates} id={props.id}>
            <rect ref={setRef} className={styles.transition} width={width} height={height}/>  
            <rect className={styles.transition_selected} visibility={visible} width={width} height={height}/> 
            {endPoints.map((item, index) => <EndPointSVG onEdgeSpawn={onEdgeSpawn} key={item.id}  parentElementID={props.id} point={item} arrowDirection={ALL_DIRECTIONS[index]} {...props} /> )}
            <text x="-10" y="-10">{obj.label}</text>
            {obj.type === TransitionType.Priority && <text x="0" y="100"> {obj.priority > 0 ? `p = ${obj.priority}` : ""} </text>  }
            {obj.type === TransitionType.Probability && <text x="0" y="100"> { `${obj.probability}%`} </text>}
            {obj.type === TransitionType.Timed && <text x="-15" y="100"> {`Time : ${obj.timeValue}`} </text>}
        </SelectableAndDraggableGroupSVG>
        )
}




