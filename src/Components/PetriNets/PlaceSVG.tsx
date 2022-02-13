import { FunctionComponent,  MouseEventHandler} from "react";
import { EndPoint } from "../Utilities/UtilComponents/EndPoint";
import styles from "Styles/PetriNets/SpotStyle.module.scss"
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {convertToVisibility, Direction} from "Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
import { CanvasElementProps } from "Components/Editor/Canvas";
import { Point } from "Components/Utilities/UtilClasses/Point";


export const PlaceSVG : FunctionComponent<CanvasElementProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.id));
    
    const onClickHandler : MouseEventHandler<SVGGElement> = () => {
        dispatch(elementClicked(props.id));
    }

    return(
        <>
            <g>
                <circle className={styles.spot} onClick={onClickHandler} onMouseDown={props.onMouseDownHandler} onMouseUp={props.onMouseUpHandler}  r="30"/>
            </g>
            <circle visibility={visible} className={styles.spot_selected} filter={""}  r="30"/>
            <EndPoint point={new Point(`${props.id}_1`,{x : 30, y: 0})} arrowDirection={Direction.Right} parentElementID={props.id}/>
            <EndPoint point={new Point(`${props.id}_2`,{x : -30, y: 0})} arrowDirection={Direction.Left} parentElementID={props.id}/>
            <EndPoint point={new Point(`${props.id}_3`,{x : 0, y: 30})} arrowDirection={Direction.Down} parentElementID={props.id}/>
            <EndPoint point={new Point(`${props.id}_4`,{x : 0, y: -30})} arrowDirection={Direction.Top} parentElementID={props.id}/>
        </>
    )
}

