import React, { FunctionComponent } from 'react';

import './assets/styles/reset.css';
import './assets/styles/vendor.css';
import './assets/styles/index.css';

export const Layout: FunctionComponent = ({ children }) => (
  <div className="main-wrapper">
    {children}
  </div>
);
