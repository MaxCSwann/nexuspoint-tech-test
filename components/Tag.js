import styles from "../styles/Tag.module.scss"

export default function Tag({data, size}){
    if(size === "sm"){
        return(
            <div className={`${styles["tag"]} ${styles["sm"]}`}>
                {data}
            </div>        
        )
    }else if(size === "md"){
        return(
            <div className={`${styles["tag"]} ${styles["md"]}`}>
                {data}
            </div>
        )
    }else{
        return(
            <div className={styles.tag}>
                {data}
            </div>
        )
    }
}