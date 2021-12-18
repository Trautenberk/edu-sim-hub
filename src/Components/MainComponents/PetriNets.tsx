import { FC, useState } from "react";
import { Action } from "../../App";
import { Editor } from "../Editor/Editor";
import { Spot } from "../Editor/MenuItems/PetriNets/Spot";
import { Transition } from "../Editor/MenuItems/PetriNets/Transition";
import { Menu, MenuItemButton } from "../UtilComponents/Menu";
import styles from "Styles/TopMenuStyle.module.scss";


type PetriNetsProps = {
    topMenuActions : Action[]
}

export const PetriNets : FC<PetriNetsProps> = (props) => {

    // side menu
    // main menu 
    // Editor
    const clearEventName = "clearEvent";
    const raiseClearEvent = () => {
        document.dispatchEvent(new Event(clearEventName))
    }

    const [items] = useState([new Spot(), new Transition()]);
    const actions : Action[] = [
        {name: "Smazat vše", method: raiseClearEvent},
        {name: "Nahrát", method: () => {}},
        {name: "Uložit", method: () => {}},
        {name: "Spustit simulaci", method: () => {}}
    ]
    const topMenuActions : Action[] = [...props.topMenuActions, ...actions];
    
    return(
        <>
            <Menu clasName={styles.top_menu}>
                {
                    topMenuActions.map((item) => (<MenuItemButton 
                        buttonText={item.name}
                        onItemSelected={item.method}
                    />))
                }

            </Menu>
            <Editor clearEventName={clearEventName} items={items}></Editor>
        </>
    )
} 