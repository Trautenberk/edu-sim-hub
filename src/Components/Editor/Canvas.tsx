import {MouseEventHandler, useRef, useEffect,  useState, FC } from "react"; 
import {useDragableSVGComponent } from "../Utilities/CustomHooks/useDraggableSVG";
import styles from "Styles/Editor/CanvasStyle.module.scss";
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {zoom, selelctCurrentZoom } from "Feature/ZoomSlice";
import {Boundaries, convertMatrixToString, TransormMatrix } from "Components/Utilities/UtilMethodsAndTypes";
import {selectCanvasBoundaries, updateCanvasBoundaries} from "Feature/CanvasContextSlice"
import {gridClicked, selectHint, selectHintStartCoords} from "Feature/PointConnectionAndSelectionSlice"
import { Coordinates } from "Components/Utilities/UtilClasses/Coordinates";

export type CanvasElementProps = {
    id : string;
    coordinates : Coordinates
    onMouseDownHandler : (e : any) => void;
    onMouseUpHandler : (e : any) => void;
}


export type CanvasMouseMoveEventDetail = {
    xCoord : number,
    yCoord : number
}

export const Canvas : FC = ({children}) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const scale = useSelector(selelctCurrentZoom); 

    const [svgSize, setSvgSize] = useState({width : 0, height: 0})
    const canvasBoundingElementRef = useRef<HTMLDivElement>(null);

    const {coordinates : translate, onMouseDownHandler, onMouseUpHandler} = useDragableSVGComponent(new Coordinates({x: 30, y: 30}));
    
    const mainGroupTransformMatrix : TransormMatrix = ( { scaleX: scale, skewY : 0 , skewX : 0, scaleY : scale, translateX : translate.x, transalteY : translate.y } )

    const zoomHandler  = ( evt : WheelEvent ) => {
        if ( evt.ctrlKey !== true ) {
            return;
        }

        evt.preventDefault();
        dispatch(zoom({deltaY: evt.deltaY}));
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
                    </defs>
                    <g transform={convertMatrixToString(mainGroupTransformMatrix)} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} >   
                            <GridSVG size={svgSize} />
                            {children}
                    </g>
                </svg>
        </div>
    )
}


type GridSVGElementProps = {
    size : {width: number, height : number},
}

const GridSVG : FC<GridSVGElementProps> = (props) => {
    const gridRef = useRef<SVGRectElement>(null);
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;
    const canvasBoundaries : Boundaries = useSelector(selectCanvasBoundaries);

    const zoom = useSelector(selelctCurrentZoom);

    const onClickHandler : MouseEventHandler<SVGElement> = (e) => {
         dispatch(gridClicked({x: e.clientX, y: e.clientY})); 
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
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
            </defs>
            <rect width={1201} height={1201} ref={gridRef} onClick={onClickHandler} className={styles.canvas_svg__grid} fill="url(#grid)" /> 
        </g>
    )
}

