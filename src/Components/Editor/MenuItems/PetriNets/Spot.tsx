import { FunctionComponent, ReactElement, useContext, MouseEventHandler, useState, useRef, useCallback, useEffect} from "react";
import { EditorItem } from "../../EditorItem";
import spotImage from "./icons/PetriSpot.png"
import styles from "./Spot.module.css"
import {CanvasContext} from "../../../../Store/Editor/Canvas/CanvasContext"
import {CanvasMouseMoveEventDetail} from "../../Canvas"
import uniqid from "uniqid"
import {useDragableSVGCompoennt} from "../../CustomHooks/useDraggableSVG"
import {CanvasElementWrapper} from "../../CanvasElementWrapper"
  


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

        return (
            <CanvasElementWrapper key={uniqid()}>
                <SpotCanvasElement  id={this.getElementId()}/>
            </CanvasElementWrapper>
                );
    }


    public iconPath = spotImage;
    public name = "Petri Net Spot";
}

type CanvasElementProps ={
    id : string
}

const SpotCanvasElement : FunctionComponent<CanvasElementProps> = (props) => {
    const context = useContext(CanvasContext);

    const {
        coordinates : coordinates,
        setCoordinates: setCoordinates,
        canvasBoundaries : canvasBoundaries,
        mouseMoveEventHandler : mouseMoveEventHandler,
        onMouseDownHandler : onMouseDownHandler,
        onMouseUpHandler : onMouseUpHandler
    
    } = useDragableSVGCompoennt<SVGGElement>();

    canvasBoundaries.current = context.canvasBoundaries;
    console.log(`Upadeted boundaries: left: ${canvasBoundaries.current.left}  top: ${canvasBoundaries.current.top}`)

    useEffect(() => {
        setCoordinates(context.initPos);
    }, []);


    const onClickHandler : MouseEventHandler<SVGGElement> = () => {
        context.onClick(props.id);
    }


    let filterID : string =  Spot.filterID() ?? "" ;

    const selectedRectVisible = context.isSelectedElement(props.id) ? "visible" : "hidden"

    return(
        <>
            <circle className={styles.Spot} filter={filterID}  r="30"/>
            <circle visibility={selectedRectVisible} className={styles.SpotSelected} filter={filterID}  r="30"/>
        </>
    )
}

