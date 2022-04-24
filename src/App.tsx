import React, {FC, useCallback, useEffect, useState} from 'react';
import {Menu, MenuItemButton, Loader } from "Editor/Components/Utilities/UtilComponents"
import styles from "AppStyle.module.scss"
import editorStyles from "Editor/Styles/EditorStyle.module.scss"
import TopMenuStyle from "Editor/Styles/TopMenuStyle.module.scss";
import { Place, Transition } from "Editor/Model/PetriNets" 
import { MenuIcons } from "Editor/Components/Icons"
import { NotImplementedException } from 'Editor/Components/Utilities';
import { useAppDispatch, useAppSelector } from 'Editor/Store/Hooks';
import { addObject, removeAllObjects, removeObject, selectedObjectId,  setSimulationParams,  unselectObject } from 'Editor/Feature/SimObjectManagementSlice';
import { EditMenu, CanvasSVG, IObjectGUIComponentFactory, ContBlocksGUIComponentFactory, PetriNetsGUIComponentFactory } from "Editor/Components"
import {Add, Div, Sub, Mul, Constant, Gain} from "Editor/Model/ContBlocks"
import { PetriNetsSimulatorAdapter } from "Editor/Model/PetriNets"
import SimulatorModule from "wasm-build/wasm_Simulator.js";
import { defaultContBlocksSimulationParams, defaultPNSimulationParams, IPNSimulationParams } from 'Editor/Model/SimulationParams';
import { setStatistics } from 'Editor/Feature/StatisticsSlice';

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
  const useSelector = useAppSelector;
  const dispatch = useAppDispatch();

  const [showMenu, setShowMenu] = useState(true);
  const [simulatorModule, setSimulatorModule] = useState(null);
  const [objectGUIComponentFactory, setobjectGUIComponentFactory] = useState<IObjectGUIComponentFactory>(new PetriNetsGUIComponentFactory())
  const simObjects = useSelector(state => state.simObjectManagement.objects);
  const selectedId = useSelector(state => selectedObjectId(state));
  const simulationParams = useSelector(state => state.simObjectManagement.simulationParams); 
  
  const showMainMenu = useCallback<()=>void>(() => {setShowMenu(true)}, [])

  const clearAllAction = useCallback(()=> {
    dispatch(removeAllObjects());
  },[dispatch])
  
  const initializePNEngine = () => {
    const adapter = new PetriNetsSimulatorAdapter(simulatorModule, Object.values(simObjects), simulationParams as IPNSimulationParams);
    adapter.statistics;
    dispatch(setStatistics(adapter.statistics));
  }

  // eslint-disable-next-line no-unused-vars
  const topMenuActions : Action[] = [
    {name : "Do hlavního menu", actionMethod : showMainMenu},
    {name : "Smazat vše", actionMethod : clearAllAction },
    {name : "Inicializace", actionMethod: initializePNEngine },
    {name : "Uložit", actionMethod : () => {throw new NotImplementedException()}},
    {name : "Nahrát", actionMethod: () => {throw new NotImplementedException()}}
  ]

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
        <Menu clasName={editorStyles.editor_menu} >
          {
            canvasElementTypes.map(item => 
              (<MenuItemButton  key={item.name} buttonText={item.name} iconPath={item.icon} onItemSelected={item.onClick}>
                  <img src={item.icon} alt={""}/>
                </MenuItemButton>)
            )
          }
         </Menu>
          <CanvasSVG>
            {Object.values(simObjects).map(item => 
                (React.createElement(objectGUIComponentFactory.getElement(item).SVGComponent, 
                {
                  id : item.id,
                  key: item.id
                } as ObjectSVGProps)))
            }
          </CanvasSVG>
          <EditMenu factory={objectGUIComponentFactory} />
        <Loader visibile={false} >Jupiiiiiii </Loader>
      </div>
    )
  }
  
}



const experiment = async () => {
  console.log("AppStart");
  const simulator =  await SimulatorModule();
  simulator.hello();
  simulator.bbb();

  const testInstance = new simulator.TestClassX();
  testInstance.hello();
  const engine = new simulator.PetriNetsEngine();
  // const discreteEngine =  new simulator.DiscreteEngine();
  const place = new simulator.Place(engine, "test", 5);
  const place_two = new simulator.Place(engine, "outputPlace",0);
  const place_three = new simulator.Place(engine, "testPlace",0);
  const inputArch = new simulator.InputArch(engine, place, 1);
  const outputArch = new simulator.OutputArch(engine, place_two, 1);
  const outputArchTest = new simulator.OutputArch(engine, place_two,1);
  const outputArchVec = new simulator.OutputArchVec();
  outputArchVec.push_back(outputArch);
  outputArchVec.push_back(outputArchTest);
  const inputArchVec = new simulator.InputArchVec();
  inputArchVec.push_back(inputArch);
  // const timedTransition = new simulator.TimedTransition(engine, "TimedTransition", inputArch, outputArch, 0);
  const ImmediateTransition = new simulator.ImmediateTransition(engine, "ImmediateTransition", inputArchVec, outputArchVec, 0);
  engine.init(10,10);
  engine.simulate();
  console.log(`tokens in first place: ${place.tokens()}`)
  console.log(`tokens in second place: ${place_two.tokens()}`) 
  console.log("module initialized");
}