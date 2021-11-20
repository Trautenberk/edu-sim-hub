import {Component, MouseEventHandler, ReactElement, FunctionComponent, useContext, createRef, useRef, Children, useEffect} from "react"; 
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

export type CanvasMouseMoveEventDetail = {
    xCoord : number,
    yCoord : number
}

export const Canvas : FunctionComponent<CanvasProps> = (props) => {

    const onMouseDown : MouseEventHandler<SVGSVGElement> = (e) =>  {
        console.log("Mouse down SVG");
    }

    const onMouseUp : MouseEventHandler<SVGSVGElement> = (e) => {
        console.log("mouse up SVG")
    }

    return(
        <div className={styles.Canvas}>
                <svg className={styles.CanvasSvg} xmlns="http://www.w3.org/2000/svg">
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
                            <CanvasGridElement/>
                            {props.children}
                    </g>
                </svg>
        </div>
    )

}


const CanvasGridElement : FunctionComponent = ({children}) => {

    const gridID = "gridID";
    const context = useContext(CanvasContext);
    const gridRef = useRef<SVGRectElement>(null);

    const onClickHandler : MouseEventHandler<SVGElement> = (e) => {
        context.onClick(gridID);
    }


    useEffect(() => {
        if(gridRef.current != null){
            const canvasBoundaries = gridRef.current.getBoundingClientRect();
            context.svgLeftBoundary = canvasBoundaries.left;
            context.svgTopBoundary = canvasBoundaries.top;
        }
    }) 


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
            <rect ref={gridRef} onClick={onClickHandler} className={styles.CanvasSvgRect} fill="url(#grid)" />
        </g>
    )
}