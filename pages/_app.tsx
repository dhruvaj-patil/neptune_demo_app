
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
    // const getLibrary = (provider: ConnectorUpdate['provider']) => {
    //     return new Web3(provider)
    // }
    return (
        // <Web3ReactProvider  getLibrary={getLibrary}>

        <Component {...pageProps} />

        // </Web3ReactProvider>
    )
}
