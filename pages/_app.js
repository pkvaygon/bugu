import { NextIntlProvider } from 'next-intl';
import '../styles/globals.css'
import Layout from './../components/layout';

export default function App({ Component, pageProps }) {
  return <NextIntlProvider messages={pageProps.messages}> <Layout><Component {...pageProps} /></Layout> </NextIntlProvider>
}
