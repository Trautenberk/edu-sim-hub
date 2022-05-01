import { FC, useState } from "react"
import styles from "Editor/Styles/ModalWindow.module.scss"


type ModalWindowProps = {
    hide : boolean,
    cancelAction : () => void
}

export const ModalWindow : FC<ModalWindowProps> = (props) => {

  return (
    <div className={styles.cover_layer} hidden={props.hide}  onClick={props.cancelAction}>
        <div className={styles.content}>
            {props.children}
        </div>
    </div>
  )
}