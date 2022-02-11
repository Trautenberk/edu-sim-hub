import { FunctionComponent,  MouseEventHandler} from "react";
import { EndPoint } from "../Editor/Connections/EndPoint";
import styles from "Styles/PetriNets/SpotStyle.module.scss"
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {convertToVisibility, Direction} from "Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
import { CanvasElementProps } from "Components/Editor/Canvas";


export const PlaceSVGComponent : FunctionComponent<CanvasElementProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.id));
    
    const onClickHandler : MouseEventHandler<SVGGElement> = () => {
        dispatch(elementClicked(props.id));
    }

    return(
        <>
            <circle className={styles.spot} filter={""} onClick={onClickHandler}  r="30"/>
            <circle visibility={visible} className={styles.spot_selected} filter={""}  r="30"/>
            <EndPoint coords={{posX : 30, posY: 0}} arrowDirection={Direction.Right} parentElementID={props.id} ID={`${props.id}_1`}/>
            <EndPoint coords={{posX : -30, posY: 0}} arrowDirection={Direction.Left} parentElementID={props.id} ID={`${props.id}_2`}/>
            <EndPoint coords={{posX : 0, posY: 30}} arrowDirection={Direction.Down} parentElementID={props.id} ID={`${props.id}_3`}/>
            <EndPoint coords={{posX : 0, posY: -30}} arrowDirection={Direction.Top} parentElementID={props.id} ID={`${props.id}_4`}/>
        </>
    )
}

