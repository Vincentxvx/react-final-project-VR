import { useRef } from 'react';
import { useAuth } from '../context/loginContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Swal from 'sweetalert2';

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (usernameRef.current.value === "" || passwordRef.current.value === "") {
            Swal.fire({
                icon: 'error',
                title: 'Hiba',
                text: 'Kérem töltse ki az összes mezőt!',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:5173/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                login();
                navigate('/form');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Hiba',
                    text: 'Hibás felhasználónév vagy jelszó!',
                });
            }
        } catch (error) {
            console.error('Hiba a bejelentkezés során:', error);
        }
    
    };

    return (
        <div className={styles.container}>
            <h2>Bejelentkezés</h2>
            <form onsubmit={handlesubmit} className={styles.form}>
                <input type="text" placeholder="Felhasználónév" ref={usernameRef} className={styles.input} />
                <input type="password" placeholder="Jelszó" ref={passwordRef} className={styles.input} />
                <button type="submit" className={styles.button}>Belépés</button>
            </form>
        </div>
    );
}


export default Login;

