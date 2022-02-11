import {FC, useCallback, useState} from 'react';
import {Menu, MenuItemButton} from "./Components/Utilities/UtilComponents/Menu"
import styles from "AppStyle.module.scss"
import editorStyles from "Styles/Editor/EditorStyle.module.scss"
import TopMenuStyle from "Styles/TopMenuStyle.module.scss";
import { Loader } from 'Components/Utilities/UtilComponents/Loader';
import { Place } from 'Model/PetriNets/Place';
import {Transition} from "Model/PetriNets/Transition"
import {MenuIcons} from "Components/Icons"
import { Canvas } from 'Components/Editor/Canvas';
import { PetriNetsComponentFactory } from 'Components/PetriNets/PetriNetsComponentFactory';
import { ICanvasElementFactory } from 'Components/CanvasComponentFactory';
import { useCanvasElementManagement } from 'Components/Utilities/CustomHooks/useCanvasElementManagement';
import { DraggableSVGGroupElement } from 'Components/Editor/MovableSVGGroupElement';
import { NotImplementedException } from 'Components/Utilities/Errors';
import uniqid from 'uniqid';
import { Coordinates, Direction } from 'Components/Utilities/UtilMethodsAndTypes';
import { ArrowSVGComponent } from 'Components/Utilities/UtilComponents/ArrowSVGComponent';

/**
 * @author Jaromír Březina
 * @abstract 
 */


export type Action = {
  name : string,
  params? : any[],
  actionMethod : (...params : any[]) => any
}

/**
 *  Komponenta reprezentující aplikaci
 * @component
 * 
 */
export const App : FC = () => {
  const [showMenu, setShowMenu] = useState(true);
  const showMainMenu = useCallback<()=>void>(
    () => {
     setShowMenu(true)
   }, [])

   const {elements, addElement, removeAllElements} = useCanvasElementManagement();

  const [topMenuActions, setTopMenuActions] = useState<Action[]>([
    {name : "Do hlavního menu", actionMethod : showMainMenu},
    {name : "Smazat vše", actionMethod : removeAllElements },
    {name : "Uložit", actionMethod : () => {throw new NotImplementedException()}},
    {name : "Nahrát", actionMethod: () => {throw new NotImplementedException()}}
  ]) 
  const [canvasElementFactory, setCanvasElementFactory] = useState<ICanvasElementFactory>(new PetriNetsComponentFactory())

  type CanvasElementType = {
    name: string,
    icon: string,
    onClick: () => void
  }

  const petriNetsCanvasElementsTypes : CanvasElementType[] = [
    {name: Place.Name, icon : MenuIcons.place, onClick: () => {addElement(new Place())}},
    {name: Transition.Name, icon : MenuIcons.transition, onClick: () => {addElement(new Transition())}}
  ];

  const contBlocksCanvasElementsTypes : CanvasElementType[] = [];

  const initializePetriNets = () => {
    setCanvasElementTypes(petriNetsCanvasElementsTypes);
    setCanvasElementFactory(new PetriNetsComponentFactory());
    setShowMenu(false);
  }

  const initializeContBlocks = () => {
    setCanvasElementTypes(contBlocksCanvasElementsTypes)
    setShowMenu(false);
  }

  const mainComponents = [ 
    {name: "Petriho sítě", initFunction: initializePetriNets},
    {name: "Spojitá bloková schémata", initFunction: initializeContBlocks}
  ];



  const [canvasElementTypes, setCanvasElementTypes] = useState<CanvasElementType[]>(petriNetsCanvasElementsTypes)

  if(showMenu){
    return(
      <div className={styles.main_page}>
        <Menu clasName={styles.main_menu} >
          {
            mainComponents.map(item => (
            <MenuItemButton buttonText={item.name}
                            onItemSelected={item.initFunction}
                            />
            ))
          }
        </Menu> 
      </div>  
    )
  }
  else{
    return(
      <div className={styles.main_page}>
        <Menu clasName={TopMenuStyle.top_menu}>
            {
                topMenuActions.map(item => <MenuItemButton buttonText={item.name} onItemSelected={item.actionMethod}/>)
            }
        </Menu>
        <Menu clasName={editorStyles.editor_menu} >
                {
                  canvasElementTypes.map(item => 
                    (<MenuItemButton buttonText={item.name} iconPath={item.icon} onItemSelected={item.onClick}>
                       <img src={item.icon}/>
                     </MenuItemButton>)
                  )
                }
         </Menu>
                <Canvas>
                    {Object.values(elements).map(item => <DraggableSVGGroupElement
                      key={uniqid()} 
                      coords={{posX: 30, posY: 30}}
                      id={item.id} 
                      canvasElement={canvasElementFactory.getElement(item)}                   
                       />)
                    }
                </Canvas>
        <Loader visibile={false} >Jupiiiiiii </Loader>
      </div>
    )
  }
  
}


type ConnectionProps = {
  start : Coordinates,
  end : Coordinates
}

const Connection : FC<ConnectionProps> = (props) => {
  return(
    <>
      <line x1={props.start.posX} y1={props.start.posY} x2={props.end.posX} y2={props.end.posY} stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    </>
  )
}