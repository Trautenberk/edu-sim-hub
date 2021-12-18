import { MouseEventHandler, FunctionComponent } from "react";
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
                <button className={styles.EditorMenuButton} onClick={onClickHandler} >
                    <img className={styles.EditorMenUImage} src={props.item.iconPath} />
                    <p>
                        {props.item.name}
                    </p>
                </button>
        </li>
    )
}



