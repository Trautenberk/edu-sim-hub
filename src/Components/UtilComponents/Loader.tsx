import {FC} from "react";
import styles from "Styles/Utils/LoaderStyle.module.scss";


type LoaderProps = {
    visibile : boolean;
}

export const Loader : FC<LoaderProps> = (props) => {

if(props.visibile){
    return (
            <div className={styles.loader_layer}>
                <div className={styles.loader_wrapper}>
                    <div className={styles.loader} />
                </div>
                <div className={styles.loader_content}>
                    {props.children}
                </div>
        
            </div>
        )
    } else {
        return(<></>)
    }

} 