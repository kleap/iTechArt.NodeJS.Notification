import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = props => (
  <div>
    <div className="loader">
      <div className="loader__spin" />
      <div className="loader__text" >
        Loading...
      </div>
    </div>
    {props.children}
  </div>
);

Loader.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Loader;
