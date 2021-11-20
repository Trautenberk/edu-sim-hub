import { FunctionComponent,  MouseEventHandler, ReactElement, useContext, useState} from "react";
import { EditorItem } from "../../EditorItem";
import TransitionImage from "./icons/PetriTransition.png"
import styles from "./Transition.module.css"
import { CanvasContext } from "../../../../Store/Editor/Canvas/CanvasContext";
import uniqid from "uniqid"


export class Transition extends EditorItem  {
    constructor(){
        super()
    }

    public static hasFilter() : boolean  {return false};
    public static filterID() : string | undefined {return undefined};

    getCanvasElement: () => ReactElement = () => <TransitionCanvasElement key={uniqid()} id={this.getElementId()}/>;

    public iconPath: string | undefined = TransitionImage;
    public name: string = "Petri Net Transition";

}



type TransitionCanvasElementProps = {
    id : string
}

const TransitionCanvasElement : FunctionComponent<TransitionCanvasElementProps> = (props) => {
    const context = useContext(CanvasContext);

    const [posX, setPosX] = useState(context.initXPos);
    const [posY, setPosY] = useState(context.initYPos);

    const onClickHandler : MouseEventHandler<SVGRectElement> = (e) => {
        context.onClick(props.id);
    }

    const className = context.selectedElementID === props.id ? styles.TransitionSelected : styles.Transition;
    return(
        <g>
            <rect className={className} onClick={onClickHandler} x={posX} y={posY} width="30" height="60" />
        </g>
    )

}




