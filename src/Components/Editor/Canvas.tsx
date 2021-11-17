import {Component, MouseEventHandler, ReactElement, FunctionComponent, useContext} from "react"; 
import {IEditorMenuItem} from "./EditorMenu";
import styles from "./Canvas.module.css";
import {CanvasContext, CanvasContextProvider} from "../../Store/Editor/Canvas/CanvasContext"

interface ICanvasProps {
    filters? : any[];
}

export type CanvasElementProps = {
    id : string;
    posX : number;
    posY: number;
    sylesClass? : string;
    onClick : (key : string) => void;
    onSelected? : () => void;
    onDeselected? : () => void;
}

export type CanvasElementPropsWithouId = Omit<CanvasElementProps, "id">



export abstract class CanvasElement extends Component<CanvasElementProps, any>{
    constructor(props : CanvasElementProps){
        super(props);

        this.id = props.id;
    }

    public id : string;
    public test() : void {console.log("Testttt")}
    public focus : () => void = () => { console.log("Focus na prvku : " + this.id)};
    public unfocus : () => void = () => {};
}

export type appendCanvasType = (itemToBeAppended :IEditorMenuItem) => boolean;

type CanvasProps = {
    filters? : any[];
}

export const Canvas : FunctionComponent<CanvasProps> = (props) => {

    return(
        <div className={styles.Canvas}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" strokeWidth="0.5"/>
                    </pattern>
                    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <rect width="80" height="80" fill="url(#smallGrid)"/>
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" strokeWidth="1"/>
                    </pattern>
                    {props.filters}   // filters
                </defs>
                <g>   // Canvas Elements
                    <CanvasContextProvider>
                        <CanvasGridElement/>
                        {props.children}   // CanvasElements
                    </CanvasContextProvider>
                </g>
            </svg>
        </div>
    )

}


const CanvasGridElement : FunctionComponent = () => {

    const gridID = "gridID";
    const context = useContext(CanvasContext);

    const onClickHandler : MouseEventHandler<SVGElement> = (e) => {
        context.onClick(gridID);
    }

    return(
        <g>
           <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#smallGrid)"/>
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" strokeWidth="1"/>
            </pattern>
            </defs>
            <rect onClick={onClickHandler} width="100%" height="100%" fill="url(#grid)" />
        </g>
    )
}