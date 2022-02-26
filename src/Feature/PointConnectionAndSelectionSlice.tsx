import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotImplementedException } from "Components/Utilities/Errors";
import { IEdge } from "Components/Utilities/UtilClasses/Edge";
import { Coordinates, ICoordinates } from "Components/Utilities/UtilClasses/Coordinates";
import { IPoint, Point } from "Components/Utilities/UtilClasses/Point";
import { RootState } from "Store/Store";


type PointConnectionState = {
    endPoints :  string[]  // identifikatory koncovych bodu 
    points : {[id : string] : IPoint} // vsechny body
    edges : {[id : string] : IEdge}   // TODO
    connectionCounter : number
    selectedEdge : string | null
    selectedElementId: string | null
    selectedEndPoint : string | null
    isLastPointMoving : boolean
    highlightedEndPoint : null | string
    distanceThreshold : number
}

const initialState : PointConnectionState = {
    edges: {},
    connectionCounter: 0,
    selectedEdge: null,
    selectedElementId: null,
    selectedEndPoint: null,
    endPoints: [],
    points: {},
    isLastPointMoving : false,
    highlightedEndPoint : null,
    distanceThreshold : 30,
}

const pointConnectionSlice = createSlice({
    name : "PointConnectionAndSelection",
    initialState,
    reducers: {
        elementClicked (state, action : PayloadAction<string>) {
            state.selectedElementId = action.payload;
            state.selectedEdge = null;
        },
        endPointClicked (state, action : PayloadAction<string>){
            // state.selectedEndPoint = action.payload;  // TODO jestli se pro tohle nenajde use-case tak vyhodit
        },
        // registrace endPointu
        registerEndPoint (state, action : PayloadAction<IPoint>){
            const endPoint = action.payload;
            if (Object.keys(state.points).includes(endPoint.id)) {
                throw new Error(`Registering already registered endpoitn ${endPoint.id} `)
            } else {
                state.points[endPoint.id] = endPoint;
                state.endPoints.push(endPoint.id);
            }
        },
        // odregistrování endPointu
        unregisterEndPoint (state, action : PayloadAction<string>){
            if(Object.keys(state.points).includes(action.payload)){
                delete state.points[action.payload];
                state.endPoints.splice(state.endPoints.indexOf(action.payload))  // TODO oveřit že se to nezmersi tu array
            }
            else{
                console.warn(`Couldnt find endPoint: ${action.payload} to unregister, endPoints: ${JSON.stringify(state.endPoints)}`)
            }
        },
        // aktualizace souřadnic endPointu
        updatePointCoords (state, action : PayloadAction<{id : string, newCoords : ICoordinates}>){
            const { id , newCoords } = action.payload;
            if(Object.keys(state.points).includes(id)){   // pokud slovnik obsahuje Point s přijatým id
                state.points[id].coords = newCoords;  // provede update
            
                if (state.isLastPointMoving) {
                    const lastPoint = state.points[id];
                    for (const endPoint of state.endPoints.map(id => state.points[id])) {
                        if (Coordinates.getDistance(lastPoint.coords, endPoint.coords) < state.distanceThreshold) {
                            state.highlightedEndPoint = endPoint.id;
                            return;
                        }
                    }
                    state.highlightedEndPoint = null;
                }
            } else {
                console.error(`update of nonexisting point ${id}`); // TODO vyřešit logovani jinak
                return;
            }
           
        },
        // kliknuto na plochu 
        gridClicked (state, action : PayloadAction<ICoordinates>){
            state.selectedEdge = null;
            state.selectedElementId = null;
            state.selectedEndPoint = null;
        },
        addEdge (state, action : PayloadAction<IPoint[]>) {
            const points = action.payload;
            const newEdge : IEdge = {id : `Connection_${state.connectionCounter++}`, pointsId : points.map(item => item.id), isComplete: false};
            state.edges[newEdge.id] = newEdge;
            points.forEach(item => {
                state.points[item.id] = item;
            })
            state.selectedElementId = null;
            state.selectedEdge = newEdge.id;
        },
        removeEdge (state, action : PayloadAction<string>) {
            const connectionId = action.payload;
            if (state.edges[connectionId] != null) {
                delete state.edges[connectionId]
            } else {
                console.log("Trying to remove connection that is not in state")
            }
        },
        addPoint (state, action : PayloadAction<{connectionId : string, point : IPoint, index : number}>) {
            const { connectionId, point, index } = action.payload
            point.id = `Point_${Point.cnt}`;
            state.edges[connectionId].pointsId.splice(index,0,point.id); // pridani do connectiony na index
            state.points[point.id] = point;  // pridani bodu ko kolekce bodu
        },
        removePoint (state, action : PayloadAction<string>) {
            throw new NotImplementedException();  // TODO vyresit jak se odebere z connectiony
        },
        clearAllConnections (state) {
            state.edges = {};
        },
        unselectEdge (state) {
            state.selectedEdge = null;
        },
        toggleIsLastPointMoving (state) {
            if (state.selectedEdge != null) {
                if (state.isLastPointMoving) {
                    if (state.highlightedEndPoint != null) {
                        const endPoint = state.points[state.highlightedEndPoint];
                        const removedPointId = state.edges[state.selectedEdge].pointsId.pop();
                        state.edges[state.selectedEdge].pointsId.push(endPoint.id);
                        state.edges[state.selectedEdge].isComplete = true;
    
                        if (removedPointId != null) {
                            delete state.points[removedPointId];
                        }
    
                        state.highlightedEndPoint = null;
                    }
                } else {
                    if (state.edges[state.selectedEdge].isComplete) {
                        const connection = state.edges[state.selectedEdge]
                        const lastPointId = connection.pointsId.pop();
                        if (lastPointId != null) {
                            const lastPoint = state.points[lastPointId];
                            const newPoint = {id : Point.getId(), coords : lastPoint.coords};
                            state.points[newPoint.id] = newPoint;
                            connection.pointsId.push(newPoint.id);
                        }
                    }
                }
            }
            
            state.isLastPointMoving  = !state.isLastPointMoving
        },
        selectEdge (state, action : PayloadAction<string>) {
            const edgeId = action.payload;
            state.selectedEdge = edgeId;
            state.selectedElementId = null;
        },
        highlightEndPoint (state, action: PayloadAction<string | null>) {
            state.highlightedEndPoint = action.payload;
        },
        setDistanceThreshold (state, action : PayloadAction<number>) {
            state.distanceThreshold = action.payload;
        }
    },
})



export const getEdge = (state: RootState, id : string) : IEdge => state.pointConnectionAndSelection.edges[id];
export const selectPointsFromEdge = (state: RootState, ids : string[]) : IPoint[] => ids.map(item => state.pointConnectionAndSelection.points[item]);
export const selectedEdge = (state : RootState) => state.pointConnectionAndSelection.selectedEdge;
export const selectedElementID = (state : RootState) => state.pointConnectionAndSelection.selectedElementId;
export const selectedEndPoint = (state : RootState) => state.pointConnectionAndSelection.selectedEndPoint;


export const {
    endPointClicked,
    gridClicked,
    registerEndPoint,
    unregisterEndPoint,
    updatePointCoords,
    elementClicked,
    addPoint,
    addEdge,
    clearAllConnections,
    removeEdge,
    removePoint,
    toggleIsLastPointMoving,
    unselectEdge,
    selectEdge } = pointConnectionSlice.actions
export default pointConnectionSlice.reducer;