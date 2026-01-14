import Body from "./components/Body"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
     <Toaster position="top-right" />
    <Navbar/>
    <Body/>
    <Footer/>
    </>
  )
}

export default App
