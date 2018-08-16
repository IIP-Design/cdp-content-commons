import React from 'react';
import { bool, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Responsive, Icon } from 'semantic-ui-react';

const menuItems = [
  {
    key: 1,
    name: 'about',
    to: 'about',
    label: 'About'
  },
  {
    key: 2,
    name: 'help',
    to: 'help',
    label: 'Help'
  },
  {
    key: 3,
    name: 'login',
    to: 'login',
    label: 'Login'
  }
];

const LoggedOutNav = ( props ) => {
  const { mobileNavVisible, toggleMobileNav, keyUp } = props;

  return (
    <span>
      <Responsive as={ Menu } compact secondary minWidth={ 993 }>
        { menuItems.map( item => (
          <Menu.Item key={ item.key } as={ Link } name={ item.name } to={ item.to }>
            { item.label }
          </Menu.Item>
        ) ) }
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
            { menuItems.map( item => (
              <li key={ item.key }>
                <Link name={ item.name } to={ item.to } onClick={ toggleMobileNav } onKeyUp={ keyUp }>
                  { item.label }
                </Link>
              </li>
            ) ) }
            <li>
              <a
                href="https://goo.gl/forms/PyLjAiaJVt3xONsd2"
                target="_blank"
                className="item feedback"
                rel="noopener noreferrer"
              >
                Feedback
              </a>
            </li>
          </ul>
        </Responsive>
      }
    </span>
  );
};

LoggedOutNav.propTypes = {
  mobileNavVisible: bool,
  toggleMobileNav: func,
  keyUp: func
};

export default LoggedOutNav;
