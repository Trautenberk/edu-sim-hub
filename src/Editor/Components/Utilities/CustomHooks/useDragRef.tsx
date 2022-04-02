import { useState, useCallback } from "react"
export const useDragRef = () => {
    const [dragRef, setDragRef] = useState<SVGElement | null>(null);

    const setRef = useCallback(
        (element : SVGElement | null) => {
            setDragRef(element);
        }
        ,[]
    )
    return { dragRef, setRef }
}