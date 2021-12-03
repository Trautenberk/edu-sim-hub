import { FunctionComponent, ReactElement, useContext, MouseEventHandler, useState, useRef, useCallback, useEffect} from "react";
import { EditorItem } from "../../EditorItem";
import spotImage from "./icons/PetriSpot.png"
import styles from "./Spot.module.css"
import {CanvasContext, Coordinates} from "../../../../Store/Editor/Canvas/CanvasContext"
import {CanvasMouseMoveEventDetail} from "../../Canvas"
import uniqid from "uniqid"
import {useDragableSVGCompoennt} from "../../CustomHooks/useDraggableSVG"
import {MovableSVGGroupElement} from "../../MovableSVGGroupElement"
import { EndPoint } from "../../Connections/EndPoint";
import spotsvg from "./icons/petri-spot.svg"
  


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
    constructor(){
        super();
    }

    private id = uniqid();

    public static hasFilter() : boolean {return true};
    public static filterID() : string | undefined { return "SpotFilter"};
        
    public getCanvasElement: () => ReactElement  = () => {

        return (
            <SpotCanvasElement  key={uniqid()} id={this.getElementId()}/>
        );
    }


    public iconPath = spotsvg;
    public name = "Petri Net Spot";
}

type CanvasElementProps ={
    id : string
    canvasCoords? : Coordinates
}

const SpotCanvasElement : FunctionComponent<CanvasElementProps> = (props) => {
    const context = useContext(CanvasContext);

    const onClickHandler : MouseEventHandler<SVGGElement> = () => {
        context.onElementClick(props.id);
    }


    return(
        <MovableSVGGroupElement>
            <circle className={styles.Spot} filter={""} onClick={onClickHandler}  r="30"/>
            <circle visibility={context.getVisibility(props.id)} className={styles.SpotSelected} filter={""}  r="30"/>
            <EndPoint   elementCoordinates={{posX : 30, posY: 0}} parentElementID={props.id}/>
            <EndPoint   elementCoordinates={{posX : -30, posY: 0}} parentElementID={props.id}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: 30}} parentElementID={props.id}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: -30}} parentElementID={props.id}/>
        </MovableSVGGroupElement>
    )
}

