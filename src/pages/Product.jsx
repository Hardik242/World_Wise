import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
    return (
        <main className={styles.product}>
            <PageNav />
            <section>
                <img
                    src="img-1.jpg"
                    alt="person with dog overlooking mountain with sunset"
                />
                <div>
                    <h2>About WorldWide.</h2>
                    <p>
                        Ever forget that charming Italian village or the city
                        with the mind-blowing museums? WORLDWISE is here to be
                        your memory keeper! ️ Track your travels, from bustling
                        metropolises to hidden gems. Click around the globe ,
                        save cities with personalized dates and notes, and
                        relive those precious memories – all in one place! No
                        more racking your brain – WORLDWISE keeps the wanderlust
                        organized.
                    </p>
                </div>
            </section>
        </main>
    );
}
