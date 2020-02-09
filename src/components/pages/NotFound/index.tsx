import React, {useCallback} from 'react';
import { useHistory } from 'react-router';

import { LogoImage } from '../../common/LogoImage';

import './assets/styles/index.css';


export const NotFound = () => {
  const history = useHistory();

  const handleGoBack = useCallback(
    () => history.push('/'),
    [history]
  );

  return (
    <div className="not-found-page">
      <LogoImage />
      <div className="not-found-message">Page You Are Looking For Doesn't Exist!</div>
      <div className="default-button" onClick={handleGoBack}>Back to Menu</div>
    </div>
  );
};
