import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotImplementedException } from "Components/Utilities/Errors";
import { Edge, IEdge } from "Components/Utilities/UtilClasses/Edge";
import { Coordinates, ICoordinates } from "Components/Utilities/UtilClasses/Coordinates";
import { IPoint, Point } from "Components/Utilities/UtilClasses/Point";
import { RootState } from "Store/Store";

type PointEdgeSelectionSliceState = {
    endPoints :  string[]  // identifikatory koncovych bodu 
    points : {[id : string] : IPoint} // vsechny body
    edges : {[id : string] : IEdge}   // TODO
    selectedEdge : string | null
    endPointBindings : {[id : string] : string[]}
    selectedElementId: string | null
    selectedEndPoint : string | null
    isLastPointMoving : boolean
    highlightedEndPoint : null | string
    distanceThreshold : number
}

const initialState : PointEdgeSelectionSliceState = {
    edges: {},
    selectedEdge: null,
    selectedElementId: null,
    selectedEndPoint: null,
    endPointBindings : {},
    endPoints: [],
    points: {},
    isLastPointMoving : false,
    highlightedEndPoint : null,
    distanceThreshold : 30,
}


function removeEdgeFnc (state : PointEdgeSelectionSliceState, id : string) {
    const edge =  state.edges[id];
    if (edge != null) {
        for (const point of edge.pointsId.map(id => state.points[id])){
            if (!state.endPoints.includes(point.id)) {
                delete state.points[point.id]
            }
        }
        delete state.edges[edge.id]
    } else {
        console.log("Trying to remove edge that is not in state")
    }
}

const pointEdgeSelectionSlice = createSlice({
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
                state.endPointBindings[endPoint.id] = [];
            }
        },
        // odregistrování endPointu
        unregisterEndPoint (state, action : PayloadAction<string>){
            const id = action.payload;
            if(Object.keys(state.points).includes(id)){
                for (const edge of Object.values(state.edges)) {
                    if (edge.from === id) { // smazat vsechny edge ktere vychazeli z tohoto ednpointu
                       removeEdgeFnc(state, edge.id);
                    }
                }
                delete state.points[id];
                delete state.endPointBindings[id];
                state.endPoints.splice(state.endPoints.indexOf(id))  // TODO oveřit že se to nezmersi tu array
            }
            else{
                console.warn(`Couldnt find endPoint: ${action.payload} to unregister, endPoints: ${JSON.stringify(state.endPoints)}`)
            }
        },
        // aktualizace souřadnic endPointu
        updatePointCoords (state, action : PayloadAction<{id : string, newCoords : ICoordinates}>){
            const { id , newCoords } = action.payload;
            if (Object.keys(state.points).includes(id)){   // pokud slovnik obsahuje Point s přijatým id
                state.points[id].coords = newCoords;  // provede update

                if (Object.keys(state.endPointBindings).includes(id) && state.endPointBindings[id].length) {
                    for (const pointId of state.endPointBindings[id]) {
                        if (Object.keys(state.points).includes(pointId)) {
                            state.points[pointId].coords = newCoords;
                        }
                    }
                }
            
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
            const newEdge : IEdge = {id : Edge.getId(), pointsId : points.map(item => item.id), isComplete: false};
            state.edges[newEdge.id] = newEdge;
            points.forEach(item => {
                state.points[item.id] = item;
            })
            newEdge.from = points[0].id;
            state.selectedElementId = null;
            state.selectedEdge = newEdge.id;
        },
        removeEdge (state, action : PayloadAction<string>) {
            const edgeId =  action.payload;
            removeEdgeFnc(state, edgeId);
        },
        addPoint (state, action : PayloadAction<{edgeId : string, point : IPoint, index : number}>) {
            const { edgeId, point, index } = action.payload
            point.id = `Point_${Point.cnt}`;
            state.edges[edgeId].pointsId.splice(index,0,point.id); // pridani do edgey na index
            state.points[point.id] = point;  // pridani bodu ko kolekce bodu
        },
        removePoint (state, action : PayloadAction<string>) {
            throw new NotImplementedException();  // TODO vyresit jak se odebere z edgey
        },
        clearAllEdges (state) {
            state.selectedEndPoint = null;
            state.highlightedEndPoint = null;
            state.selectedElementId = null;
            state.edges = {};
            state.endPointBindings ={};
            state.points = {};
        },
        unselectEdge (state) {
            state.selectedEdge = null;
        },
        toggleIsLastPointMoving (state) {
            if (state.selectedEdge != null) {
                if (state.isLastPointMoving) {
                    if (state.highlightedEndPoint != null) {
                        const endPoint = state.points[state.highlightedEndPoint];
                        const selectedEdge = state.edges[state.selectedEdge];
                        selectedEdge.to = endPoint.id;
                        const selectedEdgePoints = selectedEdge.pointsId;
                        state.endPointBindings[endPoint.id].push(selectedEdgePoints[selectedEdgePoints.length - 1]);
                        state.highlightedEndPoint = null;
                    }
                } else {
                    if (state.edges[state.selectedEdge].isComplete) {

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



export const getEdge = (state: RootState, id : string) : IEdge => state.pointEdgeSelection.edges[id];
export const selectPointsFromEdge = (state: RootState, ids : string[]) : IPoint[] => ids.map(item => state.pointEdgeSelection.points[item]);
export const selectedEdge = (state : RootState) => state.pointEdgeSelection.selectedEdge;
export const selectedElementID = (state : RootState) => state.pointEdgeSelection.selectedElementId;
export const selectedEndPoint = (state : RootState) => state.pointEdgeSelection.selectedEndPoint;


export const {
    endPointClicked,
    gridClicked,
    registerEndPoint,
    unregisterEndPoint,
    updatePointCoords,
    elementClicked,
    addPoint,
    addEdge,
    clearAllEdges,
    removeEdge,
    removePoint,
    toggleIsLastPointMoving,
    unselectEdge,
    selectEdge } = pointEdgeSelectionSlice.actions
export default pointEdgeSelectionSlice.reducer;