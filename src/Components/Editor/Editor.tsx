import {FC, ReactElement, useCallback, useEffect, useState} from "react";
import styles from "Styles/Editor/EditorStyle.module.scss"
import {Canvas} from "./Canvas";
import {EditorItem} from "./EditorItem"
import { CanvasContextProvider } from "../../Store/Editor/Canvas/CanvasContext";
import { Menu, MenuItemButton } from "Components/Utilities/UtilComponents/Menu";
import uniqid from "uniqid";
import { useAppSelector } from "Store/Hooks";

type EditorProps = {
    items : EditorItem[];
}

export const Editor : FC<EditorProps> = (props) => {
    const [canvasElements, setCanvasElements] = useState<ReactElement[]>([]);
    
    let onMenuItemClicked  = (item : any) => {
        let element = (item[0] as EditorItem).getCanvasElement();
        setCanvasElements([...canvasElements, element]);
    }

    const menuButtons  = props.items.map(item => 
                                <MenuItemButton key={uniqid()}
                                         onItemSelected={onMenuItemClicked} 
                                         onItemSelectedParams={[item]}
                                         iconPath={item.iconPath}
                                         buttonText={item.name}>
                                        <img src={item.iconPath}></img>
                                </MenuItemButton>)

    return(
        <>
            <Menu clasName={styles.editor_menu} >
                {menuButtons}
            </Menu>
            <CanvasContextProvider>
                <Canvas>
                    {canvasElements}
                </Canvas>
            </CanvasContextProvider>
        </>
    )
}
