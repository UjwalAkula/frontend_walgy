import React from 'react'
import LandingPage from './venderDashboard/pages/LandingPage'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import NotFound from './venderDashboard/components/NotFound'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
