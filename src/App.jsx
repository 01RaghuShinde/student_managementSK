import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './Components/Home'
import Student_data from './Components/Student_data'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        {/* wrapper */}
        <Routes>
          {/* defined multiple route */}
          <Route path='/' element={<Home />} />
          <Route path='/student_data' element={<Student_data />} />

          {/* fallback routing */}
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App