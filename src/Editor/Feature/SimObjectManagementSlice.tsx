import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates, NotImplementedException } from "Editor/Components/Utilities";
import { IEditorObject } from "Editor/Model/EditorObject";
import { ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { IEdge, isEdge } from "Editor/Model/UtilClasses/Edge";
import { IPoint, Point } from "Editor/Model/UtilClasses/Point";
import { RootState } from "Editor/Store/Store";


type SimObjectManagementState = {
    objects : {[id : string] : IEditorObject}
    edgeObjectsIds : string[];
    selectedObjectId: string | null
    endPoints :  {[id : string] : string}  // identifikatory koncovych bodu 
    points : {[id : string] : IPoint} // vsechny body
    isLastPointMoving : boolean
    highlightedEndPoint : null | string,
    distanceThreshold : number
}

const initialState : SimObjectManagementState = {
    objects: {},
    edgeObjectsIds: [],
    selectedObjectId: null,
    endPoints: {},
    points: {},
    isLastPointMoving : false,
    highlightedEndPoint : null,
    distanceThreshold : 30,
}

function addObjectFnc(state : SimObjectManagementState, obj : IEditorObject) {
    if (!Object.keys(state.objects).includes(obj.id)) {
        state.objects[obj.id] = obj
        if (isEdge(obj)) {
            state.edgeObjectsIds.push(obj.id);
        }
    } else {
        console.error(`Object with id ${obj.id} is already in`)
    }
}

function addPointFnc(state : SimObjectManagementState, point : IPoint) {
    if (!Object.keys(state.points).includes(point.id)) {
        state.points[point.id] = point;
    } else {
        console.error(`Points object already includes point with id ${point.id}`);
    }
}

function removeEdgeFnc(state : SimObjectManagementState, obj : IEditorObject) {
    const edge =  obj as IEdge;
    if (edge != null) {
        for (const point of edge.pointsId.map(id => state.points[id])){
            if (!Object.keys(state.endPoints).includes(point.id)) {
                delete state.points[point.id]
            }
        }
        state.edgeObjectsIds = state.edgeObjectsIds.filter(id => id !== edge.id);
        delete state.objects[edge.id];
    } else {
        console.log("Trying to remove edge that is not in state")
    }
}

function removeBoundedEdgeObjects(state : SimObjectManagementState, obj : IEditorObject) {
    for (const edgeId of state.edgeObjectsIds) {
        const edge = state.objects[edgeId] as IEdge;
        if (edge.to === obj.id || edge.from === obj.id) {
            removeEdgeFnc(state, edge);
        }
    }
}

const simObjectManagementSlice = createSlice({
    name : "SimObjectManagement",
    initialState,
    reducers: {
        addObject (state, action : PayloadAction<IEditorObject>) {
            addObjectFnc(state, action.payload);
        },
        addPointAndObject(state, action : PayloadAction<{obj : IEditorObject, point : IPoint}>) {
            addObjectFnc(state, action.payload.obj);
            addPointFnc(state, action.payload.point);
        },
        removeObject (state, action: PayloadAction<string>) {   
            const id = action.payload;
            if (Object.keys(state.objects).includes(id)) {
                const obj = state.objects[id];
                if (isEdge(obj)) {
                    removeEdgeFnc(state, obj);
                    state.edgeObjectsIds = state.edgeObjectsIds.filter(id => id != id);
                } else {
                    removeBoundedEdgeObjects(state, obj);
                }
                delete state.objects[id]
            } else {
                console.error(`Trying to remove object with id: ${id} that is not in the dictionary`)
            }
        },
        removeAllObjects (state) {
            state.objects = {};
            state.points = {};
            state.edgeObjectsIds = [];
            state.selectedObjectId = null;
            state.endPoints = {};
        },
        changeObject (state, action : PayloadAction<IEditorObject>) {
            const obj = action.payload;
            state.objects[obj.id] = obj;
        },
        selectObject (state, action : PayloadAction<string>) {
            state.selectedObjectId = action.payload;
        },
        unselectObject(state) {
            state.selectedObjectId = null;
        },
         // registrace endPointu
        registerEndPoint (state, action : PayloadAction<{endPoint : IPoint, ownerId : string}>){
            const endPoint = action.payload.endPoint;
            if (Object.keys(state.endPoints).includes(endPoint.id)) {
                throw new Error(`Registering already registered endPoint ${endPoint.id} `)
            } else {
                state.points[endPoint.id] = endPoint;
                state.endPoints[endPoint.id] = action.payload.ownerId;
            }
        },
        // odregistrování endPointu
        unregisterEndPoint (state, action : PayloadAction<string>){
            const id = action.payload;
            if (!Object.keys(state.endPoints).includes(id)) // provedl se removeAll, nemusi probehnout korektni odregistrovani
                return;

            if (Object.keys(state.points).includes(id)) {
                delete state.points[id];
                delete state.endPoints[id];
            }
            else {
                console.warn(`Couldnt find endPoint: ${action.payload} to unregister, endPoints: ${JSON.stringify(state.endPoints)}`)
            }
        },
        updatePointCoords (state, action : PayloadAction<{id : string, newCoords : ICoordinates}>){
            const { id , newCoords } = action.payload;
            if (Object.keys(state.points).includes(id)){   // pokud slovnik obsahuje Point s přijatým id
                state.points[id].coords = newCoords;  // provede update

                if (state.isLastPointMoving) {
                    const lastPoint = state.points[id];
                    for (const endPoint of Object.keys(state.endPoints).map(id => state.points[id])) {
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
        addPoint (state, action : PayloadAction<{edgeId : string, point : IPoint, index : number}>) {
            const { edgeId, point, index } = action.payload
            point.id = Point.getId();
            const obj = state.objects[edgeId]
            if (isEdge(obj)) {
                obj.pointsId.splice(index,0,point.id); // pridani do edgey na index
                state.points[point.id] = point;  // pridani bodu ko kolekce bodu
            } else {
                console.warn("Trying to add point to object that is not edge");
            }
        },
        removePoint (state, action : PayloadAction<string>) {
            throw new NotImplementedException();  // TODO vyresit jak se odebere z edgey
        },
        toggleIsLastPointMoving (state) {
            if (state.selectedObjectId != null) {
                const selectedEdge = state.objects[state.selectedObjectId];
                if (isEdge(selectedEdge)) {
                    if (state.isLastPointMoving) { // TODO refaktoring, zjednodusit a extrahovat do funkci
                        if (state.highlightedEndPoint != null) {
                            const endPoint = state.points[state.highlightedEndPoint];
                            selectedEdge.to = endPoint.id;
                            const selectedEdgePoints = selectedEdge.pointsId;
                            state.highlightedEndPoint = null;
                        }
                    } else {
                        if (selectedEdge.to != null) {
                            const pointIdToUnBind = selectedEdge.pointsId[selectedEdge.pointsId.length - 1]; // poslední bod  
                            selectedEdge.to = undefined;
                        }
                    }
                }
            }
            state.isLastPointMoving  = !state.isLastPointMoving
        },
        highlightEndPoint (state, action: PayloadAction<string | null>) {
            state.highlightedEndPoint = action.payload;
        },
        setDistanceThreshold (state, action : PayloadAction<number>) {
            state.distanceThreshold = action.payload;
        }
    }
})

export const selectedObjectId = (state : RootState) => state.simObjectManagement.selectedObjectId;
export const selectPoints = (state: RootState, ids : string[]) : IPoint[] => ids.map(item => state.simObjectManagement.points[item]);

export const {
    addObject,
    addPointAndObject,
    removeAllObjects,
    removeObject,
    changeObject,
    registerEndPoint,
    unregisterEndPoint,
    updatePointCoords,
    addPoint,
    removePoint,
    toggleIsLastPointMoving,
    selectObject,
    unselectObject
} = simObjectManagementSlice.actions;
export default simObjectManagementSlice.reducer;