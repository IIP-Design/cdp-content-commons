/**
 *
 * SupportFileTypeList
 *
 */

import React, { Fragment } from 'react';
import { array, bool, string } from 'prop-types';

import EditSupportFiles from 'components/Project/EditProject/EditSupportFiles';
import EditSupportFilesContent from 'components/Project/EditProject/EditSupportFilesContent';
import SupportItem from 'components/Project/EditProject/SupportItem';
import IconPopup from 'components/Project/EditProject/IconPopup';

import { Button } from 'semantic-ui-react';

const SupportFileTypeList = ( props ) => {
  const {
    headline,
    fileType,
    popupMsg,
    data,
    hasSubmittedData
  } = props;

  const renderSupportItem = item => (
    <SupportItem
      key={ `${fileType}-${item.lang}` }
      fileType={ fileType }
      item={ item }
      isAvailable={ hasSubmittedData }
    />
  );

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
              />
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
  fileType: string,
  popupMsg: string,
  data: array.isRequired,
  hasSubmittedData: bool
};

export default SupportFileTypeList;
