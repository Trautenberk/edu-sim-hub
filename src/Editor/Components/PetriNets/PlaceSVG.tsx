import { FunctionComponent, useCallback } from "react";
import { Direction, INITIAL_COORDINATES} from "Editor/Components/Utilities/UtilMethodsAndTypes"
import { ObjectSVGProps } from "App"
import { EndPointType, IEndPointBrief, IPoint } from "Editor/Model/UtilClasses/Point";
import { IPlace } from "Editor/Model/PetriNets/Place";
import { addEdgeObject } from "Editor/Feature/SimObjectManagementSlice";
import { InputArc } from "Editor/Model/PetriNets/Arc";
import { useSVGComponentUtils } from "../Utilities/CustomHooks/useSVGComponentUtils";
import styles from "Editor/Styles/PetriNetsStyle.module.scss";

/**
 * EndPointy místa
 */
const placeEndPointsBrief : IEndPointBrief[] =  [
    { coords : {x : 30, y: 0}, type: EndPointType.Infinite, arrowDirection : Direction.Right},
    { coords : {x : -30, y: 0}, type: EndPointType.Infinite, arrowDirection : Direction.Left},
    { coords : {x : 0, y: 30}, type: EndPointType.Infinite, arrowDirection : Direction.Down},
    { coords : {x : 0, y: -30}, type: EndPointType.Infinite, arrowDirection : Direction.Top},
]

/**
 * React komponenta místa Petriho sítě.
 * @param props 
 * @returns React komponenta hlavní plochy
 */
export const PlaceSVG : FunctionComponent<ObjectSVGProps> = (props) => {

    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        dispatch,
        selectedVisible,
        obj,
        mapEndPoints
    } 
    = useSVGComponentUtils<IPlace>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: placeEndPointsBrief});

    /**
     * Handler předávaný endpointu pro přidání vstupní hrany.
     */
    const addInputArc = useCallback(
        // Přijímá dva body, první z nich je endPoint samotný a druhý bod udává primárně směr jakým bude hrana orientována
        (firstPoint : IPoint, secondPoint : IPoint) => {    
            const inputArc = new InputArc({objId: obj.id, pointId: firstPoint.id}); // Vytvoření objektu hrany
            inputArc.pointsId = [firstPoint.id, secondPoint.id];    // Nastavení požadovaných bodů ze kterých se skládá
            dispatch(addEdgeObject({point : secondPoint, obj : inputArc.toSerializableObj()}))  // Přidání do skladu
        },[obj]
    )

    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <circle className={styles.spot} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} r="30"/>
            <circle visibility={selectedVisible} className={styles.selected} r="30"/>
            {mapEndPoints(addInputArc)}
            <text className={styles.text} x="-50" y="-50">{obj.label}</text>
            <text className={styles.tokens} x="-10" y="5">{obj.tokenCount > 0 ? `${obj.tokenCount} x` : ""}</text>
        </g>
    )
}


