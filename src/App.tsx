import React, {FC, useCallback, useEffect, useState} from 'react';
import {Menu, MenuItemButton, Loader } from "Editor/Components/Utilities/UtilComponents"
import styles from "AppStyle.module.scss"
import windowStyles from "Editor/Styles/EditWindow.module.scss"
import { Place, Transition } from "Editor/Model/PetriNets" 
import { MenuIcons } from "Editor/Components/Icons";
import { addObject, Example, removeAllObjects, removeObject, selectedObjectId,  setSimulationParams,  setState,  SimObjectManagementState,  unselectObject } from 'Editor/Feature/SimObjectManagementSlice';
import { EditWindow, CanvasSVG, IObjectGUIComponentFactory } from "Editor/Components"
import {Add, Div, Sub, Mul, Constant, Gain, Integrator} from "Editor/Model/ContBlocks"
import SimulatorModule from "wasm-build/wasm_Simulator.js";
import { defaultContBlocksSimulationParams, defaultPNSimulationParams, IContBlocksSimulationParams, IPNSimulationParams } from 'Editor/Model/SimulationParams';
import { clearStatistics, setStatistics } from 'Editor/Feature/StatisticsSlice';
import { useStoreHooks } from 'Editor/Components/Utilities/CustomHooks';
import { StatisticsWindow } from 'Editor/Components/StatisticsWindow';
import { Time } from 'Editor/Model/ContBlocks/Time';
import { TransitionType } from 'Editor/Model/PetriNets/Transition';
import { ModalWindow } from 'Editor/Components/Utilities/UtilComponents/ModalWindow';
import { CONT_EXAMPLES_MAP, PN_EXAMPLES_MAP } from 'Editor/Model/Examples/ExampleMap';
import { PetriNetsGUIComponentFactory } from 'Editor/Components/PetriNets';
import { ContBlocksGUIComponentFactory } from 'Editor/Components/ContBlocks';
import { ISimulatorAdapter, ContBlocksAdapter, PetriNetsSimulatorAdapter } from 'Editor/Adapters';

/**
 * @author Jaromír Březina
 * Tento soubor obsahuje hlavní grafickou komponentu aplikace.
 */


/**
 *  Hlavní GUI komponenta
 * @component
 */
export const App : FC = () => {
  const { dispatch, useSelector } = useStoreHooks();
  // jestli má být zobrazeno hlavní menu
  const [showMenu, setShowMenu] = useState(true); 
  // jestli má být zobrazeno okno se statistikami
  const [showStatistics, setShowStatistics] = useState(false);  
  // modul simulátoru
  const [simulatorModule, setSimulatorModule] = useState(null); 
  //továrny pro tvorbu výběr GUI komponent objektů
  const [objectGUIComponentFactory, setobjectGUIComponentFactory] = useState<IObjectGUIComponentFactory>(new PetriNetsGUIComponentFactory()) 
  // objekty ve skladu
  const simObjects = useSelector(state => state.simObjectManagement.objects);
  // vybraný objekt hlavní plochy
  const selectedId = useSelector(state => selectedObjectId(state));
  // parametry simulace
  const simulationParams = useSelector(state => state.simObjectManagement.simulationParams); 
  // jestli je zobrazeno modální okno
  const [showModal, setShowModal] = useState<boolean>(false);
  // sada příkladů
  const [examples, setExamples] = useState<ExamplePair[]>([]);
  // adaptér wasm modulu simulátoru
  const [adapter, setAdapter] = useState<ISimulatorAdapter | null>(null);
  // určuje dostupné typy bloků v levém menu
  const [canvasElementTypes, setCanvasElementTypes] = useState<CanvasElementType[]>([])


  // namapuje příklady do stavu komponenty
  function mapExamples(exampleObject : {[key : string] : Example}) : ExamplePair[] {
    return Object.keys(exampleObject).map(item => ({text : item, onClick : () => {showExample(exampleObject[item])}}))
  }

  // zobrazí příklady v modálním okně
  const showExamples = () => {
    setShowModal(true);
  }

  // provede simulaci
  const simulate = () => {
    if (adapter != null) {
      adapter.simulate(simObjects, simulationParams as any);
      if (adapter.statistics != null) {
        dispatch(setStatistics(adapter.statistics));
        setShowStatistics(true);
      } else {
        console.error("Error: statistics were null.");
      }
    } else {
      console.error("Error, adapter was null.");
    }
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


  //////////////////////////////////////////////////////////////// 
  /// Inicializace Petriho sítí
  const initializePetriNets = () => {
    dispatch(removeAllObjects())  // smaže všechny objekty
    dispatch(setSimulationParams(defaultPNSimulationParams)); // nastaví výchozí parametry simulace
    setCanvasElementTypes(petriNetsCanvasElementsTypes);  // nastaví dostupné typy v menu
    setobjectGUIComponentFactory(new PetriNetsGUIComponentFactory()); // nastaví továrnu pro tvorbu gui
    setShowMenu(false); // schová hlavní menu a zobrazí se hlavní plocha
    setExamples(mapExamples(PN_EXAMPLES_MAP));  // nastaví sadu příkladů
    setAdapter(new PetriNetsSimulatorAdapter(simulatorModule)); // nastaví adaptér modulu simulátoru
  }

  ////////////////////////////////////////////////////////////////
  /// Inicializace Spojitých bloků
  const initializeContBlocks = () => {
    dispatch(removeAllObjects())  // stejné kroky jako výš akorát pro spojité blokové schéma
    dispatch(setSimulationParams(defaultContBlocksSimulationParams));
    setCanvasElementTypes(contBlocksCanvasElementsTypes)
    setobjectGUIComponentFactory(new ContBlocksGUIComponentFactory());
    setShowMenu(false);
    setExamples(mapExamples(CONT_EXAMPLES_MAP));
    setAdapter(new ContBlocksAdapter(simulatorModule));
  }

  ////////////////////////////////////////////////////////////////
  /// Funkčnost dostupná v hlavním menu
  const mainComponents = [ 
    {name: "Petriho sítě", initFunction: initializePetriNets},
    {name: "Blokové schéma", initFunction: initializeContBlocks}
  ];

    // Zobrazí hlavní menu
  const showMainMenu = useCallback<()=>void>(() => {
    setShowStatistics(false);
    setShowMenu(true)
  }, [])

  // Smazat vše
  const clearAllAction = useCallback(()=> {
    dispatch(removeAllObjects());
  },[dispatch])
  

  // Přepnutí zpět do modelování
  const goBackToNormalMode = () => {
    dispatch(clearStatistics());
    setShowStatistics(false);
  }

  // Akce dostupní v horním menu
  const topMenuActions : Action[] = [
    {name : "Do hlavního menu", actionMethod : showMainMenu},
    {name : "Smazat vše", actionMethod : clearAllAction },
    {name : "Příklady", actionMethod : showExamples}
  ]

  // Přepínání akce v horním menu simulovat/zpět k modelování
  if (showStatistics) {
    topMenuActions.push({name : "Zpět k modelování", actionMethod: goBackToNormalMode })
  } else {
    topMenuActions.push({name : "Provést simulaci a zobrazit statistiky", actionMethod: simulate })
  }

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
    // console.log(`Key pressed ${e.key}`);

    switch (e.key) {
      case "Delete":
        return handleDeleteKeyPressed();
    }
  },[handleDeleteKeyPressed])


  ////////////////////////////////////////////////////////////////
  /// UseEffect Hooks
  // Přidá handler obsluhující vstup klávesnice
  useEffect(
    () => {
      document.addEventListener("keydown", onKeyDownHandler)
      return(() => document.removeEventListener("keydown", onKeyDownHandler))
    },[onKeyDownHandler]
  )
  
  // v runtime načte modul simulátoru
  useEffect(
    () => {
      const loadSimulatorModule = async () => {
        console.log("Loading simulator module...");
        const simulator =  await SimulatorModule();
        setSimulatorModule(simulator);
        console.log("Simulator loaded...");
      }
      loadSimulatorModule();
    },[])

    // akce zobrazit příklady
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




/**
 * Typ props pro komponenty hlavní plochy
 *  */
 export type ObjectSVGProps = {
  id : string;
}

/**
 * Typ props pro komponenty editačního okna
 */
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


function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
