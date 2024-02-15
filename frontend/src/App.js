import React, { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer, Main, Blog, BlogDetails } from './components';
import { AboutUs } from './container';
import './App.css';

const App = () => {
  const mainComponentRef = useRef(null);

  return (
    <>
      <Navbar mainComponentRef={mainComponentRef} />
      <AboutUs mainComponentRef={mainComponentRef}/>
      <Main mainComponentRef={mainComponentRef}>
        <Routes>
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog" element={<Blog />} />
          {/* other routes can go here */}
        </Routes>
      </Main>
      <Footer mainComponentRef={mainComponentRef} />
    </>
  );
}

export default App;