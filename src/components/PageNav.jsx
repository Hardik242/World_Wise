import {NavLink} from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import {useAuth} from "../contexts/AuthContext";

export default function PageNav() {
    const {isAuthenticated, user} = useAuth();
    return (
        <nav className={styles.nav}>
            <Logo />

            <ul>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    {isAuthenticated ? (
                        <NavLink to="/app" className={styles.ctaLink}>
                            {user.name}
                        </NavLink>
                    ) : (
                        <NavLink to="/login" className={styles.ctaLink}>
                            Login
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
}
