import { Dictionary } from "@reduxjs/toolkit";
import { useRef, useState, useCallback, useMemo } from "react";
import { NotImplementedException } from "../Errors";
import { Connection, IConnection } from "../UtilClasses/Connection";
import { Coordinates } from "../UtilClasses/Coordinates";
import { IPoint, Point } from "../UtilClasses/Point";


export type PointManagement =  {
    onCoordsChange : (point : IPoint) => void
    addPoint : (connectionID : string, point: IPoint, index : number) => void
    addConnection : (points : IPoint[]) => void
    removePoint : (point : IPoint) => void
    removeConnection : (id : string) => void
    selectConnection : (id : string) => void,
    toggleIsLastPointMoving : () => void 
}

export type EndPointManagement = {
    registerEndPoint : (endPoint : IPoint) => void
    unregisterEndPoint : (id : string) => void
    highlightedEndPoint : IPoint | null
}

type ConnectionDict = {[key : string ] : IConnection}
type PointDict = {[key : string ] : IPoint}


export const THRESHOLD_DISTANCE = 30
export const useConnectionManagement = () => {
    const connectionCounter = useRef(0);
    const [connections, setConnections] = useState<ConnectionDict>({}); // slovnik se vsemi connectionami
    const [points, setPoints] = useState<PointDict>({});  // slovnik se vsemi body
    const [endPoints, setEndPoints] = useState<string[]>([]); // pole s id vsech endPointu
    const [selectedConnectionId, setselectedConnectionId] = useState<string | null>(null);
    const [isLastPointMoving, setIsLastPointMoving] = useState<boolean>(false);
    const [highlightedEndPoint, setHighLightedEndPoint] = useState<IPoint | null>(null);

    const getEndPointInDistance = useCallback(
        (point : IPoint) : IPoint | null =>  {
            for (const id of endPoints) {
                const endPoint = points[id];
                if (endPoint != null) {
                    const distance = Coordinates.getDistance(point.coords, endPoint.coords);
                    if (distance < THRESHOLD_DISTANCE) {
                        return endPoint;
                    }     
                } else {
                    console.error(`Couldnt find EndPoint ${id} in points`);
                }
            }
            return null;
        }, [endPoints, points]
    )

    const handleEndPointHint = useCallback( 
        async (point : IPoint) => {
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


    const onCoordsChange = useCallback((point : IPoint) => {
        if (isLastPointMoving) {
            handleEndPointHint(point);
        }
        const pointFromState = points[point.id]; // TODO protoze do pointu z komponenty se nepropisuji zmeny z Points, vyresit
        if (pointFromState != null) {
            for (const connectionId of pointFromState.connectionsId) {
                const connection = new Connection(connections[connectionId]);
                if (connection != null) {
                    point.connectionsId = points[point.id].connectionsId;
                    connection.update(new Point(point));
                    setConnections(prevConnections => {
                        prevConnections[connectionId] = connection;
                        return({...prevConnections})
                    })
                } 
            }
        }
        
        setPoints(prevPoints => {
            prevPoints[point.id] = point;
            return{...prevPoints};
        })

    }, [connections, handleEndPointHint, isLastPointMoving, points])

    const addPoint = useCallback((connectionId : string, point: IPoint, index : number) => {
        const points = connections[connectionId].points;
        if (points != null) {
            const pointsBeforeIndex = points.slice(0, index);
            const pointsAfterIndex = points.slice(index, points.length);
            const newPoint : IPoint = new Point({id: `Point_${Point.cnt}`, coords: point.coords, connectionsId: [connectionId]});  // TODO : tady vyresit connectionID
            
            setPoints(prevPoints => {
                prevPoints[newPoint.id] = newPoint;
                return {...prevPoints};
            })
            setConnections(prevConnections => {
                prevConnections[connectionId].points = [...pointsBeforeIndex, newPoint, ...pointsAfterIndex]
                return({...prevConnections})
            })
        }
        
    },[connections])

    const addConnection = useCallback((pointsInConnection : IPoint[]) => {
        if (pointsInConnection.length < 2) {
            console.error("Cant make connection from one point");
            return;
        }

        const newConnection : IConnection = {id : `Conection_${connectionCounter.current++}` , points : pointsInConnection}
        setConnections(prevConnections => {
            prevConnections[newConnection.id] = newConnection;
            return {...prevConnections}
        })
        setselectedConnectionId(newConnection.id);
        
        for (const point of newConnection.points) {
            if (points[point.id] != null) {
                point.connectionsId = [newConnection.id,...points[point.id].connectionsId]
                setPoints(prevPoints => {
                    prevPoints[point.id] = point
                    return({...prevPoints})
                })
            } else {
                point.connectionsId.push(newConnection.id)
                setPoints(prevPoints => {
                    prevPoints[point.id] = point;
                    return {...prevPoints}
                })
            }
        }
    },[points])

    const removePoint = useCallback((point : IPoint) : void => {
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
        setPoints({});
        setEndPoints([])
    },[])

    const selectConnection = useCallback((id : string) => {
        setselectedConnectionId(id);
    },[])

    const unselectConnections = useCallback(() => {
        setselectedConnectionId(null);
    }, [])

    const registerEndPoint = useCallback((endPoint : IPoint) => {
        if (!endPoints.includes(endPoint.id)) {
            setPoints(prevPoints => {
                prevPoints[endPoint.id] = endPoint;
                return({...prevPoints})
            })
            setEndPoints([...endPoints, endPoint.id]);
        } else {
            console.error(`EndPoint is already registered: ${endPoint.id}`)
        }
    },[endPoints])

    const unregisterEndPoint = useCallback((id : string) => {
        if (endPoints.includes(id) != null) {
            setEndPoints(prevEndPoints => {
                const index = prevEndPoints.indexOf(id);
                prevEndPoints.splice(index,1);
                return([...prevEndPoints]);
            })
        } else {
            console.error(`Failed to unregister endpoit: ${id}`)
        }
    },[endPoints])

    const toggleIsLastPointMoving = useCallback(
        () => {
            if (isLastPointMoving && highlightedEndPoint != null && selectedConnectionId != null) {
                if (connections[selectedConnectionId] != null) {
                    console.log("Connect")
                    const updatedConnection = new Connection(connections[selectedConnectionId]);
                    updatedConnection.connectToEndPoint(new Point(highlightedEndPoint));
                    
                    setConnections(prevConnections => {
                        prevConnections[selectedConnectionId] = updatedConnection; 
                        return {...prevConnections};
                    })

                    setPoints(prevPoints => {
                        prevPoints[highlightedEndPoint.id].connectionsId.push(selectedConnectionId);
                        return({...prevPoints});
                    })
                    setHighLightedEndPoint(null);
                }
                
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