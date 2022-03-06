import { FunctionComponent,  MouseEventHandler, useCallback, useMemo } from "react";
import styles from "Editor/Styles/PetriNets/TransitionStyle.module.scss"
import {elementClicked, selectedObjectId} from "Editor/Feature/PointEdgeSelectionSlice"
import {ALL_DIRECTIONS, convertToVisibility} from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { ObjectSVGProps } from "Editor/Components/Canvas";
import { ITransition, TransitionType } from "Editor/Model/PetriNets/Transition";
import { Coordinates, ICoordinates } from "Editor/Components/Utilities/UtilClasses/Coordinates";
import { GroupPoint } from "Editor/Components/Utilities/UtilClasses/Point";
import { EndPoint } from "Editor/Components/Utilities/UtilComponents/EndPoint";

export const TransitionSVG : FunctionComponent<ObjectSVGProps> = (props) => {
    const dispatch = useAppDispatch()
    const useSelector = useAppSelector;

    const width = 30;
    const height = 80;

    const visible = convertToVisibility(useSelector(state => selectedObjectId(state) === props.id));
    const obj = useSelector(state => state.simObjectManagement.objects[props.id]) as ITransition;    // TODO tady to pretzpovani vyresit

    const onClickHandler : MouseEventHandler<SVGRectElement> = (e) => {
        dispatch(elementClicked(props.id));
    }

    const onMouseDown =  useCallback((e : React.MouseEvent) => {    // TODO co se opakuje tak asi do customHooku
        props.onMouseDownDragHandler(e);
        dispatch(elementClicked(props.id));
    },[dispatch, props])

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
        <>
            <rect className={styles.transition} onClick={onClickHandler} width={width} height={height} onMouseDown={onMouseDown}  onMouseUp={props.onMouseUpDragHandler}/>  
            <rect className={styles.transition_selected} visibility={visible} width={width} height={height}/> 
            {endPoints.map((item, index) => <EndPoint key={item.id}  parentElementID={props.id} point={item} arrowDirection={ALL_DIRECTIONS[index]} {...props} /> )}
            <text x="-10" y="-10">{obj.label}</text>
            {obj.type === TransitionType.Priority && <text x="0" y="100"> {obj.priority > 0 ? `p = ${obj.priority}` : ""} </text>  }
            {obj.type === TransitionType.Probability && <text x="0" y="100"> { `${obj.probability}%`} </text>}
            {obj.type === TransitionType.Timed && <text x="-15" y="100"> {`Time : ${obj.timeValue}`} </text>}
        </>
        )
}




