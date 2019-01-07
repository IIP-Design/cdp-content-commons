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


const SupportFileTypeList = ( props ) => {
  const {
    headline,
    projectId,
    fileType,
    popupMsg,
    data,
    hasSubmittedData,
    hasUploaded
  } = props;

  const renderSupportItem = ( item ) => {
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
  };

  if ( data && data.length > 0 ) {
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
                      basic: true
                  } }
                  contentProps={ { fileType } }
                  modalTrigger={ Button }
                  modalContent={ EditSupportFilesContent }
                /> }
            </Fragment> }
        </h3>
        <ul>
          { data.map( renderSupportItem ) }
        </ul>
      </Fragment>
    );
  }
  return null;
};

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
