import React from 'react';

import {Newsletter, SoMe } from '../../components';
import './Footer.css';

const Footer = () => (
  <div className="footer section__padding">
    <SoMe />
    <Newsletter />
  </div>
);

export default Footer;
