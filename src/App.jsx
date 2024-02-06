
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { BookDetail } from './components/BookDetail'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/:isbn13" element={<BookDetail />} />
        {/* <Route path="/local" element={<Local />} /> */}
      </Routes>
    </>
  )
}

export default App
