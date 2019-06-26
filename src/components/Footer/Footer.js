import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Header, List } from 'semantic-ui-react';
import './Footer.css';
import flagImage from '../../assets/images/US-Flag-Color-735b69.png';
import DOSseal from '../../assets/images/DOS_Seal.svg';
import slackLogo from '../../assets/images/logo_slack.png';


const Footer = ( props ) => {
  const menuItems = [
    {
      name: 'home',
      to: '/',
      label: 'Content Commons'
    },
    // {
    //   name: 'developer',
    //   to: '#',
    //   label: 'Developer Tools'
    // },
    {
      name: 'privacy',
      to: 'privacy',
      label: 'Privacy Policy'
    }
    // {
    //   name: 'tos',
    //   to: 'tos',
    //   label: 'Terms of Service'
    // },
    // {
    //   name: 'sitemap',
    //   to: 'sitemap',
    //   label: 'Sitemap'
    // }
  ];

  const documentHeight = document.documentElement.getBoundingClientRect().height;

  return (
    <footer className={ props.isError && documentHeight > 767 ? 'ui bottomFixed' : 'ui' }>
      <div className="footer-feedback">
        <p>
          Help us improve <Link name="home" to="/" className="footer_link">Content Commons</Link>.
          We are looking for&nbsp;
          <a
            href="https://goo.gl/forms/9cJ3IBHH9QTld2Mj2"
            target="_blank"
            className="footer_link"
            rel="noopener noreferrer"
          >
            Feedback
          </a>!
        </p>
      </div>
      <Container text className="footer-content">
        <Header as="h1">
          <Header.Subheader className="subtitle">
            Join the conversation
            on <img src={ slackLogo } alt="Slack" className="footer_img footer_img--slack" /> #content-commons
          </Header.Subheader>
        </Header>
        <List horizontal divided className="footer-nav">
          { menuItems.map( item => (
            <List.Item key={ item.name }>
              <Link name={ item.name } to={ item.to } className="footer_link">
                { item.label }
              </Link>
            </List.Item>
          ) ) }
        </List>
        <Header as="h1">
          <Header.Subheader className="subtext">
            Can&apos;t find what you are looking for? To ask questions or provide feedback
            send us an email at <a href="mailto:design@america.gov">design@america.gov</a>.
          </Header.Subheader>
          <Header.Subheader className="smalltext">
            This site is managed by the <a href="https://www.state.gov/bureaus-offices/under-secretary-for-public-diplomacy-and-public-affairs/bureau-of-global-public-affairs/">Bureau of Global Public Affairs</a> within the <a href="https://state.gov">U.S. Department of State</a>. External links to other Internet sites should not be construed as an endorsement of the views or privacy policies contained therein. GPA © 2019.
          </Header.Subheader>
        </Header>
        <img src={ flagImage } alt="United States Flag" className="footer_img footer_img--usflag" />
        <img src={ DOSseal } alt="Department of State Seal" width="30" height="30" className="footer_img footer_img--dosseal" />
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  isError: bool
};

export default Footer;
