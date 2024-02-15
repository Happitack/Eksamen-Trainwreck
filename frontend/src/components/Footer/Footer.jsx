import React from 'react';
import { SoMe, Newsletter } from './containers';

import './Footer.css';

const Footer = () => (
  <div className="footer section__padding">
    <SoMe />
    <Newsletter />
  </div>
);

export default Footer;
