import { useState } from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";

// import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="bg-green-50">
        <Navbar />
        <Manager />
      </div>

      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">  */}

      {/* <Footer /> */}
    </>
  );
}

export default App;
