import {FC,  ReactElement, useCallback,  useState} from 'react';
import {Menu, MenuItemButton} from "./Components/Utilities/UtilComponents/Menu"
import styles from "AppStyle.module.scss"
import TopMenuStyle from "Styles/TopMenuStyle.module.scss";
import { Loader } from 'Components/Utilities/UtilComponents/Loader';
import { Editor } from 'Components/Editor/Editor';
import { Place } from 'Components/PetriNets/PlaceSVGComponent';
import { Transition } from 'Components/PetriNets/TransitionSVGComponent';


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

  /* */
  const [showMenu, setShowMenu] = useState(true);
 
  const showMainMenu = useCallback<()=>void>(
    () => {
     setShowMenu(true)
   }, [])

  const [topMenuActions, setTopMenuActions] = useState<Action[]>([
    {name : "Do hlavního menu", method : showMainMenu}
  ])

  const initializePetriNets = () => {
    setShowMenu(false);
  }

  const initializeContBlocks = () => {
    setShowMenu(false);
  }


  const [mainComponents] = useState([ 
    {name: "Petriho sítě", initFunction: initializePetriNets},
    {name: "Spojitá bloková schémata", initFunction: initializeContBlocks}
  ]);

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
                    topMenuActions.map((item) => (<MenuItemButton 
                        buttonText={item.name}
                        onItemSelected={item.method}
                    />))
                }

            </Menu>
            <Editor items={[new Place(), new Transition()]}></Editor>
            <Loader visibile={false} >Jupiiiiiii </Loader>
      </>
    )
  }
  
}