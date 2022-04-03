import { IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory"
import React, {FC} from "react"
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks"
import style from "Editor/Styles/EditMenu.module.scss"
import { useStoreHooks } from "./Utilities/CustomHooks"


type EditMenuProps = {
    factory : IObjectGUIComponentFactory
}

export const EditMenu : FC<EditMenuProps> = (props) => {
    const { dispatch, useSelector } = useStoreHooks();


    const selectedObjectId = useSelector(state => state.simObjectManagement.selectedObjectId); 
    const object =  useSelector(state => state.simObjectManagement.objects[selectedObjectId ?? ""]) // TODO odstanit ten empty string

    if (selectedObjectId != null && object != null) {
        const EditComponent = props.factory.getElement(object).EditComponent; 
        return(

            <div className={style.edit_menu}>
                <EditComponent id={selectedObjectId} />
            </div>
        )
    }  else {
        return(
            <div className={style.edit_menu}>
                <p>Neni vybran zadny element</p>
            </div>
        )
    }    
}