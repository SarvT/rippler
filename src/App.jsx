import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import ThreeDCanvas from './components/ThreeDCanvas'
// import WaterColorCanvas from './components/WaterColourCanvas'
import WaterPaintCanvas from './components/WaterPaintCanvas'

function App() {

  return (
    <>
    <WaterPaintCanvas/>
    {/* <WaterColorCanvas/>
    <ThreeDCanvas/> */}
    </>
  )
}
 
export default App
