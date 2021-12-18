import {FC,  ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import { PetriNets } from './Components/MainComponents/PetriNets';
import {Menu, MenuItemButton} from "./Components/UtilComponents/Menu"
import styles from "./App.module.css"



export type Action = {
  name : string,
  params? : any[],
  method : (... params : any[]) => any
}

type MainComponent = {
  name : string,
  component : ReactElement
}

// const TopMenuDefaultActions : Action[] = [
//   {name: "Do hlavního menu", params: [], method: () => {}}
// ]

// const MainComponents : MainComponent[] = [
//   {name: "Petriho sítě", component: <PetriNets topMenuActions={TopMenuDefaultActions}/>}
// ]



export const App : FC = () => {

  const [showMenu, setShowMenu] = useState(true);
  const [mainComponent, setMainComponent] = useState<ReactElement>();
  
  const showMainMenu = useCallback<()=>void>(
    () => {
      console.log("")
     setShowMenu(true)
   }, [])

  const [topMenuActions, setTopMenuActions] = useState<Action[]>([
    {name : "Do hlavního menu", method : showMainMenu}
  ])

  const [mainComponents] = useState([ 
    {name: "Petriho sítě", component: <PetriNets topMenuActions={topMenuActions}/>}
  ]);

  const onMainMenuItemSelected = (selectedComponent : ReactElement) => {
    setMainComponent(selectedComponent);
    setShowMenu(false);
  }


  if(showMenu){
    return(
      <div className={styles.MainPage}>
        <Menu listClassName={styles.MainMenuList} divClassName={styles.MainMenuDiv} >
          {
            mainComponents.map(item => (
            <MenuItemButton buttonText={item.name}
                            onItemSelectedParams={[item.component]}
                            onItemSelected={onMainMenuItemSelected}
                            buttonClass={styles.MainMenuItem}
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