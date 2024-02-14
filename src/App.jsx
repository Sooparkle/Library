
import Home from './pages/Home';
import Local from './pages/Local';
import { Route, Routes } from 'react-router-dom';
import { BookDetail } from './components/BookDetail';
import { NavigationProvider } from './components/WithNavigate';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';

function App() {

  return (
    <>
      <NavigationProvider>
        <Header />
        <div className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:isbn13" element={<BookDetail />} />
          <Route path="/local" element={<Local />}  />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        </div>

      </NavigationProvider>
    </>
  )
}

export default App
