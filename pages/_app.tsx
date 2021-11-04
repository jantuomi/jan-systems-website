import "../styles/globals.css";
import React from "react";

interface Props {
    Component: typeof React.Component;
    pageProps: any;
}

const MyApp = ({ Component, pageProps }: Props): JSX.Element => {
    return <Component {...pageProps} />;
};

export default MyApp;
