import { Dictionary } from "@reduxjs/toolkit";
import { clear } from "console";
import { useRef, useState, useCallback, useMemo } from "react";
import { NotImplementedException } from "../Errors";
import { Connection } from "../UtilClasses/Connection";
import { Coordinates } from "../UtilClasses/Coordinates";
import { Point } from "../UtilClasses/Point";

type ConnectionDict = {[key : string ] : Connection}

export const useConnectionManagement = () => {
    const connectionCounter = useRef(0);
    const [connections, setConnections] = useState<ConnectionDict>({});
    const [pointInConections, setPointInConnections] = useState<Dictionary<string[]>>({});

    const onPointCoordsChange = useCallback((point : Point) => {
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

    const addPoint = useCallback((connectionID : string, point: Point) => {
        throw new NotImplementedException();
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

    const removePoint = useCallback((point : Point) => {
        throw new NotImplementedException();
    },[])

    const removeConnection = useCallback((id : string) => {
        throw new NotImplementedException();
    },[])

    const clearAllConnections = useCallback(() => {
        setConnections({});
        setPointInConnections({});
    },[])

    const values = useMemo(() => ({
        connections,
        onPointCoordsChange,
        addConnection,
        addPoint,
        removePoint,
        removeConnection,
        clearAllConnections,
    }),[addConnection, connections, onPointCoordsChange, removeConnection, removePoint, clearAllConnections])

    return values;
}