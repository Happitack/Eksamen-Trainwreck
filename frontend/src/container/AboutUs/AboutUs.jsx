import React from 'react';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__aboutus app__bg_anim section__padding" id="about">
    <div className="app__aboutus-overlay align-bottom-left">

      <div className="app__aboutus_featured-item">
        <li className="app__aboutus_featured-item-title">
          <a href='' title="Paranoae">
            <h1 className="app__aboutus_featured_item_hero-title">
              Paranoae
            </h1>
          </a>
        </li>
      </div>

      <div className="app__aboutus_featured-item">
        <li className="app__aboutus_featured-item-title">
          <a href='' title="Paranoae">
            <h1 className="app__aboutus_featured_item_hero-title">
              Dolor
            </h1>
          </a>
        </li>
      </div>

      <div className="app__aboutus_featured-item">
        <li className="app__aboutus_featured-item-title">
          <a href='' title="Paranoae">
            <h1 className="app__aboutus_featured_item_hero-title">
              Ostracized
            </h1>
          </a>
        </li>
      </div>

      <div className="app__aboutus_featured-item">
        <li className="app__aboutus_featured-item-title">
          <a href='' title="Paranoae">
            <h1 className="app__aboutus_featured_item_hero-title">
              What Lies Beyond
            </h1>
          </a>
        </li>
      </div>
    </div>
  </div>
);

export default AboutUs;