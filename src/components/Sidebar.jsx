import {Outlet} from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import SearchCity from "./SearchCity";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <SearchCity />

            <Outlet />

            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by Hardik Goel
                </p>
            </footer>
        </div>
    );
}
