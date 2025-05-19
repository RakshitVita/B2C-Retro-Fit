import React from 'react';
import './Maincontainer.css';

const Maincontainer = ({ children }) => {
  return (
     <div className="main-container-outer ">
      <div className="main-container-inner">
        {children}
      </div>
    </div>
  );
};

export default Maincontainer;
