import { BrowserRouter, Route, Routes, Link, Switch } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import './styles/App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='navbar'>
          <div className='navbar__links'>
            <Link to='/about'>О сайте</Link>
            <Link to='/posts'>Посты</Link>
          </div>
        </div>
        <Routes>
          <Route path="/about" element={<About />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
