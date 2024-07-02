import { useState } from 'react';
import LandingPage from './LandingPage.js';
import CategoryClasses from './CategoryClasses.js';
import DarkBackground from './DarkBackground.js';
import VideoPlayer from './VideoPlayer.js';
import Header from "./ui-components/Header.js";
import SearchResult from './SearchResult.js';
import SearchStateProvider from './SearchStateProvider.js';

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
      <SearchStateProvider>
        
        <DarkBackground />

        <Router>
          <Routes>
            <Route exact path="/" element={<Header />}>
              <Route exact path="" element={<LandingPage />}></Route>
              <Route exact path="category-classes" element={<CategoryClasses />}></Route>
              <Route path="search" element={<SearchResult />}></Route>
            </Route>
            <Route path="/videoplayer" element={<VideoPlayer />}></Route>
          </Routes>
        </Router>

      </SearchStateProvider>
    </>
  );
}