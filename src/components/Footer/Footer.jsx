import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer__component">
        <div className="Footer__flex constrained__container">
          <div className="Footer__copyright">
            <p>
              Made by IIP © 2017. This site is managed by the <a href="http://www.state.gov/r/iip">Bureau of International Information Programs</a> within the U.S. <a href="http://www.state.gov/">Department of State</a>. External links to other Internet sites should not be construed as an endorsement of the views or privacy policies contained therein.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
