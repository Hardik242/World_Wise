import {Link} from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Message from "../components/Message";
import {useCities} from "../contexts/CitiesContext";

export default function Homepage() {
    const {isSmallScreen} = useCities();

    return isSmallScreen ? (
        <main className={styles.homepage}>
            <Message
                message={
                    "⚙️⚙️ >>> This application is designed for a larger screen to ensure superior performance. For full feature accessibility, please use a larger screen device. <<< ⚙️⚙️"
                }
                emoji={false}
            />
        </main>
    ) : (
        <main className={styles.homepage}>
            <PageNav />
            <section>
                <h1>
                    You travel the world.
                    <br />
                    WorldWise keeps track of your adventures.
                </h1>
                <h2>
                    A world map that tracks your footsteps into every city you
                    can think of. Never forget your wonderful experiences, and
                    show your friends how you have wandered the world.
                </h2>

                <Link to="/app" className="cta">
                    Start Tracking Now
                </Link>
            </section>
        </main>
    );
}
