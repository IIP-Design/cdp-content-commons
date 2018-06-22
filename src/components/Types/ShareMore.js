import React from 'react';
// import { Form, Input } from 'semantic-ui-react';
// import { object } from 'prop-types';


const ShareMore = props => (
  <div>
    <span className="form-group_instructions">Copy the links to this video from third party sites.</span>
    { /* <Form className="form-group_tabbed">
      { props.srt &&
          props.srt.srcUrl && (
            <Form.Group inline>
              <Form.Field id="fic-srt" control={ Input } label="SRT" value={ props.srt.srcUrl } />
              <Form.Field>
                <a className="ui button" href={ props.srt.srcUrl }>
                  Download
                </a>
              </Form.Field>
            </Form.Group>
          ) }
      { props.transcript &&
          props.transcript.srcUrl && (
            <Form.Group inline>
              <Form.Field id="fic-transcript" control={ Input } label="Transcript" value={ props.transcript.srcUrl } />
              <Form.Field>
                <a className="ui button" href={ props.transcript.srcUrl }>
                  Download
                </a>
              </Form.Field>
            </Form.Group>
          ) }
    </Form> */ }
  </div>
);

// ShareMore.propTypes = {
//   transcript: object,
//   srt: object
// };

export default ShareMore;
