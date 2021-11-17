import { FunctionComponent, ReactElement, useContext, MouseEventHandler} from "react";
import { EditorItem, IEditorItem } from "../../EditorItem";
import spotImage from "./icons/PetriSpot.png"
import styles from "./Spot.module.css"
import {CanvasContext} from "../../../../Store/Editor/Canvas/CanvasContext"
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
        return <SpotCanvasElement  id={this.getElementId()}/>;
    }


    public iconPath = spotImage;
    public name = "Petri Net Spot";
}

type CanvasElementProps ={
    id : string
}

const SpotCanvasElement : FunctionComponent<CanvasElementProps> = (props) => {
    const context = useContext(CanvasContext);

    const onClickHandler : MouseEventHandler<SVGCircleElement> = () => {
        context.onClick(props.id);
    }

    let filterID : string =  Spot.filterID() ?? "" ;

    return(
        <g>
            <circle onClick={onClickHandler} className={styles.Spot} filter={filterID} cx={context.initXPos} cy={context.initYPos} r="30"/>
        </g>
    )
}


// export class SpotComponent extends CanvasElement {

//     static contextType = CanvasContext;

//     constructor(props : CanvasElementProps){
//         super(props);

//         this.state = {
//             posX : props.posX,
//             posY : props.posY,
//             styles : props.sylesClass
//         }
//     }

    
//     private onClick : React.MouseEventHandler<SVGCircleElement> = (e) => {
//         console.log("Spot click!");
//         this.context.
//         this.props.onClick(this.id);
//     }
 
//     render(){
//         return(
//             <g>
//                 <circle onClick={this.context.} className={styles.Spot} filter={SpotFilter.filterID} cx={this.props.posX} cy={this.props.posY} r="30"/>
//             </g>
//         )
//     }
// }