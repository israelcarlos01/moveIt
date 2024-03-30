import styles from '../styles/components/Menu.module.css';
import { useRouter } from 'next/router';

export function Menu() {
    const router = useRouter();

    const handleCalendarClick = () => {
        router.push('/calendar');
    };

    const handleHomeClick = () => {
        router.push('/');
    };


    return(
        <div className={styles.menu}>
            <div>
                <button onClick={handleHomeClick}>Pomodoro</button>
                <button onClick={handleCalendarClick}>Calendar</button>
            </div>
        </div>
    );
}