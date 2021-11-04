import styles from "./Social.module.css";

export type SocialType = "telegram" | "linkedin" | "github";

interface Props {
    type: SocialType;
}

interface TypeItem {
    alt: string;
    src: string;
    href: string;
}

const typeMap: Record<SocialType, TypeItem> = {
    telegram: {
        alt: "Telegram",
        src: "/social/telegram.svg",
        href: "https://t.me/kal_jan",
    },
    linkedin: {
        alt: "LinkedIn",
        src: "/social/linkedin.svg",
        href: "https://www.linkedin.com/in/jantuomi/",
    },
    github: {
        alt: "GitHub",
        src: "/social/github.svg",
        href: "http://github.com/jantuomi"
    },
};

const Social = ({ type }: Props): JSX.Element => {
    const typeItem = typeMap[type];

    return (
        <a className={styles.social} target="blank" rel="noopener noreferrer" href={typeItem.href}>
            <img src={typeItem.src} alt={typeItem.alt} />
        </a>
    );
};



export default Social;
