import { FC, useState } from "react";
import { Action } from "../../App";
import { Editor } from "../Editor/Editor";
import { Spot } from "../Editor/MenuItems/PetriNets/Spot";
import { Transition } from "../Editor/MenuItems/PetriNets/Transition";
import { Menu, MenuItemButton } from "../UtilComponents/Menu";
import styles from "./TopMenu.module.css";
import {} from ""


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

    const [menuItems] = useState([new Spot(), new Transition()]);
    const actions : Action[] = [
        {name: "Smazat vše", method: raiseClearEvent},
        {name: "Nahrát", method: () => {}},
        {name: "Spustit simulaci", method: () => {}}
    ]
    const topMenuActions : Action[] = [...props.topMenuActions, ...actions];
    

    return(
        <>
            <Menu listClassName={styles.TopMenuList}  divClassName={styles.TopMenuDiv}>
                {
                    topMenuActions.map((item) => (<MenuItemButton 
                        buttonText={item.name}
                        buttonClass={styles.TopMenuItem}
                        onItemSelected={item.method}
                    />))
                }

            </Menu>
            <Editor clearEventName={clearEventName} menuItems={menuItems}></Editor>
        </>
    )
} 