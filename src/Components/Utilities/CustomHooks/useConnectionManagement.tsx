import { Dictionary } from "@reduxjs/toolkit";
import { useRef, useState, useCallback, useMemo } from "react";
import { NotImplementedException } from "../Errors";
import { Connection } from "../UtilClasses/Connection";
import { Coordinates } from "../UtilClasses/Coordinates";
import { Point } from "../UtilClasses/Point";


export type PointManagement =  {
    onCoordsChange : (point : Point) => void
    addPoint : (connectionID : string, point: Point, index : number) => void
    addConnection : (points : Point[]) => void
    removePoint : (point : Point) => void
    removeConnection : (id : string) => void
    selectConnection : (id : string) => void,
    toggleIsLastPointMoving : () => void 
}

export type EndPointManagement = {
    registerEndPoint : (point : Point) => void
    unregisterEndPoint : (id : string) => void
    highlightedEndPoint : Point | null
}

type ConnectionDict = {[key : string ] : Connection}
type EndPointDict = {[key : string ] : Point}

export const THRESHOLD_DISTANCE = 30
export const useConnectionManagement = () => {
    const connectionCounter = useRef(0);
    const [connections, setConnections] = useState<ConnectionDict>({});
    const [pointsInConnections, setPointsInConnections] = useState<Dictionary<string[]>>({});
    const [selectedConnectionId, setselectedConnectionId] = useState<string | null>(null);
    const [endPoints, setEndPoints] = useState<EndPointDict>({});
    const [isLastPointMoving, setIsLastPointMoving] = useState<boolean>(false);
    const [highlightedEndPoint, setHighLightedEndPoint] = useState<Point | null>(null);

    const getEndPointInDistance = useCallback(
        (point : Point) : Point | null =>  {
            for (const endPoint of Object.values(endPoints)) {
                const distance = Coordinates.getDistance(point.coords, endPoint.coords);
                if (distance < THRESHOLD_DISTANCE) {
                    return endPoint;
                } 
            }
            return null;
        }, [endPoints]
    )

    const handleEndPointHint = useCallback( 
        async (point : Point) => {
            const endPointUnderThreshold = getEndPointInDistance(point);
            if (endPointUnderThreshold != null) {
                if (point.id !== highlightedEndPoint?.id) { // TODO podivat se jestli tady ty "optimalizacni ify" jsou vubec k necemu
                    setHighLightedEndPoint(endPointUnderThreshold);                    
                } 
            } else {
                if (highlightedEndPoint != null) {  // pokud je nějaký endPoint zvyraznen je potreba ho vynulovat (predejit zbytecnym renderum)
                    setHighLightedEndPoint(null);
                }
            }
        },[getEndPointInDistance, highlightedEndPoint]
    )


    const onCoordsChange = useCallback((point : Point) => {
        const allConnectionThatIncludesPoint = pointsInConnections[point.id];
        
        if (isLastPointMoving) {
            // console.log(`Moving last point in connection ${isLastPointMoving}`)
            handleEndPointHint(point);
        }

        if(allConnectionThatIncludesPoint != null) {
            for (const connectionID of allConnectionThatIncludesPoint) {
                const connection = connections[connectionID];
                if (connection != null) {
                    connection.update(point);
                } 
            }
            setConnections({...connections});
        }

        if (endPoints[point.id] != null) {
            endPoints[point.id] = point;
            setEndPoints({...endPoints});
        }
    }, [connections, endPoints, handleEndPointHint, isLastPointMoving, pointsInConnections])

    const addPoint = useCallback((connectionID : string, point: Point, index : number) => {
        const points = connections[connectionID].points;
        if (points != null) {
            const pointsBeforeIndex = points.slice(0, index);
            const pointsAfterIndex = points.slice(index, points.length);
            const newPoint = new Point(`Point_${Point.cnt}`,point.coords);


            setPointsInConnections(prevPointsInConnection => {
                prevPointsInConnection[newPoint.id] = [connectionID];
                return {...prevPointsInConnection};
            })
            connections[connectionID].points = [...pointsBeforeIndex, newPoint, ...pointsAfterIndex]
        }
        setConnections({...connections})
    },[connections])

    const addConnection = useCallback((points : Point[]) => {
        if (points.length < 2) {
            console.error("Cant make connection from one point");
            return;
        }

        const newConnection = new Connection(`Conection_${connectionCounter.current++}`, points)
        setConnections(prevConnections => {
            prevConnections[newConnection.id] = newConnection;
            return {...prevConnections}
        })
        setselectedConnectionId(newConnection.id);
        
        for (const point of newConnection.points) {
            if (pointsInConnections[point.id] != null) {
                pointsInConnections[point.id]?.push(newConnection.id);
            } else {
                pointsInConnections[point.id] = [newConnection.id];
            }
        }
        setPointsInConnections({...pointsInConnections});
    },[pointsInConnections])

    const removePoint = useCallback((point : Point) : void => {
        throw new NotImplementedException();
    },[])

    const removeConnection = useCallback((id : string) : void => {
        const connectionToBeRemoved = connections[id];
        if (connectionToBeRemoved != null) {
            delete connections[id];
            setConnections({...connections})
        } else {
            console.error(`Trying to remove connection that is not present: ${id}`)
        }
    },[connections])

    const clearAllConnections = useCallback(() => {
        setConnections({});
        setPointsInConnections({});
    },[])

    const selectConnection = useCallback((id : string) => {
        setselectedConnectionId(id);
    },[])

    const unselectConnections = useCallback(() => {
        setselectedConnectionId(null);
    }, [])

    const registerEndPoint = useCallback((endPoint : Point) => {
        if (endPoints[endPoint.id] == null) {
            endPoints[endPoint.id] = endPoint;
            setEndPoints({...endPoints});
        } else {
            console.error(`EndPoint is already registered: ${endPoint.id}`)
        }
    },[endPoints])

    const unregisterEndPoint = useCallback((id : string) => {
        if (endPoints[id] != null) {
            delete endPoints[id];
            setEndPoints({...endPoints});
        } else {
            console.error(`Failed to unregister endpoit: ${id}`)
        }
    },[endPoints])

    const toggleIsLastPointMoving = useCallback(
        () => {
            if (isLastPointMoving && highlightedEndPoint != null && selectedConnectionId != null) {
                const selectedConnection = connections[selectedConnectionId];
                selectedConnection.connectToEndPoint(highlightedEndPoint);
                setConnections({...connections});
                pointsInConnections[highlightedEndPoint.id] = [selectedConnection.id];
                setPointsInConnections({...pointsInConnections});
                setHighLightedEndPoint(null);
            }
            setIsLastPointMoving(!isLastPointMoving);
        },[connections, highlightedEndPoint, isLastPointMoving, selectedConnectionId]
    )


    const values = useMemo(() => ({
        connections,
        onCoordsChange,
        addConnection,
        addPoint,
        removePoint,
        removeConnection,
        clearAllConnections,
        selectedConnectionId,
        selectConnection,
        unselectConnections,
        registerEndPoint,
        unregisterEndPoint,
        toggleIsLastPointMoving,
        highlightedEndPoint
    }),[connections, onCoordsChange, addConnection, addPoint, removePoint, removeConnection, clearAllConnections, selectedConnectionId, selectConnection, unselectConnections, registerEndPoint, unregisterEndPoint, toggleIsLastPointMoving, highlightedEndPoint])

    return values;
}