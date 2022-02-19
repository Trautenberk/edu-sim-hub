import { Dictionary } from "@reduxjs/toolkit";
import { useRef, useState, useCallback, useMemo } from "react";
import { NotImplementedException } from "../Errors";
import { Connection } from "../UtilClasses/Connection";
import { Point } from "../UtilClasses/Point";


export type PointManagement =  {
    onCoordsChange : (point : Point) => void
    addPoint : (connectionID : string, point: Point, index : number) => void
    addConnection : (points : Point[]) => void
    removePoint : (point : Point) => void
    removeConnection : (id : string) => void
    selectConnection : (id : string) => void
}

type ConnectionDict = {[key : string ] : Connection}

export const useConnectionManagement = () => {
    const connectionCounter = useRef(0);
    const [connections, setConnections] = useState<ConnectionDict>({});
    const [pointInConections, setPointInConnections] = useState<Dictionary<string[]>>({});
    const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

    const onCoordsChange = useCallback((point : Point) => {
        const allConnectionThatIncludesPoint = pointInConections[point.id];

        if(allConnectionThatIncludesPoint != null) {
            for (const connectionID of allConnectionThatIncludesPoint) {
                const connection = connections[connectionID];
                if (connection != null) {
                    connection.update(point);
                } 
            }
            setConnections({...connections});
        }
    }, [connections, pointInConections])

    const addPoint = useCallback((connectionID : string, point: Point, index : number) => {
        const points = connections[connectionID].points;
        if (points != null) {
            const pointsBeforeIndex = points.slice(0, index);
            const pointsAfterIndex = points.slice(index, points.length);
            const newPoint = new Point(`Point_${Point.cnt}`,point.coords)
            setPointInConnections(prevPointsInConnection => {
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
        setSelectedConnection(newConnection.id);
        
        for (const point of newConnection.points) {
            if (pointInConections[point.id] != null) {
                pointInConections[point.id]?.push(newConnection.id);
            } else {
                pointInConections[point.id] = [newConnection.id];
            }
        }
        setPointInConnections({...pointInConections});
    },[pointInConections])

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
        setPointInConnections({});
    },[])

    const selectConnection = useCallback((id : string) => {
        setSelectedConnection(id);
    },[])

    const unselectConnections = useCallback(() => {
        setSelectedConnection(null);
    }, [])

    const values = useMemo(() => ({
        connections,
        onCoordsChange,
        addConnection,
        addPoint,
        removePoint,
        removeConnection,
        clearAllConnections,
        selectedConnection,
        selectConnection,
        unselectConnections
    }),[connections, onCoordsChange, addConnection, addPoint, removePoint, removeConnection, clearAllConnections, selectedConnection, selectConnection, unselectConnections])

    return values;
}