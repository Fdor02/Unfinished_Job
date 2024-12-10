import { appWithTranslation } from 'next-i18next';
import '../public/styles.css';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
