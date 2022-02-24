import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotImplementedException } from "Components/Utilities/Errors";
import { Connection, IConnection } from "Components/Utilities/UtilClasses/Connection";
import { Coordinates, ICoordinates } from "Components/Utilities/UtilClasses/Coordinates";
import { IPoint, Point } from "Components/Utilities/UtilClasses/Point";
import { RootState } from "Store/Store";


type PointConnectionState = {
    endPoints :  string[],  // identifikatory koncovych bodu 
    points : {[id : string] : IPoint} // vsechny body
    connections : {[id : string] : IConnection},   // TODO
    connectionCounter : number,
    selectedConnection : string | null,
    selectedElementID: string | null,
    selectedEndPoint : string | null,
    isLastPointMoving : boolean  
}


const initialState : PointConnectionState = {
    connections: {},
    connectionCounter: 0,
    selectedConnection: null,
    selectedElementID: null,
    selectedEndPoint: null,
    endPoints: [],
    points: {},
    isLastPointMoving : false
}

const pointConnectionSlice = createSlice({
    name : "PointConnectionAndSelection",
    initialState,
    reducers: {
        elementClicked(state, action : PayloadAction<string>) {
            state.selectedElementID = action.payload;
            state.selectedConnection = null;
        },
        endPointClicked(state, action : PayloadAction<string>){
            // state.selectedEndPoint = action.payload;  // TODO jestli se pro tohle nenajde use-case tak vyhodit
        },
        // registrace endPointu
        registerEndPoint(state, action : PayloadAction<IPoint>){
            const endPoint = action.payload;
            if (Object.keys(state.points).includes(endPoint.id)) {
                throw new Error(`Registering already registered endpoitn ${endPoint.id} `)
            } else {
                state.points[endPoint.id] = endPoint;
                state.endPoints.push(endPoint.id);
            }
        },
        // odregistrování endPointu
        unregisterEndPoint(state, action : PayloadAction<string>){
            if(Object.keys(state.points).includes(action.payload)){
                delete state.points[action.payload];
                state.endPoints.splice(state.endPoints.indexOf(action.payload))  // TODO oveřit že se to nezmersi tu array
            }
            else{
                console.warn(`Couldnt find endPoint: ${action.payload} to unregister, endPoints: ${JSON.stringify(state.endPoints)}`)
            }
        },
        // aktualizace souřadnic endPointu
        updatePointCoords(state, action : PayloadAction<{id : string, newCoords : ICoordinates}>){
            if(Object.keys(state.points).includes(action.payload.id)){   // pokud slovnik obsahuje endPoint s přijatým id
                state.points[action.payload.id].coords = action.payload.newCoords;  // provede update
            } else {
                console.error(`update of nonexisting point ${action.payload.id}`); // TODO vyřešit logovani jinak
            }
        },
        // kliknuto na plochu 
        gridClicked(state, action : PayloadAction<ICoordinates>){
            state.selectedConnection = null;
            state.selectedElementID = null;
            state.selectedEndPoint = null;
        },
        addConnection (state, action : PayloadAction<IPoint[]>) {
            const points = action.payload;
            const newConnection : IConnection = {id : `Connection_${state.connectionCounter++}`, pointsId : points.map(item => item.id)};
            state.connections[newConnection.id] = newConnection;
            points.forEach(item => {
                state.points[item.id] = item;
            })
        },
        removeConnection (state, action : PayloadAction<string>) {
            const connectionId = action.payload;
            if (state.connections[connectionId] != null) {
                delete state.connections[connectionId]
            } else {
                console.log("Trying to remove connection that is not in state")
            }
        },
        addPoint (state, action : PayloadAction<{connectionId : string, point : IPoint, index : number}>) {
            const { connectionId, point, index } = action.payload
            point.id = `Point_${Point.cnt}`;
            state.connections[connectionId].pointsId.splice(index,0,point.id); // pridani do connectiony na index
            state.points[point.id] = point;  // pridani bodu ko kolekce bodu
        },
        removePoint (state, action : PayloadAction<string>) {
            throw new NotImplementedException();  // TODO vyresit jak se odebere z connectiony
        },
        clearAllConnections(state) {
            state.connections = {};
        },
        unselectConnection(state) {
            state.selectedConnection = null;
        },
        toggleIsLastPointMoving(state) {
            state.isLastPointMoving  = !state.isLastPointMoving
        },
        selectConnection(state, action : PayloadAction<string>) {
            const connectionId = action.payload;
            state.selectedConnection = connectionId;
            state.selectedElementID = null;
        }
    },
})



export const getConnection = (state: RootState, id : string) : IConnection => state.pointConnectionAndSelection.connections[id];
export const selectPointsFromConnection = (state: RootState, ids : string[]) : IPoint[] => ids.map(item => state.pointConnectionAndSelection.points[item]);
export const selectedConnection = (state : RootState) => state.pointConnectionAndSelection.selectedConnection;
export const selectedElementID = (state : RootState) => state.pointConnectionAndSelection.selectedElementID;
export const selectedEndPoint = (state : RootState) => state.pointConnectionAndSelection.selectedEndPoint;


export const {
    endPointClicked,
    gridClicked,
    registerEndPoint,
    unregisterEndPoint,
    updatePointCoords,
    elementClicked,
    addPoint,
    addConnection,
    clearAllConnections,
    removeConnection,
    removePoint,
    toggleIsLastPointMoving,
    unselectConnection,
    selectConnection } = pointConnectionSlice.actions
export default pointConnectionSlice.reducer;