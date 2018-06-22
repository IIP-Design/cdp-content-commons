import React, { Component } from 'react';
import { string, array, bool } from 'prop-types';
import { Header, Tab } from 'semantic-ui-react';
import './Popup.css';

class PopupTabbed extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      sliderStyle: {
        width: 0,
        left: 0
      },
      panes: this.props.panes.map( pane => ( {
        menuItem: pane.title,
        render: () => <Tab.Pane attached={ false }>{ pane.component }</Tab.Pane>
      } ) )
    };
  }

  componentDidMount() {
    this.initSliderStyle();
  }

  handleOnTabChange = ( e ) => {
    this.setState( {
      sliderStyle: {
        width: e.target.clientWidth,
        left: e.target.offsetLeft
      }
    } );
  };

  initSliderStyle() {
    const initActiveMenuItem = document.querySelectorAll( '.popup .secondary.menu .active.item' )[0];
    this.setState( {
      sliderStyle: {
        width: initActiveMenuItem.clientWidth,
        left: initActiveMenuItem.offsetLeft
      }
    } );
  }

  render() {
    const {
      title,
      simpleTabs,
      noTabsMenu,
      classes
    } = this.props;

    const tabClasses = `
      ${simpleTabs ? 'simpleTabs ' : ''}
      ${noTabsMenu ? 'noTabsMenu' : ''}
    `;

    return (
      <div className={ classes }>
        <Header as="h2">{ title }</Header>
        <div className="slider" style={ this.state.sliderStyle } />
        <Tab
          className={ tabClasses.trim() }
          menu={ { secondary: true } }
          panes={ this.state.panes }
          onTabChange={ this.handleOnTabChange }
        />
      </div>
    );
  }
}

PopupTabbed.propTypes = {
  panes: array,
  title: string,
  simpleTabs: bool,
  noTabsMenu: bool,
  classes: string
};

export default PopupTabbed;
