import { FunctionComponent,  MouseEventHandler, useMemo} from "react";
import { EndPoint } from "../Utilities/UtilComponents/EndPoint";
import styles from "Styles/PetriNets/SpotStyle.module.scss"
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {convertToVisibility, Direction} from "Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
import { CanvasElementProps } from "Components/Editor/Canvas";
import { Point } from "Components/Utilities/UtilClasses/Point";
import { Coordinates } from "Components/Utilities/UtilClasses/Coordinates";


export const PlaceSVG : FunctionComponent<CanvasElementProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.id));
    
    const onClickHandler : MouseEventHandler<SVGGElement> = () => {
        dispatch(elementClicked(props.id));
    }

    const endPointGroupCoords : Coordinates[] = useMemo(() => ([
        new Coordinates({x : 30, y: 0}),
        new Coordinates({x : -30, y: 0}),
        new Coordinates({x : 0, y: 30}),
        new Coordinates({x : 0, y: -30}),
    ]), [])

    const endPoints = useMemo(() => ([
        new Point(`${props.id}_1`, new Coordinates(endPointGroupCoords[0]).add(props.coordinates)),
        new Point(`${props.id}_2`, new Coordinates(endPointGroupCoords[1]).add(props.coordinates)),
        new Point(`${props.id}_3`, new Coordinates(endPointGroupCoords[2]).add(props.coordinates)),
        new Point(`${props.id}_4`, new Coordinates(endPointGroupCoords[3]).add(props.coordinates)),
    ]), [endPointGroupCoords, props.coordinates, props.id])

    return(
        <>
            <g>
                <circle className={styles.spot} onClick={onClickHandler} onMouseDown={props.onMouseDownHandler} onMouseUp={props.onMouseUpHandler}  r="30"/>
            </g>
            <circle visibility={visible} className={styles.spot_selected} r="30"/>
            <EndPoint point={endPoints[0]} groupCoordinates={endPointGroupCoords[0]} arrowDirection={Direction.Right} parentElementID={props.id} onEndPointCoordsChange={props.onPointCoordsChange} addConnection={props.addConnection}/>
            <EndPoint point={endPoints[1]} groupCoordinates={endPointGroupCoords[1]} arrowDirection={Direction.Left} parentElementID={props.id} onEndPointCoordsChange={props.onPointCoordsChange} addConnection={props.addConnection}/>
            <EndPoint point={endPoints[2]} groupCoordinates={endPointGroupCoords[2]} arrowDirection={Direction.Down} parentElementID={props.id} onEndPointCoordsChange={props.onPointCoordsChange} addConnection={props.addConnection}/>
            <EndPoint point={endPoints[3]} groupCoordinates={endPointGroupCoords[3]} arrowDirection={Direction.Top} parentElementID={props.id} onEndPointCoordsChange={props.onPointCoordsChange} addConnection={props.addConnection}/>
        </>
    )
}

