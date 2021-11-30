import { FC, MouseEventHandler, useCallback, useContext, useState } from "react"
import uniqid from "uniqid";
import { CanvasContext, Coordinates, Connection } from "../../../Store/Editor/Canvas/CanvasContext"
import { ConnectionPoint, pointMovedEventDetails } from "../CustomHooks/useConnectionPoint";
import styles from "./ConnectionLine.module.css"


type LinePoint = {
    coords : Coordinates,
    pointID : string
}



export const ConnectionManager : FC = () => {
    const context = useContext(CanvasContext);
    const connections : Connection[] = context.connections;
    const drawState : boolean = false;
    const drawLineCoords : {start : Coordinates ; end : Coordinates} = context.drawLineCoords;

    console.log(`connections: ${JSON.stringify(connections)}`)
    return(
        <g>
            {
                connections.map(connection => <ConnectionPolyline key={uniqid()} points={connection.points}/>)
            }
            <line visibility={context.drawLineVisibility}  x1={drawLineCoords.start.posX} y1={drawLineCoords.start.posY} x2={drawLineCoords.end.posX} y2={drawLineCoords.end.posY} ></line>
        </g>
    )    
}

type ConnectionProps = {
    points : ConnectionPoint[];
}

const ConnectionPolyline : FC<ConnectionProps> = (props) => {
    const context = useContext(CanvasContext);
    const [points, setPoints] = useState<ConnectionPoint[]>(props.points)


    console.log(`Number of points in connection : ${points.length}`)
    const convertPointsToPolylineValues = () : string => {
        let polylineArg = ""; 

        for(const point of points){
            console.log(`Parse: ${JSON.stringify(point)}`)
            polylineArg = `${polylineArg}  ${point.coords.posX},${point.coords.posY} `; 
        }
        console.log(`parse output ${polylineArg}`)
        return polylineArg;
    }


    if (points.length > 1){
        console.log("One")
        return(<polyline className={styles.ConnectionLine} points={convertPointsToPolylineValues()}/>)
    }
    else {
        console.log("Error: ConnectionLine muse have at least two points");
        return (<></>)
    }
}