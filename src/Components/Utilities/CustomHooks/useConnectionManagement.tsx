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
}

type ConnectionDict = {[key : string ] : Connection}

export const useConnectionManagement = () => {
    const connectionCounter = useRef(0);
    const [connections, setConnections] = useState<ConnectionDict>({});
    const [pointInConections, setPointInConnections] = useState<Dictionary<string[]>>({});

    const onCoordsChange = useCallback((point : Point) => {
        const allConnectionThatIncludesPoint = pointInConections[point.id];

        if(allConnectionThatIncludesPoint != null) {
            for (const connectionID of allConnectionThatIncludesPoint) {
                const connection = connections[connectionID];
                if (connection != null) {
                    connection.update(point);
                    setConnections({...connections});
                    return;
                } 
            }
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
    },[])

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

       setPointInConnections(prevPointInConnections => {
        for (const point of newConnection.points) {
            if (prevPointInConnections[point.id] != null) {
                prevPointInConnections[point.id]?.push(newConnection.id);
            } else {
                prevPointInConnections[point.id] = [newConnection.id];
            }
        }
        return({...prevPointInConnections})
       })
    },[])

    const removePoint = useCallback((point : Point) : void => {
        throw new NotImplementedException();
    },[])

    const removeConnection = useCallback((id : string) : void => {
        throw new NotImplementedException();
    },[])

    const clearAllConnections = useCallback(() => {
        setConnections({});
        setPointInConnections({});
    },[])

    const values = useMemo(() => ({
        connections,
        onCoordsChange,
        addConnection,
        addPoint,
        removePoint,
        removeConnection,
        clearAllConnections,
    }),[addConnection, connections, onCoordsChange, removeConnection, removePoint, clearAllConnections])

    return values;
}