import { FunctionComponent,  MouseEventHandler} from "react";
import { EndPoint } from "../Editor/Connections/EndPoint";
import spotsvg from "./icons/petri-spot.svg"
import styles from "Styles/PetriNets/SpotStyle.module.scss"
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {convertToVisibility} from "Components/Utilities/UtilMethodsAndTypes"
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
            <EndPoint   elementCoordinates={{posX : 30, posY: 0}} parentElementID={props.id} ID={`${props.id}_1`}/>
            <EndPoint   elementCoordinates={{posX : -30, posY: 0}} parentElementID={props.id} ID={`${props.id}_2`}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: 30}} parentElementID={props.id} ID={`${props.id}_3`}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: -30}} parentElementID={props.id} ID={`${props.id}_4`}/>
        </>
    )
}

