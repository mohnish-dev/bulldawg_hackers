import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import FinancialWellness from './components/FinancialWellness/FinancialWellness'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/financial-wellness" element={<FinancialWellness />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
