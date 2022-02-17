import { FunctionComponent,  MouseEventHandler, useMemo} from "react";
import { EndPoint } from "../Utilities/UtilComponents/EndPoint";
import styles from "Styles/PetriNets/SpotStyle.module.scss"
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {ALL_DIRECTIONS, convertToVisibility} from "Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
import { CanvasElementProps } from "Components/Editor/Canvas";
import { GroupPoint } from "Components/Utilities/UtilClasses/Point";
import { ICoordinates } from "Components/Utilities/UtilClasses/Coordinates";


export const PlaceSVG : FunctionComponent<CanvasElementProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.id));

    const onClickHandler : MouseEventHandler<SVGGElement> = () => {
        dispatch(elementClicked(props.id));
    }

    const endPointsInGroupCoords : ICoordinates[] = useMemo(() => ([
        {x : 30, y: 0},
        {x : -30, y: 0},
        {x : 0, y: 30},
        {x : 0, y: -30},
    ]), [])


    const endPoints : GroupPoint[] =  useMemo (() => (endPointsInGroupCoords.map((item, index) => new GroupPoint(`${props.id}_${index}`, props.groupAbsoluteCoordinates, item))), [props.groupAbsoluteCoordinates]); 

    return(
        <>
            <circle className={styles.spot} onClick={onClickHandler} onMouseDown={props.onMouseDownDragHandler} onMouseUp={props.onMouseUpDragHandler}  r="30"/>
            <circle visibility={visible} className={styles.spot_selected} r="30"/>
            {endPoints.map((item, index) => <EndPoint key={item.id} parentElementID={props.id} point={item} arrowDirection={ALL_DIRECTIONS[index]} addConnection={props.addConnection} onEndPointCoordsChange={props.onCoordsChange} /> )}
        </>
    )
}

