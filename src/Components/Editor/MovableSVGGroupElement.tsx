
import { Children, FC, useEffect, cloneElement, ReactElement, isValidElement, FunctionComponent } from "react"
import { EndPoint, EndPointProps } from "./Connections/EndPoint";
import { useDragableSVGComponent } from "../Utilities/CustomHooks/useDraggableSVG"
import {selectInitPos} from "Feature/CanvasContextSlice"
import { useAppSelector } from "Store/Hooks";
import { Coordinates } from "Components/Utilities/UtilMethodsAndTypes";
import { CanvasElementProps } from "./Canvas";


type DraggableSVGGroupElementProps = {
    coords : Coordinates,
    id : string,
    canvasElement : FunctionComponent<CanvasElementProps>;
}


export const DraggableSVGGroupElement : FC<DraggableSVGGroupElementProps> = (props) => {
    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler
    } = useDragableSVGComponent<SVGGElement>(props.coords);

    const mapCanvasElementProps = () : CanvasElementProps => ({
       id : props.id,
       coordinates
    })

    return(
        <g onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} transform={`translate(${coordinates.posX},${coordinates.posY})`}>
            {props.canvasElement(mapCanvasElementProps())}
            {props.children}
        </g>
    )
}

export const MovableSVGGroupElement : FC = ({children}) => {
    const useSelector = useAppSelector;

    const initPos = useSelector(state => selectInitPos(state));
    const {
        coordinates,
        setCoordinates,
        onMouseDownHandler,
        onMouseUpHandler
    } = useDragableSVGComponent<SVGGElement>({posX: 30, posY: 30});


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