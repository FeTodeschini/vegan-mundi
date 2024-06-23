import LandingPage from './LandingPage.js';
import VideoPlayer from './VideoPlayer.js';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

import './css/main.css';
import './css/header.css';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/videoplayer" element={<VideoPlayer />}></Route>
      </Routes>
    </Router>
  );
}