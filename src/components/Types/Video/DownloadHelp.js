import React from 'react';
import { Link } from 'react-router-dom';
import HelpText from '../HelpText';
import downloadIcon from '../../../assets/icons/icon_download.svg';
import './DownloadHelp.css';

const DownloadHelp = () => (
  <HelpText>
    <h4>Download Video</h4>
    <ol>
      <li>Under the { 'Video File' } tab click the download icon
        <span> <img src={ downloadIcon } alt="Download Icon" className="download_help_icon" /></span> or the filename
        { ' (title of video file) ' } to start download.
      </li>
      <li>Download will initiate.</li>
      <li>A .zip file will download to your computer.</li>
      <li>Double click the .zip file to unbundle and access files.</li>
    </ol>
    <p>Having issues downloading, locating or unzipping your files? Check out our <Link to="help"> Help page</Link>.
    </p>
    <p>Some common questions we receive:</p>
    <ul>
      <li>{ 'What\'s' } a SRT file and why is it important?</li>
      <li>My download is taking FOREVER. How do I fix this?</li>
      <li>How do I unbundle/unzip my downloaded files?</li>
    </ul>
  </HelpText>
);

export default DownloadHelp;
