import React, {FC, useCallback, useEffect, useState} from 'react';
import {Menu, MenuItemButton, Loader } from "Editor/Components/Utilities/UtilComponents"
import styles from "AppStyle.module.scss"
import windowStyles from "Editor/Styles/EditWindow.module.scss"
import { Place, Transition } from "Editor/Model/PetriNets" 
import { MenuIcons } from "Editor/Components/Icons";
import { addObject, Example, removeAllObjects, removeObject, selectedObjectId,  setSimulationParams,  setState,  SimObjectManagementState,  unselectObject } from 'Editor/Feature/SimObjectManagementSlice';
import { EditWindow, CanvasSVG, IObjectGUIComponentFactory, ContBlocksGUIComponentFactory, PetriNetsGUIComponentFactory } from "Editor/Components"
import {Add, Div, Sub, Mul, Constant, Gain, Integrator} from "Editor/Model/ContBlocks"
import { PetriNetsSimulatorAdapter } from "Editor/Model/PetriNets"
import SimulatorModule from "wasm-build/wasm_Simulator.js";
import { defaultContBlocksSimulationParams, defaultPNSimulationParams, IContBlocksSimulationParams, IPNSimulationParams } from 'Editor/Model/SimulationParams';
import { clearStatistics, setStatistics } from 'Editor/Feature/StatisticsSlice';
import { useStoreHooks } from 'Editor/Components/Utilities/CustomHooks';
import { StatisticsWindow } from 'Editor/Components/StatisticsWindow';
import { ContBlocksAdapter } from 'Editor/Components/ContBlocks/ContBlocksAdapter';
import { Time } from 'Editor/Model/ContBlocks/Time';
import { TransitionType } from 'Editor/Model/PetriNets/Transition';
import { ModalWindow } from 'Editor/Components/Utilities/UtilComponents/ModalWindow';
import { CONT_EXAMPLES_MAP, PN_EXAMPLES_MAP } from 'Editor/Model/Examples/ExampleMap';

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


type ExamplePair = {
  text: string,
  onClick : () => void;
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


enum ChosenArea {
  PetriNets,
  ContBlocks
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
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
  const [chosenArea, setChosenArea] = useState<ChosenArea>(ChosenArea.PetriNets);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [examples, setExamples] = useState<ExamplePair[]>([]);


  function mapExamples(exampleObject : {[key : string] : Example}) : ExamplePair[] {
    return Object.keys(exampleObject).map(item => ({text : item, onClick : () => {showExample(exampleObject[item])}}))
  }

  const simulate = () => {
    if (chosenArea == ChosenArea.PetriNets)
      simulatePNets();
    else 
      simulateContBlocks();
  }

  const showExamples = () => {
    setShowModal(true);
  }

  const simulatePNets = () => {
    const adapter = new PetriNetsSimulatorAdapter(simulatorModule, Object.values(simObjects), simulationParams as IPNSimulationParams);
    dispatch(setStatistics(adapter.statistics));
    setShowStatistics(true);
  }

  const simulateContBlocks = () => {
    const adapter = new ContBlocksAdapter(simulatorModule, simObjects, simulationParams as IContBlocksSimulationParams);
    dispatch(setStatistics(adapter.statistics));
    setShowStatistics(true);
  }

  //////////////////////////////////////////////////////////////// 
  /// Inicializace Petriho sítí
  const initializePetriNets = () => {
    dispatch(removeAllObjects())
    dispatch(setSimulationParams(defaultPNSimulationParams));
    setCanvasElementTypes(petriNetsCanvasElementsTypes);
    setobjectGUIComponentFactory(new PetriNetsGUIComponentFactory());
    setChosenArea(ChosenArea.PetriNets);
    setShowMenu(false);
    setExamples(mapExamples(PN_EXAMPLES_MAP));
  }

  ////////////////////////////////////////////////////////////////
  /// Inicializace Spojitých bloků
  const initializeContBlocks = () => {
    dispatch(removeAllObjects())
    dispatch(setSimulationParams(defaultContBlocksSimulationParams));
    setCanvasElementTypes(contBlocksCanvasElementsTypes)
    setobjectGUIComponentFactory(new ContBlocksGUIComponentFactory());
    setChosenArea(ChosenArea.ContBlocks)
    setShowMenu(false);
    setExamples(mapExamples(CONT_EXAMPLES_MAP));
  }

  const showMainMenu = useCallback<()=>void>(() => {
    setShowStatistics(false);
    setShowMenu(true)
  }, [])

  const clearAllAction = useCallback(()=> {
    dispatch(removeAllObjects());
  },[dispatch])
  

  const goBackToNormalMode = () => {
    dispatch(clearStatistics());
    setShowStatistics(false);
  }

  // eslint-disable-next-line no-unused-vars
  const topMenuActions : Action[] = [
    {name : "Do hlavního menu", actionMethod : showMainMenu},
    {name : "Smazat vše", actionMethod : clearAllAction },
    {name : "Příklady", actionMethod : showExamples}
  ]

  if (showStatistics) {
    topMenuActions.push({name : "Zpět k modelování", actionMethod: goBackToNormalMode })
  } else {
    topMenuActions.push({name : "Provést simulaci a zobrazit statistiky", actionMethod: simulate })
  }

////////////////////////////////////////////////////////////////
/// Objekty Petriho sítě

  const petriNetsCanvasElementsTypes : CanvasElementType[] = [
    {name: Place.MenuName, icon : MenuIcons.place, onClick: () => {dispatch(addObject(new Place().toSerializableObj()))}},
    {name: TransitionType.Immediate, icon : MenuIcons.transition, onClick: () => {dispatch(addObject(new Transition(TransitionType.Immediate).toSerializableObj()))}},
    {name: TransitionType.Constant, icon : MenuIcons.transition, onClick: () => {dispatch(addObject(new Transition(TransitionType.Constant).toSerializableObj()))}},
    {name: TransitionType.Exponential, icon : MenuIcons.transition, onClick: () => {dispatch(addObject(new Transition(TransitionType.Exponential).toSerializableObj()))}}
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
    {name: Integrator.MenuName, icon: MenuIcons.transparent, onClick: () => {dispatch(addObject(new Integrator().toSerializableObj()))}},
    {name: Time.MenuName, icon: MenuIcons.transparent, onClick: () => {dispatch(addObject((new Time).toSerializableObj()))}},
  ];


  const [canvasElementTypes, setCanvasElementTypes] = useState<CanvasElementType[]>(petriNetsCanvasElementsTypes)


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
        // simulator.hello();
        setSimulatorModule(simulator);
        console.log("Simulator loaded...");
      }
      loadSimulatorModule();
    },[])


    const showExample = async (exampleState : Example) => {
        dispatch(removeAllObjects());
        await delay(10);   /// Hack, jinak se ty příklady vykreslují nějak divně, neznámo proč
        dispatch(setState(exampleState));
        setShowModal(false);
    }



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
        <Menu clasName={windowStyles.top_menu}>
            {topMenuActions.map(item => <MenuItemButton key={item.name} buttonText={item.name} onItemSelected={item.actionMethod}/>)}
        </Menu>
        {!showStatistics &&  
          <Menu clasName={windowStyles.blocks_menu} >
            {
              canvasElementTypes.map(item => 
                (<MenuItemButton  key={item.name} buttonText={item.name} iconPath={item.icon} onItemSelected={item.onClick}>
                    <img  src={item.icon} alt={""}/>
                  </MenuItemButton>)
              )
            }
          </Menu>
        }
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
        <ModalWindow hide={!showModal} cancelAction={()=>{setShowModal(false)}}>
          <Menu clasName={windowStyles.examples_menu}>
            {examples.map(item => <MenuItemButton key={item.text} buttonText={item.text} onItemSelected={item.onClick}/>)}
          </Menu>
        </ModalWindow>
      </div>
    )
  }
  
}



