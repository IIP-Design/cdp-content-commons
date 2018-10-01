/**
 *
 * PageUpload
 *
 */
import React from 'react';
import Page from 'components/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import { Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import audioIcon from 'assets/icons/icon_150px_audio_blue.png';
import videoIcon from 'assets/icons/icon_150px_video_blue.png';
import imageIcon from 'assets/icons/icon_150px_images_blue.png';
import docIcon from 'assets/icons/icon_150px_document_blue.png';
import eduIcon from 'assets/icons/icon_150px_edu_blue.png';

import './PageUpload.css';

const PageUpload = () => (
  <Page title="Upload Content" description="Upload content to the Content Commons">
    <Breadcrumbs />
    <Header as="h2">Upload Content</Header>
    <div className="upload-content">
      <div className="contentTypes">
        <Button icon className="type disabled">
          <img src={ audioIcon } alt="" />
          <div className="type--label">
            Audio
          </div>
        </Button>
        <Button icon className="type">
          <img src={ videoIcon } alt="" />
          <div className="type--label">
            Videos
          </div>
        </Button>
        <Button icon className="type disabled">
          <img src={ imageIcon } alt="" />
          <div className="type--label">
            Images
          </div>
        </Button>
        <Button icon className="type disabled">
          <img src={ docIcon } alt="" />
          <div className="type--label">
            Documents
          </div>
        </Button>
        <Button icon className="type disabled">
          <img src={ eduIcon } alt="" />
          <div className="type--label">
            Teaching Materials
          </div>
        </Button>
      </div>
    </div>
    <div className="upload-advisory">
      <h3>Only upload files that:</h3>
      <ol>
        <li>You have the right to upload.</li>
        <li>Are allowed on the CDP servers.</li>
      </ol>
      <p>Still have questions?</p>
      <p>Read our <Link to="/about">FAQs</Link> about uploading content.</p>
    </div>
  </Page>
);

export default PageUpload;
