import { ObjectEditProps } from "App"
import { IContBlock } from "Editor/Model/ContBlocks/ContBlock";
import { FC } from "react"
import { useEditComponentUtils } from "../Utilities/CustomHooks";


export const DefaultContBlockEdit : FC<ObjectEditProps> = (props) => {
    const { obj, dispatchChange} = useEditComponentUtils<IContBlock>(props.id);

    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.label = e.currentTarget.value;
        dispatchChange(obj)
    }

    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <div>
                    <label>Štítek:</label>
                    <input value={obj.label} type="text" onChange={onLabelInputChange}></input>        
                </div>
            </div>
        )
    } else {
        console.error(`Couldnt find obj with id ${props.id}`)
        return (
            <>
            </>
        )
    }
}