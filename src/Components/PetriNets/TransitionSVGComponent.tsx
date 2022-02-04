import { FunctionComponent,  MouseEventHandler, ReactElement} from "react";
import { EditorItem } from "../Editor/EditorItem";
import uniqid from "uniqid"
import { MovableSVGGroupElement } from "../Editor/MovableSVGGroupElement";
import transitionsvg from "./icons/petri-transition.svg"
import { EndPoint } from "Components/Editor/Connections/EndPoint";
import styles from "Styles/PetriNets/TransitionStyle.module.scss"
import {elementClicked, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
import {convertToVisibility} from "Components/Utilities/UtilMethodsAndTypes";
import { useAppDispatch, useAppSelector } from "Store/Hooks";

export class Transition extends EditorItem  {

    public static hasFilter() : boolean  {return false};
    public static filterID() : string | undefined {return undefined};

    getCanvasElement = () : ReactElement => {
        return( 
            <TransitionSVGComponent key={uniqid()} id={this.getElementId()}/>
        )}

    public iconPath: string | undefined = transitionsvg;
    public name: string = "Přechod";

}

type TransitionCanvasElementProps = {
    id : string
}

const TransitionSVGComponent : FunctionComponent<TransitionCanvasElementProps> = (props) => {
    const dispatch = useAppDispatch()
    const useSelector = useAppSelector;

    const width = 30;
    const height = 80;

    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.id))

    const onClickHandler : MouseEventHandler<SVGRectElement> = (e) => {
        dispatch(elementClicked(props.id));
    }

    return(
        <MovableSVGGroupElement>
            <rect className={styles.transition} onClick={onClickHandler} width={width} height={height} />  
            <rect className={styles.transition_selected} visibility={visible} width={width} height={height}/> 
            <EndPoint   elementCoordinates={{posX : 0, posY: 0}} parentElementID={props.id} ID={`${props.id}_1`}/>
            <EndPoint   elementCoordinates={{posX : width, posY: 0}} parentElementID={props.id} ID={`${props.id}_2`}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: height}} parentElementID={props.id} ID={`${props.id}_3`}/>
            <EndPoint   elementCoordinates={{posX : width, posY: height}} parentElementID={props.id} ID={`${props.id}_4`}/>
            <EndPoint   elementCoordinates={{posX : 0, posY: height / 2}} parentElementID={props.id} ID={`${props.id}_5`}/>
            <EndPoint   elementCoordinates={{posX : width, posY: height / 2}} parentElementID={props.id} ID={`${props.id}_6`}/>
        </MovableSVGGroupElement>
        )
}




