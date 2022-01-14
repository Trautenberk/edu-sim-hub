
import { Children, FC, useEffect, cloneElement, ReactElement, isValidElement } from "react"
import { EndPoint, EndPointProps } from "./Connections/EndPoint";
import { useDragableSVGCompoennt } from "./CustomHooks/useDraggableSVG"
import {selectInitPos} from "Feature/CanvasContextSlice"
import { useAppSelector } from "Store/Hooks";


export const MovableSVGGroupElement : FC = ({children}) => {
    const useSelector = useAppSelector;

    const initPos = useSelector(state => selectInitPos(state));
    const {
        coordinates,
        setCoordinates,
        onMouseDownHandler,
        onMouseUpHandler
    } = useDragableSVGCompoennt<SVGGElement>();


    useEffect(() => {
        setCoordinates(initPos);
    }, []);


    const childrenWithCoords = Children.map(children, child => {
        if (isValidElement(child)) {
            if(child.type == EndPoint )
                return cloneElement(child as ReactElement<EndPointProps>, {groupCoordinates : coordinates} )
        }
        return child;
        });


    if(children != null){
     
    return(

        <g onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} transform={`translate(${coordinates.posX},${coordinates.posY})`}>
            {childrenWithCoords}
        </g>
    )   
    }
    else{
        return (<> </>)
    }
}