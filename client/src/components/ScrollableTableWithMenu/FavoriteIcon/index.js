/**
 *
 * FavoriteIcon
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import './FavoriteIcon.css';

/* eslint-disable react/prefer-stateless-function */
class FavoriteIcon extends React.PureComponent {
  state = {
    active: false,
  }

  handleActiveClick = () => this.setState( prevState => ({ active: !prevState.active }) );

  render() {
    const { active } = this.state;

    return (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="favoriteIcon"
        onClick={ this.handleActiveClick }
      >
        <g>
          <path 
            xmlnsdefault="http://www.w3.org/2000/svg"          
            d="M20.65,10.11c-0.03-0.29-0.29-0.5-0.58-0.48l-5.23-0.76L12.5,4.14c-0.08-0.28-0.37-0.44-0.64-0.36  c-0.17,0.05-0.31,0.18-0.36,0.36L9.14,8.87L3.91,9.63C3.62,9.6,3.37,9.82,3.33,10.11c0.02,0.19,0.11,0.37,0.26,0.5l3.79,3.69  l-0.9,5.21c0,0.07,0,0.14,0,0.21c0,0.13,0.03,0.26,0.11,0.37c0.08,0.1,0.2,0.16,0.33,0.15c0.15,0,0.29-0.05,0.42-0.12l4.65-2.47  l4.67,2.46c0.13,0.08,0.27,0.12,0.42,0.12c0.13,0.01,0.25-0.05,0.32-0.15c0.08-0.11,0.11-0.24,0.11-0.37c0-0.07,0-0.14,0-0.21  l-0.9-5.21l3.78-3.69c0.15-0.12,0.25-0.3,0.27-0.5l0,0L20.65,10z"
            className={ active ? "starIcon--active" : "starIcon" }
          />          
        </g>
      </svg>
    );
  }
}

FavoriteIcon.propTypes = {};

export default FavoriteIcon;
