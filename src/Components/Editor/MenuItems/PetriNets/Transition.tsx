import { FunctionComponent,  MouseEventHandler, ReactElement, useContext} from "react";
import { EditorItem } from "../../EditorItem";
import TransitionImage from "./icons/PetriTransition.png"
import styles from "./Transition.module.css"
import { CanvasContext } from "../../../../Store/Editor/Canvas/CanvasContext";


export class Transition extends EditorItem  {
    constructor(){
        super()
    }

    public static hasFilter() : boolean  {return false};
    public static filterID() : string | undefined {return undefined};

    getCanvasElement: () => ReactElement = () => <TransitionCanvasElement id={this.getElementId()}/>;

    public iconPath: string | undefined = TransitionImage;
    public name: string = "Petri Net Transition";

}



type TransitionCanvasElementProps = {
    id : string
}

const TransitionCanvasElement : FunctionComponent<TransitionCanvasElementProps> = (props) => {

    const context = useContext(CanvasContext);

    const onClickHandler : MouseEventHandler<SVGRectElement> = (e) => {
        context.onClick(props.id);
    }
    return(
        <g>
         <rect className={styles.Transition} onClick={onClickHandler} x={context.initXPos} y={context.initYPos} width="30" height="60" />
        </g>
    )

}




// export class TransitionComponent extends CanvasElement {

//     constructor(props : any) {
//         super(props);
//     }

//     private onClick : MouseEventHandler<SVGRectElement> = (e) => {console.log("Transition clicked!")}
//     render(){
//         return(
//             <g>
//              <rect className={styles.Transition} onClick={this.onClick} x={this.props.posX} y={this.props.posY} width="30" height="60" />
//             </g>
//         )
//     }
// }