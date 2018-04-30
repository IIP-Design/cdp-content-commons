import React, { Component } from 'react';
import { string, array } from 'prop-types';
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
    return (
      <div>
        <Header as="h2">{ this.props.title }</Header>
        <div className="slider" style={ this.state.sliderStyle } />
        <Tab menu={ { secondary: true } } panes={ this.state.panes } onTabChange={ this.handleOnTabChange } />
      </div>
    );
  }
}

PopupTabbed.propTypes = {
  panes: array,
  title: string
};

export default PopupTabbed;
