import LandingPage from './pages/LandingPage.js';
import CategoryClasses from './pages/CategoryClasses.js';
import DarkBackground from './components/DarkBackground.js';
import ShoppingCart from './pages/ShoppingCart.js';
import VideoPlayer from './pages/VideoPlayer.js';
import Header from "./components/Header.js";
import SearchResult from './pages/SearchResult.js';
import StateProvider from './StateProvider.js';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

import './css/main.css';
import './css/header.css';

export default function App() {

  return (
    <>
      <StateProvider>
        
        <DarkBackground />

        <Router>
          <Routes>
            <Route exact path="/" element={<Header />}>
              <Route exact path="" element={<LandingPage />}></Route>
              <Route exact path="category-classes" element={<CategoryClasses />}></Route>
              <Route path="search" element={<SearchResult />}></Route>
              <Route path="cart" element={<ShoppingCart />}></Route>
            </Route>
            <Route path="/videoplayer" element={<VideoPlayer />}></Route>
          </Routes>
        </Router>

      </StateProvider>
    </>
  );
}