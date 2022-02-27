import { IObjectGUIComponentFactory } from "Components/ObjectGUIComponentFactory"
import {FC} from "react"
import { useAppDispatch, useAppSelector } from "Store/Hooks"
import style from "Styles/Editor/EditMenu.module.scss"


type EditMenuProps = {
    factory : IObjectGUIComponentFactory
}

export const EditMenu : FC<EditMenuProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const selectedObjectId = useSelector(state => state.pointEdgeSelection.selectedObjectId); 
    const object =  useSelector(state => state.simObjectManagement.objects[selectedObjectId ?? ""]) // TODO odstanit ten empty string

    if (selectedObjectId != null) {
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