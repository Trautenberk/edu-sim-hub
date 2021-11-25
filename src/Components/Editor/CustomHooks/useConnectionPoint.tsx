import { useMemo, useRef } from "react"
import uniqid from "uniqid"
import { Coordinates } from "../../../Store/Editor/Canvas/CanvasContext"


export const pointMovedEventName = "point-moved-event";
export const pointClickedEventName = "point-clicked-event";


export type ConnectionPoint = {
    pointID : string,
    coords : Coordinates
}

export type pointMovedEventDetails = ConnectionPoint

export type pointClickedEventDetails = {
    pointID : string;
}



export const useConnectionPoint = () => {
    const pointID = useRef(uniqid())

    const dispatchPointMoved = (newCoordinates : Coordinates) => {
        const pointMovedEvent = new CustomEvent<pointMovedEventDetails>(pointMovedEventName, {detail : {pointID: pointID.current, coords : newCoordinates}} )
        document.dispatchEvent(pointMovedEvent)
    }

    const dispatchPointClicked = () => {
        const pointClickedEvent = new CustomEvent<pointClickedEventDetails>(pointClickedEventName, {detail: {pointID : pointID.current}})
        document.dispatchEvent(pointClickedEvent);
    }

    const values = useMemo(() => ({
        pointID,
        dispatchPointMoved,
        dispatchPointClicked
    }), [pointID, dispatchPointMoved,  dispatchPointClicked])

    return values
}


