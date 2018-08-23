import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Responsive, Popup, Icon } from 'semantic-ui-react';
import UploadSVG from './UploadSVG';
import NotificationsSVG from './NotificationsSVG';
import UserProfileSVG from './UserProfileSVG';
import UserProfileMenu from './SubMenus/UserProfileMenu';
import NotificationsMenu from './SubMenus/NotificationsMenu';

const menuItems = [
  {
    key: 1,
    name: 'upload',
    icon: <UploadSVG />
  },
  {
    key: 2,
    name: 'notifications',
    icon: <NotificationsSVG />
  },
  {
    key: 3,
    name: 'user_profile',
    icon: <UserProfileSVG />
  }
];

class LoggedInNav extends Component {
  state = {
    user_profile: false,
    notifications: false
  }

  displayPopup = ( e, data ) => {
    this.setState( { [data.id]: true } );
  }

  closePopup = ( e, data ) => {
    this.setState( { [data.id]: false } );
  }

  submenuClosePopup = () => {
    this.setState( {
      user_profile: false,
      notifications: false
    } );
  }

  render() {
    const { mobileNavVisible, toggleMobileNav, keyUp } = this.props;

    return (
      <span>
        <Responsive as={ Menu } compact secondary minWidth={ 993 }>
          {
            menuItems.map( ( item ) => {
              if ( item.name === 'upload' ) {
                return (
                  <Menu.Item key={ item.key } name={ item.name } as={ Link } to="/upload" className="nav_loggedin">
                    { item.icon }
                  </Menu.Item>
                );
              }

              return (
                <Popup
                  key={ item.key }
                  id={ item.name }
                  className="nav_submenu_popup"
                  trigger={
                    <Menu.Item key={ item.key } name={ item.name } className="nav_loggedin">
                      { item.icon }
                    </Menu.Item>
                  }
                  content={
                    item.name === 'notifications'
                    ? <NotificationsMenu submenuClosePopup={ this.submenuClosePopup } />
                    : <UserProfileMenu submenuClosePopup={ this.submenuClosePopup } />
                  }
                  on="click"
                  open={ this.state[`${item.name}`] }
                  onOpen={ this.displayPopup }
                  onClose={ this.closePopup }
                  position="bottom center"
                />
              );
            } )
          }
          <a
            href="https://goo.gl/forms/9cJ3IBHH9QTld2Mj2"
            target="_blank"
            className="item feedback"
            rel="noopener noreferrer"
          >
            Feedback
          </a>
        </Responsive>

        {
          mobileNavVisible &&
          <Responsive maxWidth={ 992 }>
            <ul className="mobileMenu">
              <li>
                <Icon name="close" onClick={ toggleMobileNav } onKeyUp={ keyUp } tabIndex={ 0 } />
              </li>
              { menuItems.map( ( item ) => {
                if ( item.name === 'upload' ) {
                  return <li key={ item.key }><Link to="/upload" onClick={ toggleMobileNav }>{ item.icon }</Link></li>;
                }
                return (
                  <Popup
                    key={ item.key }
                    className="nav_submenu_popup"
                    trigger={ <li key={ item.key }>{ item.icon }</li> }
                    content={
                      item.name === 'notifications'
                      ? <NotificationsMenu submenuClosePopup={ this.submenuClosePopup } toggleMobileNav={ toggleMobileNav } />
                      : <UserProfileMenu submenuClosePopup={ this.submenuClosePopup } toggleMobileNav={ toggleMobileNav } />
                    }
                    on="click"
                    open={ this.state.popupIsOpen }
                    onOpen={ this.displayPopup }
                    onClose={ this.closePopup }
                    position="bottom center"
                  />
                );
              } ) }
              <li>
                <a
                  href="https://goo.gl/forms/PyLjAiaJVt3xONsd2"
                  target="_blank"
                  className="item feedback"
                  rel="noopener noreferrer"
                  onClick={ toggleMobileNav }
                >
                  Feedback
                </a>
              </li>
            </ul>
          </Responsive>
        }
      </span>
    );
  }
}

LoggedInNav.propTypes = {
  mobileNavVisible: bool,
  toggleMobileNav: func,
  keyUp: func
};

export default LoggedInNav;
