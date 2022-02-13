import {FC, useCallback, useEffect, useMemo, useState} from "react"
import uniqid from "uniqid"
import { useDragableSVGComponent } from "../CustomHooks/useDraggableSVG"
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates"
import { Point } from "../UtilClasses/Point"
import style from "./UtilComponentsStyle/EdgeSVG.module.scss"

type EdgeSVGComponentProps = {
    points : ICoordinates[]
 }



export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {
    const [points,setPoints] = useState<Point[]>(props.points.map(item => new Point(uniqid(), item)));
    const pathDescription : string[] = [`M ${points[0].coords.toString()}`];

    const onChildPointMove = useCallback(
        (point : Point) => {
            setPoints(prevPoints => {
                for(const item of prevPoints) {
                    if(item.id === point.id) {
                        item.coords = point.coords;
                        return ([...prevPoints]);
                    } 
                }
                console.error("Faillllll")
                return([...prevPoints]);
            })
    },[],);

    for(const item of (points.slice(1, points.length))) {
        pathDescription.push(`L ${item.coords.toString()}`)
    }
    
    return (
        <g>
            <path className={style.edge} d={`${pathDescription.join(" ")}`}/>
            {points.map(item => <EdgePointsSVG point={item} onCoordsChange={onChildPointMove}/>)}
        </g>
    )
}


type EdgePointSVGProps = {
    point : Point
    onCoordsChange : (point : Point) => void;
}


const EdgePointsSVG : FC<EdgePointSVGProps> = (props) => {
    const {coordinates, onMouseDownHandler, onMouseUpHandler} = useDragableSVGComponent(props.point.coords);
    
    useEffect(()=> {
        props.point.coords = coordinates;
        props.onCoordsChange(props.point);
    },[coordinates])
    
    return (
        <circle className={style.edge_point} cx={coordinates.x} cy={coordinates.y} r={5} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} />    
    )
}



const useChildPointsManagement = (pointsFromProps : Coordinates[]) => {
    const [points, setPoints] = useState<Coordinates[]>(pointsFromProps);
    const onChildMouseDown = () => {

    }

    const onChildMouseUp = () => {

    }

    const onChildMouseMove = () => {

    }

    const values = useMemo(() => ({
        points, 
        setPoints,
        onChildMouseDown,
        onChildMouseUp
    }),[])
}

