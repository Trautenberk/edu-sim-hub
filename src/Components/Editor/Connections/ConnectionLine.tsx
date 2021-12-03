import { FC, MouseEventHandler, useContext, useState } from "react"
import uniqid from "uniqid"
import { CanvasContext, Coordinates } from "../../../Store/Editor/Canvas/CanvasContext"
import { useDragableSVGCompoennt } from "../CustomHooks/useDraggableSVG"
import styles from "./ConnectionLine.module.css"



export const ConnectionLine : FC<Coordinates[]> = (points) => {

    const parsePoints = () : string => {

        let result = "";

        for(const point of points){
            result =  result + ` ${point.posX},${point.posY} `;
        }
        
        return result;
    }


    if (points.length > 2){
        return(<polyline className={styles.ConnectionLine} points={parsePoints()}/>)
    }
    else {
        console.log("Error: ConnectionLine muse have at least two points");
        return (<></>)
    }
}



export const LinePoint : FC<Coordinates> = (initialCoordinates) => {
    const context = useContext(CanvasContext);
    const [coordinates, setCoordinates] = useState<Coordinates>(initialCoordinates);
    const [id] = useState<string>(uniqid())
    const {onMouseDownHandler : onMouseDownHandlerFromCustomHook, onMouseUpHandler} = useDragableSVGCompoennt<SVGCircleElement>(setCoordinates);


    const onMouseDownHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        onMouseDownHandlerFromCustomHook(e);
    }

    return(
        <circle r={2}  />
    )
}