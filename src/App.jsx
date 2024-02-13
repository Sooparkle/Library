
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { BookDetail } from './components/BookDetail'
import { NavigationProvider } from './components/WithNavigate';
import Local from './pages/Local';

function App() {

  return (
    <>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:isbn13" element={<BookDetail />} />
          <Route path="/local" element={<Local />} />
        </Routes>
      </NavigationProvider>
    </>
  )
}

export default App
