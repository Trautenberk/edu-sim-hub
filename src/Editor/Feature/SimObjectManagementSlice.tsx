import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates, NotImplementedException } from "Editor/Components/Utilities";
import { IEditorObject, NULL_OBJ_ID, SetEditorObjectCounter } from "Editor/Model/EditorObject";
import { IContBlocksSimulationParams, IPNSimulationParams } from "Editor/Model/SimulationParams";
import { ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { IEdge, isEdge } from "Editor/Model/UtilClasses/Edge";
import { EndPointType, IEndPoint, IPoint, Point, SetPointCounter } from "Editor/Model/UtilClasses/Point";
import { RootState } from "Editor/Store/Store";


type SimObjectManagementCore = {
    objects : {[id : string] : IEditorObject}   // kolekce všech objektů hlavní plochy
    edgeObjectsIds : string[];  // id hranových objektů
    selectedObjectId: string | null // id uživatelem vybraného objektu v hlavní ploše
    endPoints :  {[id : string] : IEndPoint}  // koncove body
    points : {[id : string] : IPoint} // vsechny body
}

export type Example = SimObjectManagementCore & {
    editorObjectCounter : number
    pointCounter : number
}

// Typ stavu v řezu
export type SimObjectManagementState =  SimObjectManagementCore & {
    simulationParams : IPNSimulationParams | IContBlocksSimulationParams | null
    isLastPointMoving : boolean
    highlightedEndPoint : null | string,
    distanceThreshold : number
}

// Počáteční stav řezu
const initialState : SimObjectManagementState = {
    simulationParams: null,
    objects: {},
    edgeObjectsIds: [],
    selectedObjectId: null,
    endPoints: {},
    points: {},
    isLastPointMoving : false,
    highlightedEndPoint : null,
    distanceThreshold : 30,
}

/**
 * Řez pro správu objektů a bodů v hlavní ploše. Obsahuje akce a reducery např. pro 
 * přidávání, odebírání, aktualizace a jinou manipulaci se souřadnicemi objektů. Tento řez je stěžejní pro 
 * poskytování funkčnosti hlavní plochy a odehrává se v něm většina logiky.
 */
const simObjectManagementSlice = createSlice({
    name : "SimObjectManagement",
    initialState,
    reducers: {
        // Nastaví hodnotu celého stavu, používá se zejména pro příklady
        setState (state, action: PayloadAction<Example>) {
            removeAllFnc(state);
            const example = action.payload;
            setIdCounters(example.editorObjectCounter, example.pointCounter);
            state.edgeObjectsIds = example.edgeObjectsIds;
            state.endPoints = example.endPoints;
            state.objects = example.objects;
            state.points = example.points;
        },
        // Přidá objekt do kolekce
        addObject (state, action : PayloadAction<IEditorObject>) {
            state.selectedObjectId = addObjectFnc(state, action.payload);
        },
        // Přidá hranový objekt, pro ten je nutné přidat i jeho další bod, který ho tvoří
        addEdgeObject(state, action : PayloadAction<{obj : IEdge, point : IPoint}>) {
            state.selectedObjectId = addObjectFnc(state, action.payload.obj);
            addPointFnc(state, action.payload.point);
        },
        // odebrání objektu z kolekce objektů
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
        // odebrání všech objektů
        removeAllObjects (state) {
            removeAllFnc(state);
        },
        // změna atrbutů objektu
        changeObject (state, action : PayloadAction<IEditorObject>) {
            const obj = action.payload;
            state.objects[obj.id] = obj;
        },
        // označení objektu
        selectObject (state, action : PayloadAction<string>) {
            state.selectedObjectId = action.payload;
        },
        // odoznačení objeku, například při kliku na plochu
        unselectObject(state) {
            state.isLastPointMoving = false;
            state.selectedObjectId = null;
        },
         // registrace endPointu 
        registerEndPoint (state, action : PayloadAction<IEndPoint>){
            const endPoint = action.payload;
            if (!Object.keys(state.endPoints).includes(endPoint.id)) {
                state.endPoints[endPoint.id] = endPoint;
            }
        },
        // odregistrování endPointu
        unregisterEndPoint (state, action : PayloadAction<string>){
            const id = action.payload;
            if (!Object.keys(state.endPoints).includes(id)) // provedl se removeAll, nemusi probehnout korektni odregistrovani
                return;

            if (Object.keys(state.points).includes(id)) {
                delete state.endPoints[id];
            }
            else {
                console.warn(`Couldnt find endPoint: ${action.payload} to unregister, endPoints: ${JSON.stringify(state.endPoints)}`)
            }
        },
        // aktualizace souřadnic objektu a navázaných objektů/bodů
        updatePointCoords (state, action : PayloadAction<{id : string, newCoords : ICoordinates}>){
            const { id , newCoords } = action.payload;
            if (Object.keys(state.points).includes(id)) {   // pokud slovnik obsahuje Point s přijatým id
                state.points[id].coords = newCoords;  // provede update


                // pokud pohybuje uživatel s posledním bodem hrany, počítá vzdálenosti k povoleným endpointů
                // a pokud je dostatečně blízko tak endpoint zvýrazní
                if (state.isLastPointMoving) {  
                    const lastPoint = state.points[id];
                    for (const endPoint of Object.keys(state.endPoints).map(id => state.endPoints[id])) {
                        if (endPoint.connectable && isOwnerClassAllowed(state, endPoint) && Coordinates.getDistance(lastPoint.coords, endPoint.coords) < state.distanceThreshold) {
                            state.highlightedEndPoint = endPoint.id;
                            return;
                        }
                    }
                    state.highlightedEndPoint = null;
                }
            } else if (Object.keys(state.endPoints).includes(id)) {
                const endPoint = state.endPoints[id];
                endPoint.coords = newCoords;
                for (const pointId of endPoint.bindings) {
                    const point = state.points[pointId];
                    point.coords = newCoords;
                }
            } 
            else {
                console.error(`update of nonexisting point ${id}`); // TODO vyřešit logovani jinak
                return;
            }

        },
        // Přidá bod do hrany
        addPoint (state, action : PayloadAction<{edgeId : string, point : IPoint, index : number}>) {
            const { edgeId, point, index } = action.payload
            point.id = Point.getId();
            const obj = state.objects[edgeId]
            if (isEdge(obj)) {
                obj.pointsId.splice(index,0,point.id); // pridani do edge na index
                state.points[point.id] = point;  // pridani bodu ko kolekce bodu
            } else {
                console.warn("Trying to add point to object that is not edge");
            }
        },
        removePoint (state, action : PayloadAction<string>) {
            throw new NotImplementedException();  // TODO vyresit jak se odebere z edgey
        },
        // Přepnutní příznaku, jestli je pohybováno posledním bodem hranového objektu
        toggleIsLastPointMoving (state) {
            if (state.selectedObjectId != null) {  
                const selectedEdge = state.objects[state.selectedObjectId];
                if (isEdge(selectedEdge)) {
                    if (state.isLastPointMoving) { // TODO refaktoring, zjednodusit a extrahovat do funkci
                        if (state.highlightedEndPoint != null) {    //
                            const endPoint = state.endPoints[state.highlightedEndPoint];
                            selectedEdge.to = { objId: endPoint.ownerId, pointId: endPoint.id }; // napojuju na endPoint
                            const lastPointFromEdge = selectedEdge.pointsId[selectedEdge.pointsId.length - 1];
                            const point = state.points[lastPointFromEdge];
                            point.coords = endPoint.coords;
                            endPoint.bindings.push(lastPointFromEdge); // pridavam ho do bindingu
                            state.highlightedEndPoint = null;
                        }
                    } else {
                        if (selectedEdge.to != null) {
                            const endPoint = state.endPoints[selectedEdge.to.pointId]
                            const lastPointId = selectedEdge.pointsId[selectedEdge.pointsId.length - 1];
                            endPoint.bindings = endPoint.bindings.filter(id => id !== lastPointId);
                            selectedEdge.to = null; 
                        }
                    }
                }
            }
            state.isLastPointMoving  = !state.isLastPointMoving
        },
        // Zvýrazní endpoint
        highlightEndPoint (state, action: PayloadAction<string | null>) {
            state.highlightedEndPoint = action.payload;
        },
        // Nastaví hranici vzdálenosti pro připojení k endpointu
        setDistanceThreshold (state, action : PayloadAction<number>) {
            state.distanceThreshold = action.payload;
        },
        // Nastaví simulační parametry
        setSimulationParams(state, action : PayloadAction<IPNSimulationParams | IContBlocksSimulationParams>) {
            state.simulationParams = action.payload; 
        }
    }
})

////////////////////////////////////////////////////////////////
/// Selektory

// Označený objekt
export const selectedObjectId = (state : RootState) => state.simObjectManagement.selectedObjectId;

// Vybere objekt podle id ze skladu
export const selectObj = (state : RootState, id: string) : IEditorObject | null => {
    const obj = state.simObjectManagement.objects[id]
    if (obj != null) {
        return {...obj}
    } else {
        // console.error("Coulndt select object with id: {id} beacause there is no object with this id in store") // TODO vyresit lepe
        return null;
    }
}

// Vybere body podle identifikátorů ze skladu  
export const selectPoints = (state: RootState, ids : string[]) : IPoint[] => ids.map(item => {
    const point = state.simObjectManagement.points[item];
    if (point != null) {
        return point;
    } else {
        return state.simObjectManagement.endPoints[item];
    }
});


// Jeslti je bod zvýrazněn pro možné spojení
export const visibleForConnection = (state: RootState, endPointId : string) => {
    const endPoint = state.simObjectManagement.endPoints[endPointId];
    const selectedId = state.simObjectManagement.selectedObjectId

    if (!state.simObjectManagement.isLastPointMoving ||  endPoint == null || !endPoint.connectable || selectedId == null)
        return false;

    return isOwnerClassAllowed(state.simObjectManagement, endPoint);
}


export const {
    addObject,
    addEdgeObject,
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
    unselectObject,
    setSimulationParams,
    setState
} = simObjectManagementSlice.actions;
export default simObjectManagementSlice.reducer;


////////////////////////////////////////////////////////////////////////////////////////////////
/// Pomocné funkce

// Pro přidání objektu
function addObjectFnc(state : SimObjectManagementState, obj : IEditorObject) : string {
    if (!Object.keys(state.objects).includes(obj.id)) {
        state.objects[obj.id] = obj
        if (isEdge(obj)) {
            obj.from && state.endPoints[obj.from.pointId].spawnedObjCnt++;
            state.edgeObjectsIds.push(obj.id);
        }
        return obj.id;
    } else {
        console.error(`Object with id ${obj.id} is already in`);
        return NULL_OBJ_ID;
    }
}

// Pro přidání bodu
function addPointFnc(state : SimObjectManagementState, point : IPoint) {
    if (!Object.keys(state.points).includes(point.id)) {
        state.points[point.id] = point;
    } else {
        console.error(`Points object already includes point with id ${point.id}`);
    }
}

// Odebrání hrany
function removeEdgeFnc(state : SimObjectManagementState, obj : IEditorObject) {
    const edge =  obj as IEdge;
    if (edge != null) {
        for (const point of edge.pointsId.map(id => state.points[id])){
            if (point == null) // endpoint
                continue;
                
            if (!Object.keys(state.endPoints).includes(point.id)) {
                delete state.points[point.id];
            }
        }
        
        if (edge.from != null) {
            state.endPoints[edge.from.pointId].spawnedObjCnt--;
        }
        
        if (edge.to != null) {
            state.endPoints[edge.to.pointId].bindings = state.endPoints[edge.to.pointId].bindings.filter(id => id !== edge.pointsId[edge.pointsId.length - 1]); // odeberu binding
        }

        state.edgeObjectsIds = state.edgeObjectsIds.filter(id => id !== edge.id);
        delete state.objects[edge.id];
    } else {
        console.log("Trying to remove edge that is not in state")
    }
}

// Odebrání navázaných hranových objektů    
function removeBoundedEdgeObjects(state : SimObjectManagementState, obj : IEditorObject) {
    for (const edgeId of state.edgeObjectsIds) {
        const edge = state.objects[edgeId] as IEdge;
        if ((edge.to != null && edge.to.objId === obj.id) || (edge.from != null && edge.from.objId === obj.id)) {
            removeEdgeFnc(state, edge);
        }
    }
}

// Jestli je splněna podmínka typu spojovaného objektu
function isOwnerClassAllowed(state : SimObjectManagementState, endPoint : IEndPoint) {
    const ownerObj = state.objects[endPoint.ownerId];
    const selectedEdgeObj = state.objects[state.selectedObjectId ?? NULL_OBJ_ID] as (IEdge | typeof NULL_OBJ_ID) ;
    
    if (typeof(selectedEdgeObj) != "string" && ownerObj != null &&  selectedEdgeObj.allowedClassNames != null && selectedEdgeObj.allowedClassNames.length > 0)
        return selectedEdgeObj.allowedClassNames.includes(ownerObj.className);
        
    return true;
}

function setIdCounters(editorObjectVal : number, pointVal : number) {
    SetEditorObjectCounter(editorObjectVal);    
    SetPointCounter(pointVal);}

function removeAllFnc(state : SimObjectManagementState) {
    state.objects = {};
    state.points = {};
    state.edgeObjectsIds = [];
    state.selectedObjectId = null;
    state.endPoints = {};
    setIdCounters(0,0);
}   