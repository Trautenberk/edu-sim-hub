import { FunctionComponent, ReactElement, MouseEventHandler} from "react";
import { EditorItem } from "../../EditorItem";
import uniqid from "uniqid"
import { MovableSVGGroupElement } from "../../MovableSVGGroupElement"
import { EndPoint } from "../../Connections/EndPoint";
import spotsvg from "./icons/petri-spot.svg"
import styles from "Styles/PetriNets/SpotStyle.module.scss"
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {convertToVisibility, Coordinates} from "Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"

const SpotFilter : FunctionComponent<{filterID : string}>  = ({filterID}) =>{ 
    return(
         <filter id={filterID} x="-500%" y="-500%" width="1000%" height="1000%"  box-shadow="inner-shadow 1 0 0 20 0.5 rgba(0,0,0,0.7)">
            <feOffset dx="0" dy="0"/>
            <feGaussianBlur stdDeviation="20"/>
            <feComposite operator="out" in="SourceGraphic"/>
            <feComponentTransfer result="choke">
            <feFuncA type="linear" slope="1"/>
            </feComponentTransfer>
            <feFlood flood-color="rgba(0,0,0,0.7)" result="color"/>
            <feComposite operator="in" in="color" in2="choke" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
        </filter>
    )
}

export class Spot extends EditorItem {

    private id = uniqid();

    public static hasFilter() : boolean {return true};
    public static filterID() : string | undefined { return "SpotFilter"};
        
    public getCanvasElement: () => ReactElement  = () => {

        return (
            <SpotCanvasElement  key={uniqid()} id={this.getElementId()}/>
        );
    }


    public iconPath = spotsvg;
    public name = "Stav";
}

type CanvasElementProps ={
    id : string
    canvasCoords? : Coordinates
}

const SpotCanvasElement : FunctionComponent<CanvasElementProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;
    const onClickHandler : MouseEventHandler<SVGGElement> = () => {
        dispatch(elementClicked(props.id));
    }

    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.id));

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

