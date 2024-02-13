import React, { useRef } from 'react';

import { Navbar, Footer, Main } from './components';
import { AboutUs } from './container';
import './App.css';

const App = () => {
  const mainComponentRef = useRef(null);

  return (
    <>
      <Navbar mainComponentRef={mainComponentRef} />
      <AboutUs mainComponentRef={mainComponentRef}/>
      <Main mainComponentRef={mainComponentRef} />
      <Footer mainComponentRef={mainComponentRef} />
    </>
  );
}

export default App;
