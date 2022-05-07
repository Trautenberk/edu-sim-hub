import {Children, FC, MouseEventHandler, ReactElement} from "react";


type MenuProps = {
    clasName? : string,
    divClassName? : string,
    listClassName? : string,
}

/**
 * React komponenta sloužící jako menu do které lze přidávat další komponenty jako položky
 * @param props 
 * @returns 
 */
export const Menu : FC<MenuProps> = (props) => {
    return(
        <div className={props.clasName}>
            <ul className={props.listClassName} >
            {props.children}
            </ul>
        </div>
    )
}


type MenuItemButtonProps = MenuProps & {
    listItemClass? : string,
    buttonClass? : string
    imageClass? : string,
    iconPath? : string,
    buttonText? : string,
    onItemSelected? : (... params : any[]) => any;
    onItemSelectedParams? : any[];
    imageElement? : ReactElement;
}

/**
 * React komponenta tvořící položku menu 
 * @param props 
 * @returns 
 */
export const MenuItemButton : FC<MenuItemButtonProps> = (props) => {
    const onClickHandler : MouseEventHandler<HTMLButtonElement> = (e) => {
        if(props.onItemSelected){
            props.onItemSelected(props.onItemSelectedParams);
        }
    }

    return(
        <li className={props.listItemClass}>
            <button className={props.buttonClass} onClick={onClickHandler}>
                {props.children != null && 
                    <div>  
                        {props.children}
                        <p>{props.buttonText}</p>
                    </div>
                }
                {props.children == null &&  <p>{props.buttonText}</p>}
            </button>
        </li>
    )
}

