import { FunctionComponent, ReactElement, MouseEventHandler} from "react";
import { EditorItem } from "../Editor/EditorItem";
import uniqid from "uniqid"
import { MovableSVGGroupElement } from "../Editor/MovableSVGGroupElement"
import { EndPoint } from "../Editor/Connections/EndPoint";
import spotsvg from "./icons/petri-spot.svg"
import styles from "Styles/PetriNets/SpotStyle.module.scss"
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {convertToVisibility, Coordinates} from "Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"

export class Place extends EditorItem {
    private id = uniqid()
    public static hasFilter() : boolean {return true};
    public static filterID() : string | undefined { return "SpotFilter"};
    public getCanvasElement: () => ReactElement  = () => {
        return (
            <PlaceSVGComponent  key={uniqid()} id={this.getElementId()}/>
        );
    }
    
    public iconPath = spotsvg;
    public name = "Stav";
}

type CanvasElementProps ={
    id : string
    canvasCoords? : Coordinates
}

export const PlaceSVGComponent : FunctionComponent<CanvasElementProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.id));
    
    const onClickHandler : MouseEventHandler<SVGGElement> = () => {
        dispatch(elementClicked(props.id));
    }

    return(
        <MovableSVGGroupElement>
            <circle className={styles.spot} filter={""} onClick={onClickHandler}  r="30"/>
            <circle visibility={visible} className={styles.spot_selected} filter={""}  r="30"/>
            <EndPoint   elementCoordinates={{posX : 30, posY: 0}} parentElementID={props.id} ID={`${props.id}_1`}/>
            <EndPoint   elementCoordinates={{posX : -30, posY: 0}} parentElementID={props.id} ID={`${props.id}_2`}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: 30}} parentElementID={props.id} ID={`${props.id}_3`}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: -30}} parentElementID={props.id} ID={`${props.id}_4`}/>
        </MovableSVGGroupElement>
    )
}

