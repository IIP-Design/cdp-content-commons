import React, { Component } from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import SubMenu from './SubMenu';

class NotificationsMenu extends Component {
  constructor( props ) {
    super( props );
    this.linkClick = this.linkClick.bind( this );
  }

  linkClick() {
    if ( this.props.toggleMobileNav ) {
      this.props.toggleMobileNav();
    }
    this.props.submenuClosePopup();
  }

  render() {
    return (
      <SubMenu>
        <div className="nav_submenu_header">
          <p className="nav_submenu_header_item nav_submenu_header_item--title">Notifications</p>
          <Link onClick={ this.linkClick } to="/help" className="nav_submenu_header_item">Help</Link>
        </div>
        <section className="nav_submenu_section">
          <p>Notifications appear here.</p>
        </section>
      </SubMenu>
    );
  }
}

NotificationsMenu.propTypes = {
  toggleMobileNav: func,
  submenuClosePopup: func
};

export default NotificationsMenu;
