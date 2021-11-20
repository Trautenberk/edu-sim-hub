import { FunctionComponent, ReactElement, useContext, MouseEventHandler, useState, useRef, useCallback} from "react";
import { EditorItem } from "../../EditorItem";
import spotImage from "./icons/PetriSpot.png"
import styles from "./Spot.module.css"
import {CanvasContext} from "../../../../Store/Editor/Canvas/CanvasContext"
import {CanvasMouseMoveEventDetail} from "../../Canvas"
import uniqid from "uniqid"
  


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

    public static hasFilter() : boolean {return true};
    public static filterID() : string | undefined { return "SpotFilter"};
        
    public getCanvasElement: () => ReactElement  = () => {
        return <SpotCanvasElement key={uniqid()} id={this.getElementId()}/>;
    }


    public iconPath = spotImage;
    public name = "Petri Net Spot";
}

type CanvasElementProps ={
    id : string
}

const SpotCanvasElement : FunctionComponent<CanvasElementProps> = (props) => {
    const context = useContext(CanvasContext);
    const [posX, setPosX] = useState(context.initXPos);
    const [posY, setPosY] = useState(context.initYPos);
    const [selected] = useState(props.id === context.selectedElementID);


    const onClickHandler : MouseEventHandler<SVGCircleElement> = () => {
        context.onClick(props.id);
    }

    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            // console.log("Listening");
           setPosX(e.clientX - context.svgLeftBoundary);
           setPosY(e.clientY - context.svgTopBoundary);
        },
        [],
    )

    // const mouseMoveEventHandler = (e : MouseEvent) => {
    //     // console.log("Listening");
    //    setPosX(e.clientX - context.svgLeftBoundary);
    //    setPosY(e.clientY - context.svgTopBoundary);
    // }


    const onMouseDownHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        console.log("Mouse down Spot ")
        document.addEventListener("mousemove", mouseMoveEventHandler)
    }

    const onMouseUpHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        console.log("mouse up Spot")
        document.removeEventListener("mousemove", mouseMoveEventHandler);
    }

    let filterID : string =  Spot.filterID() ?? "" ;

    const selectedRectVisible = selected ? "visible" : "hidden"


    return(
        <g>
            <circle onClick={onClickHandler} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} className={styles.Spot} filter={filterID} cx={posX} cy={posY} r="30"/>
            <circle onClick={onClickHandler} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} visibility={selectedRectVisible} className={styles.SpotSelected} filter={filterID} cx={posX} cy={posY} r="30"/>
        </g>
    )
}

