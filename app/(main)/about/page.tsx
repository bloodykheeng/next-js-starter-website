import Head from 'next/head';
import AboutTabs from "./AboutTabs";

const AboutPage = () => {
    return (
        <>
            <Head>
                <title>About CMS - Contract Monitoring System</title>
                <meta
                    name="description"
                    content="Learn more about the Contract Monitoring System (CMS), its purpose, features, and how it enhances transparency in government projects."
                />
            </Head>
            <AboutTabs />
        </>
    );
};

export default AboutPage;
