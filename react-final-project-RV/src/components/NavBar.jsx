import { NavLink } from "react-router-dom"
import { useAuth } from "../context/loginContext"
import classes from './NavBar.module.css'

const NavBar = () => {
    const { isLogged, logout } = useAuth();

    return(
        <nav className={classes.navbar}>
            <NavLink to='/' className={({ isActive }) => isActive ? classes.active : classes.link}>Termékek</NavLink>
            {isLogged && <NavLink to="form" className={({ isActive }) => isActive ? classes.active : classes.link}>Hozzáadás</NavLink>}
            {!isLogged ? <NavLink to="login" className={({ isActive }) => isActive ? classes.active : classes.link}>Bejelentkezés</NavLink> : <a onClick={logout} className={classes.link}>Kijelentkezés</a>}
        </nav>
    )
}

export default NavBar