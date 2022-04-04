import { IEditorObject, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { useStoreHooks } from "./useStoreHooks";
import { changeObject } from "Editor/Feature/SimObjectManagementSlice";



export const useEditComponentUtils = <T extends IEditorObject,>(id : string) => {
    const { dispatch, useSelector } = useStoreHooks();

    const obj = {...useSelector(state => state.simObjectManagement.objects[id])} as T;    // TODO tady to pretypovani vyresit
  
    const dispatchChange = (obj : IEditorObject) => {
        dispatch(changeObject(obj));
    }

    const values = {
        obj,
        dispatchChange
    }

    return values
} 