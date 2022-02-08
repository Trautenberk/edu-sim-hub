import {FC, useCallback,  useState} from 'react';
import {Menu, MenuItemButton} from "./Components/Utilities/UtilComponents/Menu"
import styles from "AppStyle.module.scss"
import editorStyles from "Styles/Editor/EditorStyle.module.scss"
import TopMenuStyle from "Styles/TopMenuStyle.module.scss";
import { Loader } from 'Components/Utilities/UtilComponents/Loader';
import { Place } from 'Model/PetriNets/Place';
import {Transition} from "Model/PetriNets/Transition"
import {MenuIcons} from "Components/Icons"
import { CanvasContextProvider } from 'Store/Editor/Canvas/CanvasContext';
import { Canvas } from 'Components/Editor/Canvas';
import { PetriNetsComponentFactory } from 'Components/PetriNets/PetriNetsComponentFactory';
import { ICanvasElementFactory } from 'Components/CanvasComponentFactory';
import { useCanvasElementManagement } from 'Components/Utilities/CustomHooks/useCanvasElementManagement';

/**
 * @author Jaromír Březina
 * @abstract 
 */


export type Action = {
  name : string,
  params? : any[],
  method : (...params : any[]) => any
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

  const [topMenuActions, setTopMenuActions] = useState<Action[]>([
    {name : "Do hlavního menu", method : showMainMenu}
  ])
  const [canvasElementFactory, setCanvasElementFactory] = useState<ICanvasElementFactory | null>(null)

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

  const {elements, addElement} = useCanvasElementManagement();

  const canvasElements = Object.values(elements).map(item => canvasElementFactory?.getElement(item))
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
      <>
        <Menu clasName={TopMenuStyle.top_menu}>
            {
                topMenuActions.map(item => <MenuItemButton buttonText={item.name} onItemSelected={item.method}/>)
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
            <CanvasContextProvider>
                <Canvas>
                    {canvasElements}
                </Canvas>
            </CanvasContextProvider>
        <Loader visibile={false} >Jupiiiiiii </Loader>
      </>
    )
  }
  
}