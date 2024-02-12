import React from 'react';

import { AboutUs, Footer, Trailer} from './container';
import { Navbar } from './components';
import './App.css';

const App = () => (
  <div>
    <Navbar />
    <AboutUs />
    <Trailer />
    <Footer />
  </div>
);

export default App;
