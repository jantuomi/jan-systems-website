import Link from "next/link";
import styles from "./Box.module.css";

export interface Props {
    href: string;
    text: string;
}

const Box = ({ text, href }: Props): JSX.Element => (
    <Link href={href}>
        <a className={styles.box}>
            <span>{text}</span>
            <span className={styles.arrow}>→</span>
        </a>
    </Link>
);

export default Box;
