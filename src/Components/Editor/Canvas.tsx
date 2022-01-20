import {MouseEventHandler, useRef, useEffect,  useState, FC, useCallback} from "react"; 
import {useDragableSVGCompoennt } from "./CustomHooks/useDraggableSVG";
import styles from "Styles/Editor/CanvasStyle.module.scss";
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {zoom, currentZoom } from "Feature/ZoomSlice";
import {convertMatrixToString, Coordinates, TransormMatrix } from "Components/Utilities/UtilMethodsAndTypes";
import {updateCanvasBoundaries} from "Feature/CanvasContextSlice"
import {gridClicked, selectHint, selectHintStartCoords} from "Feature/PointConnectionAndSelectionSlice"

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



export const Canvas : FC<CanvasProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const hint : boolean = useSelector(state => selectHint(state));
    const hintStartCoords = useSelector(state => selectHintStartCoords(state));

    const [svgSize, setSvgSize] = useState({width : 0, height: 0})
    const canvasBoundingElementRef = useRef<HTMLDivElement>(null);
    const scale = useSelector(currentZoom); 
    const {coordinates : translate, onMouseDownHandler, onMouseUpHandler} = useDragableSVGCompoennt<SVGGElement>();
    
    const mainGroupTransformMatrix : TransormMatrix = ( { scaleX: scale, skewY : 0 , skewX : 0, scaleY : scale, translateX : translate.posX, transalteY : translate.posY } )

    const zoomHandler  = ( evt : WheelEvent ) => {
        if ( evt.ctrlKey !== true ) {
            return;
        }

        evt.preventDefault();
        dispatch(zoom(evt));
    }

    useEffect(() => {
            if(canvasBoundingElementRef.current != null ){
                const boundElement = canvasBoundingElementRef.current;
                setSvgSize( { width: boundElement.clientWidth, height: boundElement.clientHeight } );
                dispatch(updateCanvasBoundaries({left: boundElement.getBoundingClientRect().left, top: boundElement.getBoundingClientRect().top}))            
                canvasBoundingElementRef.current?.addEventListener("wheel", zoomHandler, {passive: false})   
            }
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
                            <CanvasGridElement size={svgSize} hint={hint} hintStartCoords={hintStartCoords} />
                            {props.children}            // Canvas Elements
                    </g>
                </svg>
        </div>
    )
}


type CanvasGridElementProps = {
    size : {width: number, height : number},
    hint : boolean,
    hintStartCoords : Coordinates
}

const CanvasGridElement : FC<CanvasGridElementProps> = (props) => {
    const gridRef = useRef<SVGRectElement>(null);
    const dispatch = useAppDispatch();
    const [hintEndCoords, setHintEndCoords] = useState<Coordinates>(props.hintStartCoords);

    const onClickHandler : MouseEventHandler<SVGElement> = (e) => {
        dispatch(gridClicked({posX: e.clientX, posY: e.clientY})); 
    }

    const hintMouseMoveHandler : MouseEventHandler =  useCallback(
        (e) => {
            if(props.hint === true){
                setHintEndCoords({posX : e.clientX, posY: e.clientY});
            }
        },
        [props.hint],
    )



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
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
            </defs>
            <rect width={1201} height={1201} ref={gridRef} onClick={onClickHandler} onMouseMove={hintMouseMoveHandler} className={styles.canvas_svg__grid} fill="url(#grid)" /> 
            <HintLine hint={props.hint} start={props.hintStartCoords} end={hintEndCoords}></HintLine>
        </g>
    )
}


type HintLineProps = {
    hint : boolean,
    start: Coordinates,
    end : Coordinates
}

const HintLine : FC<HintLineProps> = (props) => {
    if(props.hint === true){
        return <line x1="0" y1="50" x2="250" y2="50" stroke="#000" stroke-width="8" marker-end="url(#arrowhead)"/>
    }
    else{
        return <></>
    }
}