/* eslint-disable react-hooks/exhaustive-deps */
import { SimObject } from "Model/SimObject";
import { useMemo, useState } from "react"


export const useCanvasElementManagement = () => {
    const [elements, setElements] = useState<{[id : string] : SimObject}>({})
    
    const addElement = (object : SimObject) => {
        setElements(prevElements => {
            if(!Object.keys(prevElements).includes(object.id)){
                const newElements = {...prevElements};
                newElements[object.id] = object;          
                return newElements;
            } else {
                console.error(`Elements object already includes object with key ${object.id}`);
                return prevElements;
            }       
        });   
    }
    const removeElement = (id : string) => {
        setElements(prevElements => {
            if (Object.keys(elements).includes(id)){
                const newElements = {...prevElements};
                delete newElements[id];
                return newElements;
            } else {
                console.error(`Trying to remove nonexistent element ${id}`)
                return prevElements;
            }
        });
    }
    const removeAllElements = () => {
        setElements({});
    }
    
    const values = useMemo(
        () => ({elements, addElement, removeElement, removeAllElements}), [addElement, elements, removeElement])
    return values
}