import {Link} from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
    return (
        <div className={styles.pageNotFound}>
            <h1>Page not found 😢</h1>
            <br />
            <Link to="/" className="cta">
                Back To Homepage
            </Link>
        </div>
    );
}
