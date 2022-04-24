import { IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory"
import React, {FC} from "react"
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks"
import style from "Editor/Styles/EditWindow.module.scss"
import { useStoreHooks } from "./Utilities/CustomHooks"
import { selectObj } from "Editor/Feature/SimObjectManagementSlice"
import { NULL_OBJ_ID } from "Editor/Model/EditorObject"


type EditWindowProps = {
    factory : IObjectGUIComponentFactory
}

export const EditWindow : FC<EditWindowProps> = (props) => {
    const { useSelector } = useStoreHooks();


    const selectedObjectId = useSelector(state => state.simObjectManagement.selectedObjectId); 
    const object =  useSelector(state => selectObj(state, selectedObjectId ?? NULL_OBJ_ID)); // TODO odstanit ten empty string, mozna to udelat tak ze se bude predavat celej ten objekt

    if (selectedObjectId != null && object != null) {
        const EditComponent = props.factory.getElement(object).EditComponent; 
        return(

            <div className={style.edit_window}>
                <EditComponent id={selectedObjectId} />
            </div>
        )
    }  else {
        const SimulationParamsEdit = props.factory.getSimulationParamsEdit();
        return(
            <div className={style.edit_window}>
                <SimulationParamsEdit></SimulationParamsEdit>                
            </div>
        )
    }    
}