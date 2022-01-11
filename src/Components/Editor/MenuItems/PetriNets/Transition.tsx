import { FunctionComponent,  MouseEventHandler, ReactElement} from "react";
import { EditorItem } from "../../EditorItem";
import uniqid from "uniqid"
import { MovableSVGGroupElement } from "../../MovableSVGGroupElement";
import transitionsvg from "./icons/petri-transition.svg"
import { EndPoint } from "Components/Editor/Connections/EndPoint";
import styles from "Styles/PetriNets/TransitionStyle.module.scss"
import {select, selectSelectedElementID} from "Feature/ElementSelectionSlice"
import {convertToVisibility} from "Components/Utilities/UtilMethods";
import { useAppDispatch, useAppSelector } from "Store/Hooks";

export class Transition extends EditorItem  {

    public static hasFilter() : boolean  {return false};
    public static filterID() : string | undefined {return undefined};

    getCanvasElement = () : ReactElement => {
        return( 
            <TransitionCanvasElement key={uniqid()} id={this.getElementId()}/>
        )}

    public iconPath: string | undefined = transitionsvg;
    public name: string = "Přechod";

}

type TransitionCanvasElementProps = {
    id : string
}

const TransitionCanvasElement : FunctionComponent<TransitionCanvasElementProps> = (props) => {
    const dispatch = useAppDispatch()

    const onClickHandler : MouseEventHandler<SVGRectElement> = (e) => {
        dispatch(select(props.id));
    }

    const width = 30;
    const height = 80;

    const visible = convertToVisibility(useAppSelector(state => selectSelectedElementID(state) === props.id))

    return(
        <MovableSVGGroupElement>
            <rect className={styles.transition} onClick={onClickHandler} width={width} height={height} />  
            <rect className={styles.transition_selected} visibility={visible} width={width} height={height}/> 
            // rohy
            <EndPoint   elementCoordinates={{posX : 0, posY: 0}} parentElementID={props.id}/>
            <EndPoint   elementCoordinates={{posX : width, posY: 0}} parentElementID={props.id}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: height}} parentElementID={props.id}/>
            <EndPoint   elementCoordinates={{posX : width, posY: height}} parentElementID={props.id}/>
            
            // boční hrany
            <EndPoint   elementCoordinates={{posX : 0, posY: height / 2}} parentElementID={props.id}/>
            <EndPoint   elementCoordinates={{posX : width, posY: height / 2}} parentElementID={props.id}/>

        </MovableSVGGroupElement>
        )
}




