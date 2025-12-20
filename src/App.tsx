import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Hero from './components/blocks/sprintly/Index'
import './App.css'
import {HeroTest} from '@/components/blocks/sfHerodemo/index'
// import  {ShadButtonPrimary} from "../src/components/ShadButtonPrimary/index"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Hero/>
    </>
  )
}

export default App
