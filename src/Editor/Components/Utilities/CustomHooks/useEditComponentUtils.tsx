import { IEditorObject, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { useStoreHooks } from "./useStoreHooks";
import { changeObject } from "Editor/Feature/SimObjectManagementSlice";


/**
 * Pomocný React custom hook pro přidání prostředků společných pro všechny komponenty editačního okna
 * @param id Id objektu pro který se má okno zobrazit 
 * @returns Objekt obsahující požadované prostředky
 */
export const useEditComponentUtils = <T extends IEditorObject,>(id : string) => {
    const { dispatch, useSelector } = useStoreHooks();

    // Vytáhne požadovaný objekt ze skladu
    const obj = {...useSelector(state => state.simObjectManagement.objects[id])} as T;    // TODO tady to pretypovani vyresit
  
    //  funcke vyvolávající akci informující o změně objektu 
    const dispatchChange = (obj : IEditorObject) => {
        dispatch(changeObject(obj));
    }

    const values = {
        obj,
        dispatchChange
    }

    return values
} 