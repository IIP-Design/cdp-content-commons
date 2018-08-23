import React from 'react';
import { node } from 'prop-types';
import './SubMenu.css';

const SubMenu = props => (
  <div className="nav_submenu">
    { props.children }
  </div>
);

SubMenu.propTypes = {
  children: node
};

export default SubMenu;
