import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
function App() {
  

  return (
    <>
    <Navbar/>
    <div className='min-h-[87vh]'>
        <Manager/>
    </div>
   
    <Footer/>
    </>
  )
}

export default App
