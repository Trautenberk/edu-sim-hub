import {FC, ReactElement, useCallback, useEffect, useState} from "react";
import {EditorMenu, onItemSelectedType}  from "./EditorMenu";
import styles from "./Editor.module.css"
import {Canvas} from "./Canvas";
import {IEditorItem} from "./EditorItem"
import { CanvasContextProvider } from "../../Store/Editor/Canvas/CanvasContext";

type EditorProps = {
    menuItems : IEditorItem[];
    clearEventName : string;
}

export const Editor : FC<EditorProps> = (props) => {
    
    const [canvasElements, setCanvasElements] = useState<ReactElement[]>([]);
    const [menuItems] = useState<IEditorItem[]>(props.menuItems);

    const clearEventHandler : EventListener =  useCallback<EventListener>(
     (evt) => {
        setCanvasElements([]);
    }, [])
    
    let onMenuItemSelection : onItemSelectedType = (item) => {
        let element = (item as IEditorItem).getCanvasElement();
        setCanvasElements([...canvasElements, element]);
    }

    useEffect(() => {
        document.addEventListener(props.clearEventName, clearEventHandler);
        return () => {
            document.removeEventListener(props.clearEventName, clearEventHandler);
        }
    }, [])

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

