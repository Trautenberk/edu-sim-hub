import { FC, useState } from "react";
import { Action } from "../../App";
import { Editor } from "../Editor/Editor";
import { Spot } from "../Editor/MenuItems/PetriNets/Spot";
import { Transition } from "../Editor/MenuItems/PetriNets/Transition";
import { Menu, MenuItemButton } from "../Utilities/UtilComponents/Menu";
import {Loader} from "Components/Utilities/UtilComponents/Loader"
import { setTimeout } from 'timers';
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

    const [showLoader, setShowLoader] = useState(false);
    const [items] = useState([new Spot(), new Transition()]);

    const showLoaderForDuration = async (duration : number) => {
        setShowLoader(true);
        setTimeout(() => {setShowLoader(false)}, duration);
      }

    const actions : Action[] = [
        {name: "Smazat vše", method: raiseClearEvent},
        {name: "Nahrát", method: () => {}},
        {name: "Uložit", method: () => {}},
        {name: "Spustit simulaci", method: () => {}},
        {name: "Show loader", method: () => {showLoaderForDuration(200000)}}
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
            <Loader visibile={showLoader} >Jupiiiiiii </Loader>
        </>
    )
} 