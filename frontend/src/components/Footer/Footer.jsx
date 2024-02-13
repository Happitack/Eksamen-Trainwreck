import React from 'react';

import Newsletter from './Newsletter/Newsletter';
import SoMe from './SoMe/SoMe';

import './Footer.css';

const Footer = () => (
  <div className="footer section__padding">
    <SoMe />
    <Newsletter />
  </div>
);

export default Footer;
