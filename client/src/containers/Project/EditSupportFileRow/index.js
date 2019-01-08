/**
 *
 * EditSupportFileRow
 *
 */
import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import makeSelectEditSupportFileRow from './selectors';
import { Button, Dropdown, Grid, Icon } from 'semantic-ui-react';

import { capitalizeFirst } from '../../../utils/helpers';
import { languages } from '../mockData';

import './EditSupportFileRow.css';

/* eslint-disable react/prefer-stateless-function */
class EditSupportFileRow extends React.PureComponent {
  state = {
    selectedLanguage: ''
  }

  handleChange = ( e, { value } ) => (
    this.setState( {
      selectedLanguage: capitalizeFirst( value )
    } )
  );

  renderIcons = () => (
    <Fragment>
      <Button basic style={ { padding: '0', boxShadow: 'none' } }>
        <Icon size="large" name="refresh" />
      </Button>
      <Button basic style={ { padding: '0', boxShadow: 'none' } }>
        <Icon size="large" name="delete" />
      </Button>
    </Fragment>
  )

  render() {
    const { file } = this.props;
    const { selectedLanguage } = this.state;
    return (
      <Grid.Row>
        <Grid.Column mobile={ 7 }>{ file.file }</Grid.Column>
        <Grid.Column mobile={ 5 }>
          <Dropdown
            onChange={ this.handleChange }
            options={ languages }
            placeholder="Select Language"
            text={ selectedLanguage }
            value={ selectedLanguage }
            selection
          />
        </Grid.Column>
        <Grid.Column mobile={ 4 }>{ this.renderIcons() }</Grid.Column>
      </Grid.Row>
    );
  }
}

EditSupportFileRow.propTypes = {
  file: object
};

const mapStateToProps = ( state, props ) => createStructuredSelector( {
  editsupportfilerow: makeSelectEditSupportFileRow()
} );

export default connect( mapStateToProps, actions )( EditSupportFileRow );
