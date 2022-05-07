import { selectObj } from "Editor/Feature/SimObjectManagementSlice";
import { NULL_OBJ_ID } from "Editor/Model/EditorObject";
import { FC } from "react";
import { IObjectGUIComponentFactory } from "./ObjectGUIComponentFactory";
import { useStoreHooks } from "./Utilities/CustomHooks";
import style from "Editor/Styles/EditWindow.module.scss"




export const StatisticsWindow : FC<{factory : IObjectGUIComponentFactory}> = (props) => {
    const { useSelector } = useStoreHooks();

    const selectedObjectId = useSelector(state => state.simObjectManagement.selectedObjectId); 
    const object =  useSelector(state => selectObj(state, selectedObjectId ?? NULL_OBJ_ID)); // TODO odstanit ten empty string, mozna to udelat tak ze se bude predavat celej ten objekt
    const statistics = useSelector(state => state.statistics.statistics);
 
    return (
        <div className={style.statistics_window}>
            {selectedObjectId != null && object != null && statistics != null && props.factory.getElement(object).StatisticsComponent({id : selectedObjectId, statistics})}
            {selectedObjectId == null && <DefaultWindow/>}
        </div>
    )
}



const DefaultWindow : FC = () => {
    return (
        <p>Není co zobrazit, nejdříve vyberte nějakou komponentu v hlavní ploše.</p>
    )
}


export const NothingToShowWindow : FC = () => {
    return (
        <p>Pro vybraný typ elementu nejsou dostupné žádné statistiky, vyberte prosím jiný.</p>
    )
}