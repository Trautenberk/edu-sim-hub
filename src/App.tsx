import React, {FC, useCallback, useEffect, useState} from 'react';
import {Menu, MenuItemButton, Loader } from "Editor/Components/Utilities/UtilComponents"
import styles from "AppStyle.module.scss"
import editorStyles from "Editor/Styles/EditorStyle.module.scss"
import TopMenuStyle from "Editor/Styles/TopMenuStyle.module.scss";
import { Place, Transition } from "Editor/Model/PetriNets" 
import { MenuIcons } from "Editor/Components/Icons";
import { addObject, removeAllObjects, removeObject, selectedObjectId,  setSimulationParams,  unselectObject } from 'Editor/Feature/SimObjectManagementSlice';
import { EditWindow, CanvasSVG, IObjectGUIComponentFactory, ContBlocksGUIComponentFactory, PetriNetsGUIComponentFactory } from "Editor/Components"
import {Add, Div, Sub, Mul, Constant, Gain} from "Editor/Model/ContBlocks"
import { PetriNetsSimulatorAdapter } from "Editor/Model/PetriNets"
import SimulatorModule from "wasm-build/wasm_Simulator.js";
import { defaultContBlocksSimulationParams, defaultPNSimulationParams, IPNSimulationParams } from 'Editor/Model/SimulationParams';
import { setStatistics } from 'Editor/Feature/StatisticsSlice';
import { useStoreHooks } from 'Editor/Components/Utilities/CustomHooks';
import { StatisticsWindow } from 'Editor/Components/StatisticsWindow';

/**
 * @author Jaromír Březina
 * @abstract 
 */

export type ObjectSVGProps = {
  id : string;
}

export type ObjectEditProps = {
  id : string
}



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
  const { dispatch, useSelector } = useStoreHooks();


  const [showMenu, setShowMenu] = useState(true);
  const [showStatistics, setShowStatistics] = useState(false);
  const [simulatorModule, setSimulatorModule] = useState(null);
  const [objectGUIComponentFactory, setobjectGUIComponentFactory] = useState<IObjectGUIComponentFactory>(new PetriNetsGUIComponentFactory())
  const simObjects = useSelector(state => state.simObjectManagement.objects);
  const selectedId = useSelector(state => selectedObjectId(state));
  const simulationParams = useSelector(state => state.simObjectManagement.simulationParams); 
  
  const showMainMenu = useCallback<()=>void>(() => {
    setShowStatistics(false);
    setShowMenu(true)
  }, [])

  const clearAllAction = useCallback(()=> {
    dispatch(removeAllObjects());
  },[dispatch])
  
  const initializePNEngine = () => {
    const adapter = new PetriNetsSimulatorAdapter(simulatorModule, Object.values(simObjects), simulationParams as IPNSimulationParams);
    adapter.statistics;
    dispatch(setStatistics(adapter.statistics));
    setShowStatistics(true);
  }

  const goBackToNormalMode = () => {
    setShowStatistics(false);
  }

  // eslint-disable-next-line no-unused-vars
  const topMenuActions : Action[] = [
    {name : "Do hlavního menu", actionMethod : showMainMenu},
    {name : "Smazat vše", actionMethod : clearAllAction },
  ]

  if (showStatistics) {
    topMenuActions.push({name : "Zpět k modelování", actionMethod: goBackToNormalMode })
  } else {
    topMenuActions.push({name : "Provést simulaci a zobrazit statistiky", actionMethod: initializePNEngine })
  }

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
    dispatch(setSimulationParams(defaultPNSimulationParams));
    setCanvasElementTypes(petriNetsCanvasElementsTypes);
    setobjectGUIComponentFactory(new PetriNetsGUIComponentFactory());
    setShowMenu(false);
  }

  ////////////////////////////////////////////////////////////////
  /// Inicializace Spojitých bloků
  const initializeContBlocks = () => {
    dispatch(removeAllObjects())
    dispatch(setSimulationParams(defaultContBlocksSimulationParams));
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
    
  },[selectedId, dispatch])

  const onKeyDownHandler =  useCallback(
    (e : KeyboardEvent) : void => {
    console.log(`Key pressed ${e.key}`);

    switch (e.key) {
      case "Delete":
        return handleDeleteKeyPressed();
    }
  },[handleDeleteKeyPressed])


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
      const loadSimulatorModule = async () => {
        console.log("Loading simulator module...");
        const simulator =  await SimulatorModule();
        simulator.hello();
        setSimulatorModule(simulator);
        console.log("Simulator loaded...");
      }
      loadSimulatorModule();
    },[])

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
        {!showStatistics &&  <Menu clasName={editorStyles.editor_menu} >
          {
            canvasElementTypes.map(item => 
              (<MenuItemButton  key={item.name} buttonText={item.name} iconPath={item.icon} onItemSelected={item.onClick}>
                  <img src={item.icon} alt={""}/>
                </MenuItemButton>)
            )
          }
         </Menu>}

          <CanvasSVG middle={!showStatistics}>
            {Object.values(simObjects).map(item => 
                (React.createElement(objectGUIComponentFactory.getElement(item).SVGComponent, 
                {
                  id : item.id,
                  key: item.id
                } as ObjectSVGProps)))
            }
          </CanvasSVG>
          {!showStatistics && <EditWindow factory={objectGUIComponentFactory} /> }
          {showStatistics &&  <StatisticsWindow factory={objectGUIComponentFactory} />}

        <Loader visibile={false} ></Loader>
      </div>
    )
  }
  
}





