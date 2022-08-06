import styles from "../styles/Button.module.scss";
export default function Button({label}){
    return(
        <div className={styles.btn}>
            {label}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="23" height="23" rx="7.5" stroke="#D1D6E0"/>
                <path d="M8 12L16 12" stroke="#D1D6E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16L12 8" stroke="#D1D6E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    )
}