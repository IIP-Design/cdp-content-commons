/**
 *
 * SupportFileTypeList
 *
 */

import React, { Fragment } from 'react';
import { array, bool, object, string } from 'prop-types';

import { Button } from 'semantic-ui-react';

import EditSupportFiles from 'components/Project/EditProject/EditSupportFiles';
import IconPopup from 'components/Project/EditProject/IconPopup';
import Placeholder from 'components/Project/Placeholder';

import SupportItem from 'containers/Project/SupportItem';
import EditSupportFilesContent from 'containers/Project/EditSupportFilesContent';

import colors from '../../../../utils/colors';

/* eslint-disable react/prefer-stateless-function */
class SupportFileTypeList extends React.PureComponent {
  state = {}

  toggleEditModal = () => (
    this.setState( prevState => (
      { isEditing: !prevState.isEditing }
    ) )
  )

  renderSupportItem = ( item ) => {
    const {
      projectId,
      fileType,
      hasSubmittedData
    } = this.props;

    if ( hasSubmittedData ) {
      return (
        <SupportItem
          key={ `${fileType}-${item.id}` }
          projectId={ { ...projectId } }
          fileType={ fileType }
          itemId={ item.id }
        />
      );
    }

    return (
      <Placeholder
        key={ `${fileType}-${item.id}` }
        parentEl="li"
        childEl="span"
        parentStyles={ {
          display: 'flex',
          justifyContent: 'space-between'
        } }
        childStyles={ {
          fileName: { width: '75%' },
          language: {
            width: '20%',
            marginRight: '0',
            backgroundColor: colors.grey
          }
        } }
      />
    );
  }

  render() {
    const {
      headline,
      fileType,
      popupMsg,
      data,
      hasSubmittedData,
      hasUploaded
    } = this.props;

    if ( data && !data.length ) return;

    return (
      <Fragment>
        <h3>{ `${headline} ` }
          { hasSubmittedData &&
            <Fragment>
              <IconPopup
                message={ popupMsg }
                size="small"
                iconType="info circle"
              />
              { hasUploaded &&
                <EditSupportFiles
                  triggerProps={ {
                      className: 'btn--edit',
                      content: 'Edit',
                      size: 'small',
                      basic: true,
                      onClick: this.toggleEditModal
                  } }
                  contentProps={ {
                    data,
                    fileType,
                    closeEditModal: this.toggleEditModal
                  } }
                  modalTrigger={ Button }
                  modalContent={ EditSupportFilesContent }
                  options={ {
                    closeIcon: true,
                    onClose: this.toggleEditModal,
                    open: this.state.isEditing
                  } }
                /> }
            </Fragment> }
        </h3>
        <ul>
          { data.map( this.renderSupportItem ) }
        </ul>
      </Fragment>
    );
  }
}

SupportFileTypeList.propTypes = {
  headline: string,
  projectId: object.isRequired,
  fileType: string,
  popupMsg: string,
  data: array.isRequired,
  hasSubmittedData: bool,
  hasUploaded: bool
};

export default SupportFileTypeList;
