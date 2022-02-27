import { FunctionComponent,  MouseEventHandler, useCallback, useMemo } from "react";
import styles from "Styles/PetriNets/TransitionStyle.module.scss"
import {elementClicked, selectedObjectId} from "Feature/PointEdgeSelectionSlice"
import {ALL_DIRECTIONS, convertToVisibility} from "Components/Utilities/UtilMethodsAndTypes";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { ObjectSVGProps } from "Components/Editor/Canvas";
import { ITransition } from "Model/PetriNets/Transition";
import { Coordinates, ICoordinates } from "Components/Utilities/UtilClasses/Coordinates";
import { GroupPoint } from "Components/Utilities/UtilClasses/Point";
import { EndPoint } from "Components/Utilities/UtilComponents/EndPoint";

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
        </>
        )
}




