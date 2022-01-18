import {FC,  ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import { PetriNets } from './Components/MainComponents/PetriNets';
import {Menu, MenuItemButton} from "./Components/Utilities/UtilComponents/Menu"
import styles from "AppStyle.module.scss"


/**
 * @author Jaromír Březina
 * @abstract 
 */


export type Action = {
  name : string,
  params? : any[],
  method : (... params : any[]) => any
}

type MainComponent = {
  name : string,
  component : ReactElement
}


/**
 *  Komponenta reprezentující aplikaci
 * @component
 * 
 */
export const App : FC = () => {

  /* */
  const [showMenu, setShowMenu] = useState(true);
  const [mainComponent, setMainComponent] = useState<ReactElement>();
 

  const showMainMenu = useCallback<()=>void>(
    () => {
     setShowMenu(true)
   }, [])

  const [topMenuActions, setTopMenuActions] = useState<Action[]>([
    {name : "Do hlavního menu", method : showMainMenu}
  ])


  const [mainComponents] = useState([ 
    {name: "Petriho sítě", component: <PetriNets topMenuActions={topMenuActions}/>},
    {name: "SHO", component: <PetriNets topMenuActions={topMenuActions}/>},
    {name: "Spojitá simulace", component: <PetriNets topMenuActions={topMenuActions}/>}

  ]);

  const onMainMenuItemSelected = (selectedComponent : ReactElement) => {
    setMainComponent(selectedComponent);
    setShowMenu(false);
  }


  if(showMenu){
    return(
      <div className={styles.main_page}>
        <Menu clasName={styles.main_menu} >
          {
            mainComponents.map(item => (
            <MenuItemButton buttonText={item.name}
                            onItemSelectedParams={[item.component]}
                            onItemSelected={onMainMenuItemSelected}
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
      {mainComponent}
      </>
    )
  }
  
}