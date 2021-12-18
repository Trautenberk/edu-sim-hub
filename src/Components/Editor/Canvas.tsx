import  {MouseEventHandler, useContext, useRef, useEffect,  useState, FC, useCallback} from "react"; 
import {CanvasContext, Coordinates} from "../../Store/Editor/Canvas/CanvasContext"
import { ConnectionManager } from "./Connections/ConnectionManager";
import { useDragableSVGCompoennt } from "./CustomHooks/useDraggableSVG";
import styles from "Styles/Editor/CanvasStyle.module.scss";



const MAX_SCALE : number = 5;
const MIN_SCALE : number = 0.15; 

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


type CanvasProps = {
    filters? : any[];
}

export type CanvasMouseMoveEventDetail = {
    xCoord : number,
    yCoord : number
}

type TransormMatrix = {
    scaleX : number,
    skewY : number,
    skewX : number,
    scaleY : number,
    translateX : number,
    transalteY : number
}

export const Canvas : FC<CanvasProps> = (props) => {
    const context = useContext(CanvasContext);
    const [svgSize, setSvgSize] = useState({width : 0, height: 0})
    const [gridPosition, setGridPosition] = useState<Coordinates>({posX: 0, posY: 0});
    const canvasBoundingElementRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const scaleRef = useRef(scale);
    const {coordinates : translate ,onMouseDownHandler, onMouseUpHandler} = useDragableSVGCompoennt<SVGGElement>();
    
    const mainGroupTransformMatrix : TransormMatrix = ({scaleX: context.currentZoom, skewY : 0 , skewX : 0, scaleY : context.currentZoom, translateX : translate.posX, transalteY : translate.posY})


    const convertMatrixToString = (matrix : TransormMatrix) => {
        return `matrix(${matrix.scaleX}, ${matrix.skewY}, ${matrix.skewX}, ${matrix.scaleY}, ${matrix.translateX}, ${matrix.transalteY})`

    }

    const zoomHandler  = (evt : WheelEvent) => {
        if(evt.ctrlKey != true){
            return;
        }
        evt.preventDefault();
        const currentScale = scaleRef.current;
        let scaleStep = evt.deltaY < 0 ? 1.25 : 0.8;

        if (currentScale * scaleStep > MAX_SCALE) {
            scaleStep = MAX_SCALE / currentScale;
        }
        
        if (currentScale * scaleStep < MIN_SCALE) {
            scaleStep = MIN_SCALE / currentScale;
        }

        scaleRef.current = currentScale * scaleStep;
        console.log(`Scale: ${scaleRef.current}`)
        context.setCurrentZoom(scaleRef.current);
    }

    useEffect(() => {
        if(canvasBoundingElementRef.current != null ){
            const boundElement = canvasBoundingElementRef.current;
            setSvgSize({width: boundElement.clientWidth, height: boundElement.clientHeight});
            context.updateCanvasBoundaries({left: boundElement.getBoundingClientRect().left, top: boundElement.getBoundingClientRect().top})}
            
            canvasBoundingElementRef.current?.addEventListener("wheel", zoomHandler, {passive: false})
    
        }, []) ;

    return(
        <div ref={canvasBoundingElementRef} className={styles.canvas_wrapper}>
                <svg className={styles.canvas_svg} xmlns="http://www.w3.org/2000/svg">
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
                    <g transform={convertMatrixToString(mainGroupTransformMatrix)} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} >   
                            <CanvasGridElement size={svgSize} />
                            {props.children}            // Canvas Elements
                            <ConnectionManager/> 
                    </g>
                </svg>
        </div>
    )
}


type CanvasGridElementProps = {
    size : {width: number, height : number}
}

const CanvasGridElement : FC<CanvasGridElementProps> = (props) => {

    const context = useContext(CanvasContext);
    const gridRef = useRef<SVGRectElement>(null);

    const onClickHandler : MouseEventHandler<SVGElement> = (e) => {
        const clickCoords : Coordinates = {
            posX : e.clientX - context.canvasBoundaries.left,
            posY: e.clientY - context.canvasBoundaries.top
        }
        context.onGridClick(clickCoords)
    }


    return(
        <g>
           <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="white" stroke="black" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#smallGrid)"/>
                <path d="M 80 0 L 0 0 0 80" fill="white" stroke="black" strokeWidth="1"/>
            </pattern>
            </defs>
            <rect width={1201} height={1201} ref={gridRef} onClick={onClickHandler} className={styles.canvas_svg__grid} fill="url(#grid)" />  // TODO chybí třída
        </g>
    )
}