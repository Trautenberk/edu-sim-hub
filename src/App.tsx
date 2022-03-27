import React, {FC, useCallback, useEffect, useState} from 'react';
import {Menu, MenuItemButton, Loader, DraggableGroupSVG, EdgeSVG} from "Editor/Components/Utilities/UtilComponents"
import styles from "AppStyle.module.scss"
import editorStyles from "Editor/Styles/EditorStyle.module.scss"
import TopMenuStyle from "Editor/Styles/TopMenuStyle.module.scss";
import { Place, Transition } from "Editor/Model/PetriNets" 
import { MenuIcons } from "Editor/Components/Icons"
import { NotImplementedException } from 'Editor/Components/Utilities';
import { useAppDispatch, useAppSelector } from 'Editor/Store/Hooks';
import { clearAllEdges, removeEdge, selectedObjectId, unselectEdge, selectedEdge, unselectObject } from 'Editor/Feature/PointEdgeSelectionSlice';
import { addObject, removeAllObjects, removeObject } from 'Editor/Feature/SimObjectManagementSlice';
import { EditMenu, Canvas, IObjectGUIComponentFactory, ContBlocksGUIComponentFactory, PetriNetsGUIComponentFactory } from "Editor/Components"
import {Add, Div, Sub, Mul, Constant, Gain} from "Editor/Model/ContBlocks"

// import TestModule from "wasm-build/Simulator.js";

/**
 * @author Jaromír Březina
 * @abstract 
 */

export type Action = {
  name : string,
  params? : any[],
  actionMethod : (...params : any[]) => any
}

type CanvasElementType = {
  name: string,
  icon: string,
  onClick: () => void
}

/**
 *  Komponenta reprezentující aplikaci
 * @component
 * 
 */
export const App : FC = () => {
  const useSelector = useAppSelector;
  const dispatch = useAppDispatch();

  const [showMenu, setShowMenu] = useState(true);
  const [objectGUIComponentFactory, setobjectGUIComponentFactory] = useState<IObjectGUIComponentFactory>(new PetriNetsGUIComponentFactory())
  const simObjects = useSelector(state => state.simObjectManagement.objects);
  const edges = useSelector(state => state.pointEdgeSelection.edges);
  const selectedId = useSelector(state => selectedObjectId(state));
  const selectedEdgeId = useSelector(selectedEdge);
  
  const showMainMenu = useCallback<()=>void>(() => {setShowMenu(true)}, [])

  const clearAllAction = useCallback(()=> {
    dispatch(clearAllEdges());
    dispatch(removeAllObjects());
  },[dispatch])
  
  // eslint-disable-next-line no-unused-vars
  const [topMenuActions, setTopMenuActions] = useState<Action[]>([
    {name : "Do hlavního menu", actionMethod : showMainMenu},
    {name : "Smazat vše", actionMethod : clearAllAction },
    {name : "Uložit", actionMethod : () => {throw new NotImplementedException()}},
    {name : "Nahrát", actionMethod: () => {throw new NotImplementedException()}}
  ]) 

////////////////////////////////////////////////////////////////
/// Objekty Petriho sítě

  const petriNetsCanvasElementsTypes : CanvasElementType[] = [
    {name: Place.MenuName, icon : MenuIcons.place, onClick: () => {dispatch(addObject(new Place().toSerializableObj()))}},
    {name: Transition.MenuName, icon : MenuIcons.transition, onClick: () => {dispatch(addObject(new Transition().toSerializableObj()))}}
  ];

  ////////////////////////////////////////////////////////////////
  /// Objekty Spojitých Bloků
  const contBlocksCanvasElementsTypes : CanvasElementType[] = [
    {name: Div.MenuName, icon: MenuIcons.transparent, onClick: () => {dispatch(addObject(new Div().toSerializableObj()))}},
    {name: Add.MenuName, icon: MenuIcons.transparent, onClick: () => {dispatch(addObject(new Add().toSerializableObj()))}},
    {name: Sub.MenuName, icon: MenuIcons.transparent, onClick: () => {dispatch(addObject(new Sub().toSerializableObj()))}},
    {name: Mul.MenuName, icon: MenuIcons.transparent, onClick: () => {dispatch(addObject(new Mul().toSerializableObj()))}},
    {name: Constant.MenuName, icon: MenuIcons.transparent, onClick: () => {dispatch(addObject(new Constant().toSerializableObj()))}},
    {name: Gain.MenuName, icon: MenuIcons.transparent, onClick: () => {dispatch(addObject(new Gain().toSerializableObj()))}},
  ];


  const [canvasElementTypes, setCanvasElementTypes] = useState<CanvasElementType[]>(petriNetsCanvasElementsTypes)

  //////////////////////////////////////////////////////////////// 
  /// Inicializace Petriho sítí
  const initializePetriNets = () => {
    dispatch(removeAllObjects())
    setCanvasElementTypes(petriNetsCanvasElementsTypes);
    setobjectGUIComponentFactory(new PetriNetsGUIComponentFactory());
    setShowMenu(false);
  }

  ////////////////////////////////////////////////////////////////
  /// Inicializace Spojitých bloků
  const initializeContBlocks = () => {
    dispatch(removeAllObjects())
    setCanvasElementTypes(contBlocksCanvasElementsTypes)
    setobjectGUIComponentFactory(new ContBlocksGUIComponentFactory());
    setShowMenu(false);
  }

  ////////////////////////////////////////////////////////////////
  /// Funkčnost dostupná v hlavním menu
  const mainComponents = [ 
    {name: "Petriho sítě", initFunction: initializePetriNets},
    {name: "Spojitá bloková schémata", initFunction: initializeContBlocks}
  ];


  ////////////////////////////////////////////////////////////////
  /// Handlery
  const handleDeleteKeyPressed = useCallback(() : void => {
    if (selectedId != null) {
      console.log(`delete element with id ${selectedId}`)
      dispatch(unselectObject());
      dispatch(removeObject(selectedId));
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

  ////////////////////////////////////////////////////////////////
  /// UseEffect Hooks
  useEffect(
    () => {
      document.addEventListener("keydown", onKeyDownHandler)
      return(() => document.removeEventListener("keydown", onKeyDownHandler))
    },[onKeyDownHandler]
  )

  useEffect(
    () => {
      const test = async () => {
        console.log("AppStart");
        // const myModule =  await TestModule();
        // myModule.test();
        console.log("module initialized");
      }
      test();
    },
    [])

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
              {Object.values(edges).map(item => {
                return (
                  <g key={item.id}>
                    {objectGUIComponentFactory.getEdgeGUI()({id : item.id})}
                  </g>
              )})}
          </Canvas>
          <EditMenu factory={objectGUIComponentFactory} />
        <Loader visibile={false} >Jupiiiiiii </Loader>
      </div>
    )
  }
  
}
