import {FunctionComponent, ReactElement, useState} from "react";
import {EditorMenu, onItemSelectedType}  from "./EditorMenu";
import styles from "./Editor.module.css"
import {Canvas} from "./Canvas";
import {Spot} from "./MenuItems/PetriNets/Spot";
import {Transition} from "./MenuItems/PetriNets/Transition"
import {IEditorItem} from "./EditorItem"


export const Editor : FunctionComponent = () => {

    const [canvasElements, setCanvasElements] = useState<ReactElement[]>([]);
    
    const spotEditorItem = new Spot();
    const transitionEditorItem = new Transition();

    let menuItems : IEditorItem[] = [spotEditorItem, transitionEditorItem]


    let onMenuItemSelection : onItemSelectedType = (item) => {
        console.log("Click: " + item.name);
        let element = (item as IEditorItem).getCanvasElement();
        setCanvasElements([...canvasElements, element]);
        console.log("Canvas elements length: " + canvasElements.length);
    }

    return(
        <div className={styles.Editor}>
            <EditorMenu items={menuItems} onItemSelected={onMenuItemSelection}/>
            <Canvas>
                {canvasElements}
            </Canvas>
        </div>
    )
}







// interface IEditor{
    //     onItemSelection : onItemSelectedType;
    //     appendCanvas : appendCanvasType;
    // }
    
    // type EditorProps = {
    //     canvasElements : ReactElement<CanvasElement> [];
    // }
    
    // type EditorState = EditorProps;
    
    // export class Editor extends Component<EditorProps, EditorState> {
        
    //     static spotEditorItem : IEditorItem = new Spot();
    //     static transitionEditorIten : IEditorItem = new Transition();
    
    //     static menuMockupItems : IEditorItem[] = [Editor.spotEditorItem, Editor.transitionEditorIten];
    //     static canvasMockupItems : ReactElement [] = [];
    
    //     constructor(props : EditorProps){
    //         super(props);
    //         this.state = {
    //             canvasElements : props.canvasElements,
    //         }
    //     }
    
    //     private getElementProps : () => CanvasElementPropsWithouId = () => {
    //         let obj : CanvasElementPropsWithouId= {posX : 30, posY : 30 ,  onClick : this.onElementClick};
    //         return obj;
    //     }
    
    //     onItemSelection : onItemSelectedType = (selectedItem) => {
    //         console.log("item selected!!: " + selectedItem.name)
    //         // let editorItem = (selectedItem as IEditorItem);    TODO : tady tuto sekci napsat nejak hezceji a bezpecneji
    //         let element = (selectedItem as IEditorItem).getCanvasElement(this.getElementProps());
    //         this.appendCanvasElement(element);
    //     }
        
    //     private appendCanvasElement : (element : ReactElement<CanvasElement>) => void = (element) => {
    
    //         this.setState(prevState => ({
    //             canvasElements : [...prevState.canvasElements, element]
    //         }))
    //         Editor.canvasElementsMap.set(element.props.id, element);
    //         console.log("Appended element: "  + this.state.canvasElements.length);
    //     }
    
    //     private onElementClick : (elementID : string) => void = (elementID) => {
    //         if (Editor.canvasElementsMap.has(elementID)){
    //             let clickedElement = Editor.canvasElementsMap.get(elementID);
    //             let test =  clickedElement?.type;
    //             console.log("Test : " + test);
    
    //         }
    //         else
    //             console.log("Fuck, id neni v mape : " + elementID);
    //     } 
    
    //     render(){
    //         return(
    //             <div className={styles.Editor}>
    //                 <EditorMenu items={Editor.menuMockupItems} onItemSelected={this.onItemSelection}/>
    //                 <Canvas>
    //                     {this.state.canvasElements}
    //                 </Canvas>
    //             </div>
    //         )
    //     }
    // }