import { FunctionComponent,  MouseEventHandler, ReactElement, useContext, useState} from "react";
import { EditorItem } from "../../EditorItem";
import TransitionImage from "./icons/PetriTransition.png"
import styles from "./Transition.module.css"
import { CanvasContext, Coordinates } from "../../../../Store/Editor/Canvas/CanvasContext";
import uniqid from "uniqid"
import { useDragableSVGCompoennt } from "../../CustomHooks/useDraggableSVG";
import { MovableSVGGroupElement } from "../../MovableSVGGroupElement";


export class Transition extends EditorItem  {
    constructor(){
        super()
    }

    public static hasFilter() : boolean  {return false};
    public static filterID() : string | undefined {return undefined};

    getCanvasElement = () : ReactElement => {
        return( 
            <TransitionCanvasElement key={uniqid()} id={this.getElementId()}/>
        )}

    public iconPath: string | undefined = TransitionImage;
    public name: string = "Petri Net Transition";

}

type TransitionCanvasElementProps = {
    id : string
}

const TransitionCanvasElement : FunctionComponent<TransitionCanvasElementProps> = (props) => {
    const context = useContext(CanvasContext);


    const onClickHandler : MouseEventHandler<SVGRectElement> = (e) => {
        context.onElementClick(props.id);
    }

    
    return(
            <rect className={styles.TransitionSelected}  width="30" height="60" />   
        )
}




