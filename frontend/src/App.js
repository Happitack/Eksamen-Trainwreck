import React from 'react';

import { Navbar, Footer, Main } from './components';
import { AboutUs } from './container';
import './App.css';

const App = () => (
  <div>
    <Navbar />
    <AboutUs />
    <Main />
    <Footer />
  </div>
);

export default App;
