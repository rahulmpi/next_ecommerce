import '@/styles/globals.css'
import Header from '@/components/Header'
import StoreProvider from '@/utils/store'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
  <>
  <StoreProvider>
  <ToastContainer position="top-right" limit={1} />
  <Header/>
  <Component {...pageProps} />
  </StoreProvider>
  </>
  )
}
