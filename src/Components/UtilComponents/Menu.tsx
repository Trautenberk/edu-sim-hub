import {Children, FC, MouseEventHandler, ReactElement} from "react";


type MenuProps = {
    clasName? : string,
    divClassName? : string,
    listClassName? : string,
}

export const Menu : FC<MenuProps> = (props) => {
    return(
        <div className={props.clasName}>
            <ul className={props.listClassName} >
            {props.children}
            </ul>
        </div>
    )
}


type MenuItemButtonProps = {
    className? : string,
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
                    {props.children}
                    {props.buttonText}
                </button>
        </li>
    )
}

