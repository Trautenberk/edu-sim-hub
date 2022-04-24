import React, { useRef, useEffect,  useState, FC, useCallback } from "react"; 
import { DraggableHandlers, useDragable } from "./Utilities/CustomHooks/useDraggable";
import styles from "./CanvasStyle.module.scss";
import { useAppDispatch, useAppSelector} from "../Store/Hooks"
import { zoom, selelctCurrentZoom } from "../Feature/ZoomSlice";
import { convertMatrixToString, TransormMatrix } from "./Utilities/UtilMethodsAndTypes";
import { updateCanvasBoundaries} from "../Feature/CanvasContextSlice"
import { Coordinates, ICoordinates } from "../Model/UtilClasses/Coordinates";
import { unselectObject } from "Editor/Feature/SimObjectManagementSlice";
import { useStoreHooks } from "./Utilities/CustomHooks";

export const CanvasSVG : FC = (props) => {
    const { dispatch, useSelector } = useStoreHooks();

    const scale = useSelector(selelctCurrentZoom); 

    const [svgSize, setSvgSize] = useState({width : 0, height: 0})
    const canvasBoundingElementRef = useRef<HTMLDivElement>(null);
    const {coordinates, onMouseDownHandler, onMouseUpHandler } = useDragable({initialCoordinates: {x: 30, y: 30}});
    
    const mainGroupTransformMatrix : TransormMatrix = ( { scaleX: scale, skewY : 0 , skewX : 0, scaleY : scale, translateX : coordinates.x, transalteY : coordinates.y } )

    const zoomHandler  = ( evt : WheelEvent ) => {
        if ( evt.ctrlKey !== true ) {
            return;
        }

        evt.preventDefault();
        dispatch(zoom({deltaY: evt.deltaY}));
    }

    const onGridClickHandler  = (e : React.MouseEvent) => {
        dispatch(unselectObject());
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
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 8 5 L 0 10 z" />
                        </marker>
                    </defs>
                    <g transform={convertMatrixToString(mainGroupTransformMatrix)} 
                    onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}
                    >  
                        <rect width={1201} height={1201} onClick={onGridClickHandler} className={styles.canvas_svg__grid} fill="url(#grid)" />  {/* Grid element*/}
                            {props.children}
                    </g>
                </svg>
        </div>
    )
}

