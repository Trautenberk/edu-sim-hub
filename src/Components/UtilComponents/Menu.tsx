import {FC, MouseEventHandler, ReactElement} from "react";


type MenuProps = {
    divClassName? : string,
    listClassName? : string,
}

export const Menu : FC<MenuProps> = (props) => {
    return(
        <div className={props.divClassName}>
            <ul className={props.listClassName} >
            {props.children}
            </ul>
        </div>
    )
}


type MenuItemButtonProps = {
    listItemClass? : string,
    buttonClass? : string
    imageClass? : string,
    iconPath? : string,
    buttonText? : string,
    onItemSelected? : (... params : any[]) => any;
    onItemSelectedParams? : any[];
    imageElement? : ReactElement;
}

export const MenuItemButton : FC<MenuItemButtonProps> = (props) => {
    const onClickHandler : MouseEventHandler<HTMLButtonElement> = (e) => {
        if(props.onItemSelected){
            props.onItemSelected(props.onItemSelectedParams);
        }
    }

    return(
        <li className={props.listItemClass}>
                <button className={props.buttonClass} onClick={onClickHandler} >
                    {props.imageElement}
                    <p>{props.buttonText}</p>
                </button>
        </li>
    )
}

