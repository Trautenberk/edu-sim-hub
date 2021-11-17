import { ReactElement, Component, MouseEventHandler, FunctionComponent } from "react";
import { IEditorItem } from "./EditorItem";
import styles from "./EditorMenu.module.css"
import uniqid from 'uniqid';

export type onItemSelectedType = (item : IEditorMenuItem) => void;

export interface IEditorMenuItem {
    name : string;
    iconPath : string  | undefined;
}

export type EditorMenuProps = {
    items : IEditorMenuItem[];
    onItemSelected : onItemSelectedType;
}

export const EditorMenu : FunctionComponent<EditorMenuProps> = (props) => {

    return(
        <div className={styles.EditorMenu}>
            <ul>
            {
                props.items.map((item) => <EditorMenuItem key={uniqid()}  item={item} onItemSelected={props.onItemSelected}/>)
            }
            </ul>
        </div>
    )
}



type EditorMenuItemProps = {
    key : string
    item : IEditorMenuItem
    onItemSelected : onItemSelectedType;
}

const EditorMenuItem : FunctionComponent<EditorMenuItemProps> = (props) => {

    const onClickHandler : MouseEventHandler<HTMLButtonElement> = (e) => {
        props.onItemSelected(props.item);
    }

    return(
        <li className={styles.List}>
            <div className={styles.EditorMenuItem} >
                <button className={styles.EditorMenuButton} onClick={onClickHandler} >
                    <img className={styles.EditorMenUImage} src={props.item.iconPath} />
                    {props.item.name}
                </button>
            </div>
        </li>
    )
}





// export interface  IEditorMenuProps {
//     items : IEditorMenuItem[];
//     onItemSelected : onItemSelectedType;
// }

// export class EditorMenu extends Component<IEditorMenuProps> {

//     constructor(props : IEditorMenuProps){
//         super(props);
//     }   

//     render(){
//         return(
//             <div className={styles.EditorMenu}>
//                 <ul>
//                 {
//                     this.props.items.map((item) => <EditorMenuItem key={uniqid()}  item={item} onItemSelected={this.props.onItemSelected}/>)
//                 }
//                 </ul>
//             </div>
//         )
//     }
// }


// interface IEditorMenuItemProps{
//     key : string
//     item : IEditorMenuItem
//     onItemSelected : onItemSelectedType;
// }

// class EditorMenuItem  extends Component<IEditorMenuItemProps> {

//     constructor(props : IEditorMenuItemProps){
//         super(props);
//     }

//     private onClickHandler : MouseEventHandler = (e) => {this.props.onItemSelected(this.props.item)} 

//     render() {
//         return(
//             <li className={styles.List}>
//                 <div className={styles.EditorMenuItem} >
//                     <button className={styles.EditorMenuButton} onClick={this.onClickHandler} >
//                         <img className={styles.EditorMenUImage} src={this.props.item.iconPath} />
//                         {this.props.item.name}
//                     </button>
//                 </div>
//             </li>
//         )
//     }
// }

