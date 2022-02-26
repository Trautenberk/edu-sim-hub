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
import { PetriNetsComponentFactory } from 'Components/PetriNets/PetriNetsComponentFactory';
import { ICanvasElementFactory } from 'Components/CanvasComponentFactory';
import { useCanvasElementManagement } from 'Components/Utilities/CustomHooks/useCanvasElementManagement';
import { NotImplementedException } from 'Components/Utilities/Errors';
import { DraggableGroupSVG } from 'Components/Utilities/UtilComponents/DraggableGroupSVG';
import { EdgeSVG } from 'Components/Utilities/UtilComponents/EdgeSVG';
import { useAppDispatch, useAppSelector } from 'Store/Hooks';
import { clearAllEdges, removeEdge, selectedElementID, unselectEdge, selectedEdge } from 'Feature/PointEdgeSelectionSlice';

/**
 * @author Jaromír Březina
 * @abstract 
 */


export type Action = {
  name : string,
  params? : any[],
  actionMethod : (...params : any[]) => any
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
  const showMainMenu = useCallback<()=>void>(
    () => {
     setShowMenu(true)
   }, [])

  const {elements, addElement, removeElement, removeAllElements} = useCanvasElementManagement();
  // const { connections, onCoordsChange, addConnection, addPoint,
  //         removeConnection, removePoint, clearAllEdges,
  //         selectConnection, selectedConnectionId, unselectConnections,
  //         registerEndPoint, unregisterEndPoint,toggleIsLastPointMoving, highlightedEndPoint } = useConnectionManagement();

  // const pointManagementMethods : PointManagement = {addConnection, addPoint, onCoordsChange, removePoint, removeConnection, selectConnection, toggleIsLastPointMoving}
  // const endPointManagementMethods : EndPointManagement = {registerEndPoint, unregisterEndPoint, highlightedEndPoint}

  const clearAllAction = useCallback(()=> {
    dispatch(clearAllEdges);
    removeAllElements();
  },[dispatch, removeAllElements])
  
  const [topMenuActions, setTopMenuActions] = useState<Action[]>([
    {name : "Do hlavního menu", actionMethod : showMainMenu},
    {name : "Smazat vše", actionMethod : clearAllAction },
    {name : "Uložit", actionMethod : () => {throw new NotImplementedException()}},
    {name : "Nahrát", actionMethod: () => {throw new NotImplementedException()}}
  ]) 
  const [canvasElementFactory, setCanvasElementFactory] = useState<ICanvasElementFactory>(new PetriNetsComponentFactory())
  const edges = useSelector(state => state.pointEdgeSelection.edges);

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

  const [canvasElementTypes, setCanvasElementTypes] = useState<CanvasElementType[]>(petriNetsCanvasElementsTypes)

  const selectedId = useSelector(state => selectedElementID(state));
  const selectedEdgeId = useSelector(selectedEdge);

  const handleDeleteKeyPressed = useCallback(() : void => {
    if (selectedId != null) {
      console.log(`delete element with id ${selectedId}`)
      removeElement(selectedId);
      // TODO element po odebrani je furt selected
    }
    if (selectedEdgeId != null) {
      dispatch(removeEdge(selectedEdgeId));
    }
    
  },[selectedId, selectedEdgeId, removeElement, dispatch])

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
      // unselectConnections();
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
                    {Object.values(elements).map(item => <DraggableGroupSVG
                      key={item.id}
                      coords={{x: 30, y: 30}}
                      id={item.id}
                      canvasElement={canvasElementFactory.getElement(item)}                   
                       />)
                    }
                    {Object.values(edges).map(item => <EdgeSVG
                    key={item.id} 
                    edgeId={item.id}
                    />)}
                </Canvas>
        <Loader visibile={false} >Jupiiiiiii </Loader>
      </div>
    )
  }
  
}
