import Head from "next/head";
import Box from "../components/Box/Box";
import Social from "../components/Social/Social";
import styles from "../styles/Home.module.css";

export default function Home(): JSX.Element {
    return (
        <div className={styles.container}>
            <Head>
                <title>jan.systems</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="The personal home page of Jan Tuomi" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    jan.systems
                </h1>

                <div className={styles.socials}>
                    <Social type="telegram" />
                    <Social type="linkedin" />
                    <Social type="github" />
                </div>

                <div className={styles.boxes}>
                    <Box text="Files" href="/files" />
                </div>
            </main>
        </div>
    );
}
