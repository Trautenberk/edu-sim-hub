import {FunctionComponent, ReactElement, useState} from "react";
import {EditorMenu, onItemSelectedType}  from "./EditorMenu";
import styles from "./Editor.module.css"
import {Canvas} from "./Canvas";
import {Spot} from "./MenuItems/PetriNets/Spot";
import {Transition} from "./MenuItems/PetriNets/Transition"
import {IEditorItem} from "./EditorItem"
import { CanvasContextProvider } from "../../Store/Editor/Canvas/CanvasContext";


export const Editor : FunctionComponent = () => {

    const [canvasElements, setCanvasElements] = useState<ReactElement[]>([]);
    const [menuItems] = useState<IEditorItem[]>([new Spot(), new Transition()])
    
    let onMenuItemSelection : onItemSelectedType = (item) => {
        console.log("Click: " + item.name);
        let element = (item as IEditorItem).getCanvasElement();
        setCanvasElements([...canvasElements, element]);
        console.log("Canvas elements length: " + canvasElements.length);
    }

    return(
        <div className={styles.Editor}>
            <EditorMenu items={menuItems} onItemSelected={onMenuItemSelection}/>
            <CanvasContextProvider>
                <Canvas>
                    {canvasElements}
                </Canvas>
            </CanvasContextProvider>

        </div>
    )
}

