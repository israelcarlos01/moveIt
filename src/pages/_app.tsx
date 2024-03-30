import { Menu } from '../components/Menu';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
