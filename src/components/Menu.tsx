import styles from '../styles/components/Menu.module.css';

export function Menu() {
    return(
        <div className={styles.menu}>
            <div>
                <button>Pomodoro</button>
                <button>Calendar</button>
            </div>
        </div>
    );
}