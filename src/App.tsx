import {FC, useCallback, useEffect, useState} from 'react';
import {Menu, MenuItemButton} from "./Components/Utilities/UtilComponents/Menu"
import styles from "AppStyle.module.scss"
import editorStyles from "Styles/Editor/EditorStyle.module.scss"
import TopMenuStyle from "Styles/TopMenuStyle.module.scss";
import { Loader } from 'Components/Utilities/UtilComponents/Loader';
import { Place } from 'Model/PetriNets/Place';
import { Transition } from "Model/PetriNets/Transition"
import { MenuIcons } from "Components/Icons"
import { Canvas } from 'Components/Editor/Canvas';
import { PetriNetsGUIComponentFactory } from 'Components/PetriNets/PetriNetsComponentFactory';
import { IObjectGUIComponentFactory } from 'Components/ObjectGUIComponentFactory';
import { NotImplementedException } from 'Components/Utilities/Errors';
import { DraggableGroupSVG } from 'Components/Utilities/UtilComponents/DraggableGroupSVG';
import { EdgeSVG } from 'Components/Utilities/UtilComponents/EdgeSVG';
import { useAppDispatch, useAppSelector } from 'Store/Hooks';
import { clearAllEdges, removeEdge, selectedObjectId, unselectEdge, selectedEdge, unselectObject } from 'Feature/PointEdgeSelectionSlice';
import { addObject, removeAllObjects, removeObject } from 'Feature/SimObjectManagementSlice';
import { EditMenu } from 'Components/Editor/EditMenu';
// import TestModule from "../wasm-build/Simulator";
import test from "../pkg";

/**
 * @author Jaromír Březina
 * @abstract 
 */


export type Action = {
  name : string,
  params? : any[],
  actionMethod : (...params : any[]) => any
}



// const test = import("../wasm-build/Simulator").then(item => console.log("test"));

/**
 *  Komponenta reprezentující aplikaci
 * @component
 * 
 */
export const App : FC = () => {
  const useSelector = useAppSelector;
  const dispatch = useAppDispatch();

  const [showMenu, setShowMenu] = useState(true);
  const showMainMenu = useCallback<()=>void>(
    () => {
     setShowMenu(true)
   }, [])

  const simObjects = useSelector(state => state.simObjectManagement.objects);

  const clearAllAction = useCallback(()=> {
    dispatch(clearAllEdges());
    dispatch(removeAllObjects())
  },[dispatch])
  
  const [topMenuActions, setTopMenuActions] = useState<Action[]>([
    {name : "Do hlavního menu", actionMethod : showMainMenu},
    {name : "Smazat vše", actionMethod : clearAllAction },
    {name : "Uložit", actionMethod : () => {throw new NotImplementedException()}},
    {name : "Nahrát", actionMethod: () => {throw new NotImplementedException()}}
  ]) 
  const [objectGUIComponentFactory, setobjectGUIComponentFactory] = useState<IObjectGUIComponentFactory>(new PetriNetsGUIComponentFactory())
  const edges = useSelector(state => state.pointEdgeSelection.edges);

  type CanvasElementType = {
    name: string,
    icon: string,
    onClick: () => void
  }

  const petriNetsCanvasElementsTypes : CanvasElementType[] = [
    {name: Place.Name, icon : MenuIcons.place, onClick: () => {dispatch(addObject(new Place().toSerializableObj()))}},
    {name: Transition.Name, icon : MenuIcons.transition, onClick: () => {dispatch(addObject(new Transition().toSerializableObj()))}}
  ];

  const contBlocksCanvasElementsTypes : CanvasElementType[] = [];

  const initializePetriNets = () => {
    setCanvasElementTypes(petriNetsCanvasElementsTypes);
    setobjectGUIComponentFactory(new PetriNetsGUIComponentFactory());
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

  const selectedId = useSelector(state => selectedObjectId(state));
  const selectedEdgeId = useSelector(selectedEdge);

  const handleDeleteKeyPressed = useCallback(() : void => {
    if (selectedId != null) {
      console.log(`delete element with id ${selectedId}`)
      dispatch(unselectObject());
      dispatch(removeObject(selectedId))
      // TODO element po odebrani je furt selected
    }
    if (selectedEdgeId != null) {
      dispatch(removeEdge(selectedEdgeId));
    }
    
  },[selectedId, selectedEdgeId, dispatch])

  const onKeyDownHandler =  useCallback(
    (e : KeyboardEvent) : void => {
    console.log(`Key pressed ${e.key}`);

    switch (e.key) {
      case "Delete":
        return handleDeleteKeyPressed();
    }
  },[handleDeleteKeyPressed])

  const onGridClick = useCallback(
    () => {
      dispatch(unselectEdge);
    }, [dispatch]
  ) 

  useEffect(
    () => {
      document.addEventListener("keydown", onKeyDownHandler)
      return(() => document.removeEventListener("keydown", onKeyDownHandler))
    },[onKeyDownHandler]
  )


  if(showMenu){
    return(
      <div className={styles.main_page}>
        <Menu clasName={styles.main_menu} >
          {
            mainComponents.map(item => (<MenuItemButton key={item.name} buttonText={item.name} onItemSelected={item.initFunction}/>))
          }
        </Menu> 
      </div>  
    )
  } else {
    return (
      <div className={styles.main_page}>
        <Menu clasName={TopMenuStyle.top_menu}>
            {topMenuActions.map(item => <MenuItemButton key={item.name} buttonText={item.name} onItemSelected={item.actionMethod}/>)}
        </Menu>
        <Menu clasName={editorStyles.editor_menu} >
                {
                  canvasElementTypes.map(item => 
                    (<MenuItemButton  key={item.name} buttonText={item.name} iconPath={item.icon} onItemSelected={item.onClick}>
                       <img src={item.icon} alt={""}/>
                     </MenuItemButton>)
                  )
                }
         </Menu>
          <Canvas onGridClick={onGridClick}>
              {Object.values(simObjects).map(item => <DraggableGroupSVG
                key={item.id}
                coords={{x: 30, y: 30}}
                id={item.id}
                canvasElement={objectGUIComponentFactory.getElement(item).SVGComponent}                   
                  />)
              }
              {Object.values(edges).map(item => <EdgeSVG
              key={item.id} 
              edgeId={item.id}
              />)}
          </Canvas>
          <EditMenu factory={objectGUIComponentFactory} />
        <Loader visibile={false} >Jupiiiiiii </Loader>
      </div>
    )
  }
  
}
