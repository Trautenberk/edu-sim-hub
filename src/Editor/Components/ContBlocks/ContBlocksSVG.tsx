import { FC, useCallback } from "react"
import { DraggableHandlers } from "Editor/Components/Utilities"
import { Direction, Visibility } from "../Utilities/UtilMethodsAndTypes"
import { EndPointType, IEndPointBrief, IPoint } from "../../Model/UtilClasses/Point"
import { addEdgeObject } from "Editor/Feature/SimObjectManagementSlice"
import { Signal } from "Editor/Model/ContBlocks/Signal"
import { useStoreHooks } from "../Utilities/CustomHooks"
import { IEditorObject } from "Editor/Model/EditorObject"
import styles from "Editor/Styles/ContBlockStyles.module.scss"


type ContBlockProps = DraggableHandlers & {
    selectedVisible : Visibility
}


/**
 * Handler pro přidání signálu po kliknutí na šipku u endpointu
 * @param obj 
 * @returns 
 */
export const useAddSignal = (obj : IEditorObject) => {
    const { dispatch } = useStoreHooks();

    return  useCallback(
        (firstPoint : IPoint, secondPoint : IPoint) => {
            const signal = new Signal({objId: obj.id, pointId: firstPoint.id});
            signal.pointsId = [firstPoint.id, secondPoint.id];
            dispatch(addEdgeObject({point : secondPoint, obj : signal.toSerializableObj()}))
        }
        ,[obj]
    )
}


/**
 * React komponenta které tvoří základní strukturu bloku
 * @param props 
 * @returns React komponenta
 */
export const ContBlockFoundationSVG : FC<ContBlockProps> = (props) => {    
    return (
        <>
            <rect className={styles.foundation} onMouseDown={props.onMouseDownDragHandler} onMouseUp={props.onMouseUpDragHandler}  width="70" height="70"/> 
            <rect className={styles.foundation_selected} visibility={props.selectedVisible} width="70" height="70"/> 
        </>
        )
}

// TODO jsou to konstanty, takze prepsat na velka pismena
/**
 * EndPointu bloku s jednim vystupem
 */
export const ContBlockWithSingleOutputEndPoints : IEndPointBrief[] = [
    { coords : {x: 70, y: 35}, type: EndPointType.Restricted, maxSpawnedObj: 3, arrowDirection: Direction.Right, connectable : false }
]

/**
 * React komponenta bloku s jedním výstupem
 * @param props 
 * @returns React komponenta
 */
export const ContBlockWithSingleOutputSVG : FC<ContBlockProps> = (props) => {
    return (
        <>
            <ContBlockFoundationSVG {...props} />
            <path className={styles.input_output} d="M 70,30 80,35 70,40"/>
        </>       
    )
}

/**
 * EndPointy bloku s dvěma vstupy
 */
export const ContBlockDoubleEndPoints : IEndPointBrief[] = [
    { coords : {x: 0, y: 15}, type: EndPointType.Input },
    { coords: {x: 0, y: 55}, type: EndPointType.Input },
    ...ContBlockWithSingleOutputEndPoints
]


/**
 * React komponenta bloku s dvěma vstupy a jedním výstupem
 * @param props 
 * @returns React komponenta
 */
export const ContBlockDoubleSVG : FC<ContBlockProps> = (props) => {
    return (
        <>
            <ContBlockWithSingleOutputSVG {...props} />
            <path className={styles.input_output} d="M -10,10 0,15 -10,20"/>
            <path className={styles.input_output} d="M -10,50 0,55 -10,60"/>
        </>       
    )
}

/**
 * EndPointy bloku s jedním vstupem
 */
export const ContBlockSingleEndPoints : IEndPointBrief[] = [
    {coords : {x: 0, y: 35}, type: EndPointType.Input},
    ...ContBlockWithSingleOutputEndPoints,

]

/**
 * React komponenta bloku s jedním vstupem a jedním výstupem
 * @param props 
 * @returns React komponenta
 */
export const ContBlockSingleSVG : FC<ContBlockProps> = (props) => {    
return (
        <>
            <ContBlockWithSingleOutputSVG {...props}/>
            <path className={styles.input_output}  d="M -10,30 0,35 -10,40"/>
        </>       
    )
}
