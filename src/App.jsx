import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import ThreeDCanvas from './components/ThreeDCanvas'
// import WaterColorCanvas from './components/WaterColourCanvas'
import WaterPaintCanvas from './components/WaterPaintCanvas'
import FluidCanvas from './components/FluidCanvas'
import MagneticLines from './components/MagneticLines'

function App() {

  return (
    <>
    {/* <WaterPaintCanvas/> */}
    {/* <WaterColorCanvas/>
    <ThreeDCanvas/> */}
    {/* <FluidCanvas/> */}
    <MagneticLines/>
    </>
  )
}
 
export default App
