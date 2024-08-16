'use client'

import DarkBackground from './_components/DarkBackground.js';

import dynamic from 'next/dynamic';
const LandingPage = dynamic(() => import('./_components/LandingPage'), { ssr: false });

import './_styles/main.css';
import './_styles/header.css';

export default function App() {

  return (
    <>
        
        <DarkBackground />
        <LandingPage />
        {/* <Router>
          <Routes>
            <Route exact path="/" element={<Header />}>
              <Route exact path="" element={<LandingPage />}></Route>
              <Route exact path="category-classes" element={<CategoryClasses />}></Route>
              <Route path="search" element={<SearchResult />}></Route>
              <Route path="cart" element={<ShoppingCart />}></Route>
            </Route>
            <Route path="/signin" element={<SigninForm />}></Route>
            <Route path="/create-account" element={<CreateAccount />}></Route>
            <Route path="/videoplayer" element={<VideoPlayer />}></Route>
          </Routes>
        </Router> */}

     </>
  );
}